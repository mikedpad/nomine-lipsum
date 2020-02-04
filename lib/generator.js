import male from './constants/male.json';
import female from './constants/female.json';
import surname from './constants/surname.json';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomIndex = arr => arr[randomInt(0, arr.length - 1)];
function getMale() {
  return randomIndex(male);
}
function getFemale() {
  return randomIndex(female);
}
function getRandomFirst() {
  return randomInt(0, 1) === 0 ? getMale() : getFemale();
}
function randomSurname() {
  return randomIndex(surname);
}

function generator(str = `:R: :S:`) {
  const regex = {
    male: /:M:/gi,
    female: /:F:/gi,
    random: /:R:/gi,
    surname: /:S:/gi,
  };

  return str
    .replace(regex.male, getMale)
    .replace(regex.female, getFemale)
    .replace(regex.random, getRandomFirst)
    .replace(regex.surname, randomSurname);
}

export default generator;
