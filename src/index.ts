import maleNames from './data/male.json';
import femaleNames from './data/female.json';
import unisexNames from './data/unisex.json';
import surnameNames from './data/surname.json';

const randomName = (arrayOfNames: string[]): string => {
  const { length } = arrayOfNames;
  return arrayOfNames[Math.floor(Math.random() * length)];
};

const random = (): string => randomName([...maleNames, ...femaleNames, ...unisexNames]);
const male = (): string => randomName(maleNames);
const female = (): string => randomName(femaleNames);
const unisex = (): string => randomName(unisexNames);
const surname = (): string => randomName(surnameNames);
const full = (): string => `${random()} ${surname()}`;

export default {
  full,
  random,
  male,
  female,
  unisex,
  surname,
};
