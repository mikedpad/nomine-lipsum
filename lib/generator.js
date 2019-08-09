import { male, female, surname } from './constants/names.json';

function generator(str = `:R: :S:`) {
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  const randomIndex = arr => arr[randomInt(0, arr.length - 1)];
  const randomMaleName = () => randomIndex(male);
  const randomFemaleName = () => randomIndex(female);
  const randomFirstName = () => (randomInt(0, 1) === 0) ? randomMaleName() : randomFemaleName();
  const randomSurname = () => randomIndex(surname);

  const regex = {
    male: /:M:/gi,
    female: /:F:/gi,
    random: /:R:/gi,
    surname: /:S:/gi,
  };

  return str
    .replace(regex.male, randomMaleName)
    .replace(regex.female, randomFemaleName)
    .replace(regex.random, randomFirstName)
    .replace(regex.surname, randomSurname);
}

export default generator;
