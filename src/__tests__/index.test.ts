import nomine, {
  full as fFull,
  given as fGiven,
  surname as fSurname,
  male as fMale,
  female as fFemale,
  unisex as fUnisex,
} from '../index';
import { male, female, unisex, surname } from '../data/names.json';

expect.extend({
  toBeInArray(received: string | string[], arr: string[]) {
    const pass = Array.isArray(received)
      ? received.every(x => arr.includes(x))
      : arr.includes(received);
    return {
      message: () => `expected ${received} to be in array ${arr}`,
      pass,
    };
  },
});

describe(`A valid name for each option will be provided`, () => {
  test(`single male name`, () => {
    expect(fMale()).toBeInArray(male);
  });
  test(`multiple (10) male names`, () => {
    expect(Array.from({ length: 10 }).map(() => fMale())).toBeInArray(male);
  });
  test(`single female name`, () => {
    expect(fFemale()).toBeInArray(female);
  });
  test(`multiple (10) female names`, () => {
    expect(Array.from({ length: 10 }).map(() => fFemale())).toBeInArray(female);
  });
  test(`single unisex name`, () => {
    expect(fUnisex()).toBeInArray(unisex);
  });
  test(`multiple (10) unisex names`, () => {
    expect(Array.from({ length: 10 }).map(() => fUnisex())).toBeInArray(unisex);
  });
  test(`single surname`, () => {
    expect(fSurname()).toBeInArray(surname);
  });
  test(`multiple (10) surnames`, () => {
    expect(Array.from({ length: 10 }).map(() => fSurname())).toBeInArray(surname);
  });
});

describe(`A random name will be generated`, () => {
  test(`full`, () => {
    expect(fFull()).toBeTruthy();
  });
  test(`given`, () => {
    expect(fGiven()).toBeTruthy();
  });
  test(`surname`, () => {
    expect(nomine.surname()).toBeTruthy();
  });
  test(`male`, () => {
    expect(nomine.male()).toBeTruthy();
  });
  test(`female`, () => {
    expect(nomine.female()).toBeTruthy();
  });
  test(`unisex`, () => {
    expect(nomine.unisex()).toBeTruthy();
  });
});
