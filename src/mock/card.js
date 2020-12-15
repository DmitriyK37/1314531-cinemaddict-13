import {getRandomInteger} from "../utils/common.js";
import {descriptions} from "../const.js";
import {genres} from "../const.js";
import {posters} from "../const.js";
import {titles} from "../const.js";
import {age} from "../const.js";
import {commentsBox} from "../const.js";
import dayjs from "dayjs";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateTitle = () => {
  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generateGenre = () => {
  return genres.slice(getRandomInteger(1, genres.length - 1));
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

const generateComments = () => {
  const idComments = Object.keys(commentsBox).sort(() => {
    return 0.5 - Math.random();
  });
  let comments = idComments.slice(getRandomInteger(0, 5));
  return comments;
};

export const generateCard = () => {
  return {
    id: generateId(),
    title: generateTitle(),
    rating: (getRandomInteger(1, 9)) + `.` + (getRandomInteger(0, 9)),
    year: getRandomInteger(dayjs(`12.11.1886`, new Date())),
    duration: (getRandomInteger(0, 2)) + `h ` + (getRandomInteger(0, 59)) + `m`,
    genre: generateGenre(),
    poster: generatePoster(),
    description: generateDescription(),
    comments: generateComments(),
    age: generateAge(),
    toWatch: Boolean(getRandomInteger(0, 1)),
    hasWatched: Boolean(getRandomInteger(0, 1)),
    isFavorites: Boolean(getRandomInteger(0, 1))
  };
};
