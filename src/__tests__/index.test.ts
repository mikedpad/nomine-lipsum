import nomine from '../index';
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

describe(`A random name will be provided...`, () => {
  test(`full name`, () => {
    expect(nomine.full()).toBeTruthy();
  });
  test(`given name`, () => {
    expect(nomine.given()).toBeTruthy();
  });
  test(`surname`, () => {
    expect(nomine.surname()).toBeTruthy();
  });
  test(`male name`, () => {
    expect(nomine.male()).toBeTruthy();
  });
  test(`female name`, () => {
    expect(nomine.female()).toBeTruthy();
  });
  test(`unisex name`, () => {
    expect(nomine.unisex()).toBeTruthy();
  });
});

describe(`A valid name from each list will be picked...`, () => {
  test(`single male name`, () => {
    expect(nomine.male()).toBeInArray(male);
  });
  test(`multiple (10) male names`, () => {
    expect(Array.from({ length: 10 }).map(() => nomine.male())).toBeInArray(male);
  });
  test(`single female name`, () => {
    expect(nomine.female()).toBeInArray(female);
  });
  test(`multiple (10) female names`, () => {
    expect(Array.from({ length: 10 }).map(() => nomine.female())).toBeInArray(female);
  });
  test(`single unisex name`, () => {
    expect(nomine.unisex()).toBeInArray(unisex);
  });
  test(`multiple (10) unisex names`, () => {
    expect(Array.from({ length: 10 }).map(() => nomine.unisex())).toBeInArray(unisex);
  });
  test(`single surname`, () => {
    expect(nomine.surname()).toBeInArray(surname);
  });
  test(`multiple (10) surnames`, () => {
    expect(Array.from({ length: 10 }).map(() => nomine.surname())).toBeInArray(surname);
  });
});
