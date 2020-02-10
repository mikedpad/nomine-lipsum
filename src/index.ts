import names from './names.json';

const randomName = (arrayOfNames: string[]): string => {
  const { length } = arrayOfNames;
  return arrayOfNames[Math.floor(Math.random() * length)];
};

const random = (): string => randomName([...names.male, ...names.female, ...names.unisex]);
const male = (): string => randomName(names.male);
const female = (): string => randomName(names.female);
const unisex = (): string => randomName(names.unisex);
const surname = (): string => randomName(names.surname);
const full = (): string => `${random()} ${surname()}`;

export default {
  random,
  male,
  female,
  unisex,
  surname,
  full,
};
