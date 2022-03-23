import {
  male as maleNames,
  female as femaleNames,
  unisex as unisexNames,
  surname as surnameNames,
} from './data/names.json';

const maleLength = maleNames.length;
const femaleLength = femaleNames.length;
const unisexLength = unisexNames.length;
const surnameLength = surnameNames.length;
const givenLength = maleLength + femaleLength + unisexLength;

/**
 * Get a random name from the top 1000 male names in the US.
 * Data provided by the US Social Security Administration.
 * @returns {string} A random male name.
 */
function male(): string {
  return maleNames[Math.floor(Math.random() * maleLength)];
}

/**
 * Get a random name from the top 1000 female names in the US.
 * Data provided by the US Social Security Administration.
 * @returns {string} A random female name.
 */
function female(): string {
  return femaleNames[Math.floor(Math.random() * femaleLength)];
}

/**
 * Get a random name from the top 1000 unisex names in the US.
 * Data provided by the US Social Security Administration.
 * @returns {string} A random unisex name.
 */
function unisex(): string {
  return unisexNames[Math.floor(Math.random() * unisexLength)];
}

/**
 * Get a random surname from the top 1000 surnames in the US.
 * Data provided by the US Census Bureau.
 * @returns {string} A random surname.
 */
function surname(): string {
  return surnameNames[Math.floor(Math.random() * surnameLength)];
}

/**
 * Get a random first name from the top 1000 of the male, female and unisex categories in the US.
 * Data provided by the US Social Security Administration.
 * @returns {string} A random first name.
 */
function given(): string {
  const r = Math.floor(Math.random() * givenLength);
  return r < maleLength
    ? maleNames[r]
    : r < maleLength + femaleLength
    ? femaleNames[r - maleLength]
    : unisexNames[r - maleLength - femaleLength];
}

/**
 * Generate a random, full name.
 * @returns {string} A random full (first and last) name.
 */
function full(): string {
  return `${given()} ${surname()}`;
}

export default {
  male,
  female,
  unisex,
  surname,
  given,
  full,
};
