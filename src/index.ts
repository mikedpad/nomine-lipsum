import {
  male as maleNames,
  female as femaleNames,
  unisex as unisexNames,
  surname as surnameNames,
} from './data/names.json';

const allGivenLength = maleNames.length + femaleNames.length + unisexNames.length;

/**
 * Get a random name from the top 1000 male names in the US.
 * Data provided by the US Social Security Administration.
 * @returns {string} A random male name.
 */
export function male(): string {
  return maleNames[Math.floor(Math.random() * maleNames.length)];
}

/**
 * Get a random name from the top 1000 female names in the US.
 * Data provided by the US Social Security Administration.
 * @returns {string} A random female name.
 */
export function female(): string {
  return femaleNames[Math.floor(Math.random() * femaleNames.length)];
}

/**
 * Get a random name from the top 1000 unisex names in the US.
 * Data provided by the US Social Security Administration.
 * @returns {string} A random unisex name.
 */
export function unisex(): string {
  return unisexNames[Math.floor(Math.random() * unisexNames.length)];
}

/**
 * Get a random surname from the top 1000 surnames in the US.
 * Data provided by the US Census Bureau.
 * @returns {string} A random surname.
 */
export function surname(): string {
  return surnameNames[Math.floor(Math.random() * surnameNames.length)];
}

/**
 * Get a random first name from the top 1000 of the male, female and unisex categories in the US.
 * Data provided by the US Social Security Administration.
 * @returns {string} A random first name.
 */
export function given(): string {
  const r = Math.floor(Math.random() * allGivenLength);
  return r < maleNames.length
    ? maleNames[r]
    : r < maleNames.length + femaleNames.length
    ? femaleNames[r - maleNames.length]
    : unisexNames[r - maleNames.length - femaleNames.length];
}

/**
 * Generate a random, full name.
 * @returns {string} A random full (first and last) name.
 */
export function full(): string {
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
