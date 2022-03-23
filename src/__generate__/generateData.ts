import { constants } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import got from 'got';
import ora from 'ora';
import admZip from 'adm-zip';
import type { IZipEntry } from 'adm-zip';

type NameData = {
  name: string;
  m: number;
  f: number;
  ratio: number;
  count: number;
};

type GivenNames = {
  male: string[];
  female: string[];
  unisex: string[];
};

const spinner = ora({
  color: `cyan`,
  indent: 2,
});

/**
 * Creates a folder at the given path if it doesn't already exist.
 * @param folderPath The desired complete path of the folder to be created.
 */
async function createFolder(folderPath): Promise<void> {
  await fs
    .stat(folderPath)
    .then(() => spinner.succeed(`Folder "${folderPath}" already exists!`))
    .catch(async err => {
      if (err?.code === 'ENOENT') {
        await fs.mkdir(folderPath);
        spinner.succeed(`Created folder: ${folderPath}`);
      } else {
        spinner.fail(`Error creating folder!: ${err.message}`);
        throw err;
      }
    });
}

/**
 * Downloads and saves a zip file to disk
 * @param url The url of the zip file to download
 * @param destFilePath The path to the zip file on disk
 * @returns The path to the downloaded zip file on disk
 */
async function downloadZipFile(url: string, destFilePath: string): Promise<string> {
  // Download zip file
  spinner.start('Downloading zip archive...');
  const response = await got(url, { responseType: 'buffer' }).catch(err => {
    spinner.fail(`Error: Download of zip archive failed! ${err.message}`);
    throw err;
  });
  await fs.writeFile(destFilePath, response.body).catch(err => {
    spinner.fail(`Error: Saving of downloaded zip archive failed! ${err.message}`);
    throw err;
  });
  spinner.succeed(`Downloaded zip archive to: ${destFilePath}`);
  return destFilePath;
}

/**
 * Access a zip file by url and save it to disk. If the file was already downloaded, use the existing file.
 * @param url The url of the zip file to download
 * @param destFilePath The local destination of the zip file
 * @returns The path to the downloaded zip file on disk
 */
async function getZipFile(url: string, destFilePath: string): Promise<string> {
  return await fs
    .access(destFilePath, constants.F_OK)
    .then(() => {
      spinner.succeed('Downloaded file already exists!');
      return destFilePath;
    })
    .catch(async err => {
      if (err) return await downloadZipFile(url, destFilePath);
      throw err;
    });
}

/**
 * Extract the zip file to the specified path
 * @param zipFile The path of the zip file to be extracted
 * @param unzipToPath The desired output path of the extracted files
 * @returns {IZipEntry[]} An array of the extracted files as `IZipEntry` objects
 */
function extractZipFile(zipFile: string, unzipToPath: string) {
  const zip = new admZip(zipFile);
  zip.extractAllTo(unzipToPath);
  const entries = zip.getEntries();
  spinner.succeed(`Extracted ${entries.length} file(s) to: ${unzipToPath}`);
  return entries;
}

// // Create zip file object and extract all files
// const zip = new admZip(destFile);
// zip.extractAllTo(destPath);
// const entries = zip.getEntries();
// spinner.succeed(`Extracted ${entries.length} file(s) to: ${destPath}`);

/**
 * Takes an array of `IZipEntry` files from zip provided by the
 * US Social Security Administration. Each file is parsed for names
 * and other useful data, sorted and the top 1000 names of three
 * categories are returned in an object: `{ male, female, unisex }`.
 * @param entries The array of the extracted files as `IZipEntry` objects
 * @param {number} [unisexRatio=20] Maximum ratio of names used by both genders (given by US Census data) to be considered "unisex"
 * @returns {GivenNames} An object of given names: `male`, `female` and `unisex`.
 */
function parseGivenNameData(entries: IZipEntry[], unisexRatio = 20): GivenNames {
  // To ensure no duplicate names exist, use a Set
  const uniqueNames = new Set<string>();
  // To speed name lookup, use a Map with the name as the key
  const mappedNames = new Map<string, NameData>();

  // Get all text file entries
  const textEntries = entries.filter(entry => entry.entryName.endsWith('.txt'));
  // Read each entry (text file) and add all unique names to the set
  textEntries.forEach(file => {
    // Create array of names from each line of the file
    const lineData = file.getData().toString().split('\n');
    // Parse each line
    lineData.forEach(line => {
      // Every line has a name, sex, and count of people with that name
      const [name, g, c] = line.split(',');
      const count = parseInt(c, 10);
      const isMale = g === 'M';

      if (!uniqueNames.has(name)) {
        // Add the name
        uniqueNames.add(name);
        // Add the name details to the map
        mappedNames.set(name, {
          name,
          m: isMale ? count : 0,
          f: !isMale ? count : 0,
          ratio: 1,
          count,
        });
      } else {
        // Update the name
        const n = mappedNames.get(name) as NameData;
        const m = isMale ? n.m + count : n.m;
        const f = !isMale ? n.f + count : n.f;
        const ratio = m > f ? m / f : m === f ? 1 : f / m;

        // Update the name details in the map
        mappedNames.set(name, {
          name,
          m,
          f,
          ratio: Math.round(ratio * 1000) / 1000,
          count: m + f,
        });
      }
    });
  });

  // Create an array of the mapped names, summing the counts of each name
  const names = [...mappedNames].map(([, x]) => ({
    ...x,
    count: x.m + x.f,
  }));

  const isUnisex = (r: number) => r > 1 && r < unisexRatio;
  const getTop1000 = (n: NameData[]) => n.slice(0, 1000).map(x => x.name);

  const male = getTop1000(
    names.filter(({ m, f, ratio }) => m > f && !isUnisex(ratio)).sort((a, b) => b.m - a.m),
  );
  const female = getTop1000(
    names.filter(({ m, f, ratio }) => f > m && !isUnisex(ratio)).sort((a, b) => b.f - a.f),
  );
  const unisex = getTop1000(
    names.filter(({ ratio }) => isUnisex(ratio)).sort((a, b) => b.count - a.count),
  );

  return {
    male,
    female,
    unisex,
  };
}

/**
 * Takes an array of `IZipEntry` files from zip provided by the
 * US Census Bureau. The CSV spreadsheet is parsed for surnames
 * only, using the first 1000 as it is already sorted by popularity.
 * After formatting, the surnames are returned in an object.
 * @param entries The array of the extracted files as `IZipEntry` objects
 * @returns {string[]} An array of strings containing the most popular 1000 surnames
 */
function parseSurnameData(entries: IZipEntry[]) {
  // The array of surnames
  const surname: string[] = [];
  // Get the single csv file with all name data
  const csvEntry = entries.find(entry => entry.entryName.endsWith('.csv')) as IZipEntry;
  // Create array of surnames from each line of the file, skipping the first line
  const nameData = csvEntry
    .getData()
    .toString()
    .split('\n')
    .filter((_, i) => i > 0)
    .slice(0, 1000);

  // Parse each line
  nameData.map(line => {
    // Parse the name, convert to lowercase
    const n = line.split(',')[0].toLowerCase();
    // Capitalize the first letter of name
    let name = n.charAt(0).toUpperCase() + n.slice(1);
    // Special name formatting rules
    if (name.startsWith('Mc')) {
      name = `Mc${name.charAt(2).toUpperCase()}${name.slice(3)}`;
    } else if (name.startsWith('Oco')) {
      name = `O'Co${name.slice(3)}`;
    }
    // Add the name
    surname.push(name);
  });

  return surname;
}
(async () => {
  // Temporary folder location
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const tempFolderPath = path.join(__dirname, '../../.temp');

  // Data URLs
  const givenNameUrl = 'https://www.ssa.gov/oact/babynames/names.zip';
  const givenNameFile = path.join(tempFolderPath, 'names.zip');
  const surnameUrl = 'https://www2.census.gov/topics/genealogy/2010surnames/names.zip';
  const surnameFile = path.join(tempFolderPath, 'surnames.zip');

  // JSON file paths
  const jsonNamesPath = path.join(__dirname, '../data', 'names.json');

  // Create the temporary folder
  await createFolder(tempFolderPath);

  // Gather the Given Names data
  const namesZipFile = await getZipFile(givenNameUrl, givenNameFile);
  const namesEntries = extractZipFile(namesZipFile, tempFolderPath);
  const names = parseGivenNameData(namesEntries);

  // Gather the Surnames data
  const surnamesZipFile = await getZipFile(surnameUrl, surnameFile);
  const surnamesEntries = extractZipFile(surnamesZipFile, tempFolderPath);
  const surnames = parseSurnameData(surnamesEntries);

  // Write the data to a JSON file
  await fs.writeFile(jsonNamesPath, JSON.stringify({ ...names, surname: surnames }, null, 2));
})();
