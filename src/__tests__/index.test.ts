/* eslint-disable no-console */
import generator from '../index';
// import { male, female, unisex, surname } from '../names.json';

describe(`A random name will be generated`, () => {
  test(`male`, () => {
    const name = generator.male();
    console.log(name);
    expect(name).toBeTruthy();
  });
  test(`female`, () => {
    const name = generator.female();
    console.log(name);
    expect(name).toBeTruthy();
  });
  test(`unisex`, () => {
    const name = generator.unisex();
    console.log(name);
    expect(name).toBeTruthy();
  });
  test(`random`, () => {
    const name = generator.random();
    console.log(name);
    expect(name).toBeTruthy();
  });
  test(`surname`, () => {
    const name = generator.surname();
    console.log(name);
    expect(name).toBeTruthy();
  });
  test(`full`, () => {
    const name = generator.full();
    console.log(name);
    expect(name).toBeTruthy();
  });
});
