import {getRandomInteger} from "../utils";
import {descriptions} from "../const.js";
import {genres} from "../const.js";
import {posters} from "../const.js";
import {titles} from "../const.js";
import {age} from "../const.js";
import dayjs from "dayjs";

const generateTitle = () => {
  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generateGenre = () => {
  const randomIndex = getRandomInteger(0, genres.length - 1);

  return genres[randomIndex];
};

const generatePoster = () => {
  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateDescription = () => {
  return descriptions.slice(getRandomInteger(1, 5)).join(` `);
};

const generateAge = () => {
  const randomIndex = getRandomInteger(0, age.length - 1);

  return age[randomIndex];
};

export const generateCard = () => {
  return {
    title: generateTitle(),
    rating: (getRandomInteger(1, 9)) + `.` + (getRandomInteger(0, 9)),
    year: getRandomInteger(dayjs(`12.11.1886`, new Date())),
    duration: (getRandomInteger(0, 2)) + `h ` + (getRandomInteger(0, 59)) + `m`,
    genre: generateGenre(),
    poster: generatePoster(),
    description: generateDescription(),
    comments: getRandomInteger(0, 5),
    age: generateAge(),
    toWatch: Boolean(getRandomInteger(0, 1)),
    hasWatched: Boolean(getRandomInteger(0, 1)),
    isFavorites: Boolean(getRandomInteger(0, 1))
  };
};
