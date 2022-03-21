import {
  male as maleNames,
  female as femaleNames,
  unisex as unisexNames,
  surname as surnameNames,
} from './data/names.json';

const givenNames = [...maleNames, ...femaleNames, ...unisexNames];

function get(names: string[]): string {
  return names[Math.floor(Math.random() * names.length)];
}

/**
 * Generate a random, full name.
 * @returns {string} A random full (first and last) name.
 */
export function full(): string {
  return `${given()} ${surname()}`;
}

/**
 * Get a random first name from the top 1000 of the male, female and unisex categories in the US.
 * Data provided by the US Social Security Administration.
 * @returns {string} A random first name.
 */
export function given(): string {
  return get(givenNames);
}

/**
 * Get a random name from the top 1000 male names in the US.
 * Data provided by the US Social Security Administration.
 * @returns {string} A random male name.
 */
export function male(): string {
  return get(maleNames);
}

/**
 * Get a random name from the top 1000 female names in the US.
 * Data provided by the US Social Security Administration.
 * @returns {string} A random female name.
 */
export function female(): string {
  return get(femaleNames);
}

/**
 * Get a random name from the top 1000 unisex names in the US.
 * Data provided by the US Social Security Administration.
 * @returns {string} A random unisex name.
 */
export function unisex(): string {
  return get(unisexNames);
}

/**
 * Get a random surname from the top 1000 surnames in the US.
 * Data provided by the US Census Bureau.
 * @returns {string} A random surname.
 */
export function surname(): string {
  return get(surnameNames);
}

export default {
  full,
  given,
  surname,
  male,
  female,
  unisex,
};
