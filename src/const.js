import {getRandomInteger} from "./utils/common.js";

export const titles = [
  `Made for each other`,
  `Popeye meets sinbad`,
  `Sagebrush trail`,
  `Santa claus conquers the martians`,
  `The dance of life`,
  `The great flamarion`,
  `The man with the golden arm`
];

export const genres = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`
];

export const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

export const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

export const age = [
  `0+`,
  `6+`,
  `12+`,
  `18+`,
  `21+`
];

export const emojiesALL = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`
];

const commentsday = () => {
  return Date.now() - getRandomInteger(0, 3000000000);
};

export const commentsBox = {
  '1': {
    text: `Interesting setting and a good cast`,
    author: `Tom Roy`,
    emoji: `smile`,
    id: `1`,
    day: commentsday()
  },

  '2': {
    text: `Booooooooooring`,
    author: `John Doe`,
    emoji: `sleeping`,
    day: commentsday(),
    id: `2`
  },

  '3': {
    text: `Very very old. Meh`,
    author: `Make Rouze`,
    emoji: `puke`,
    day: commentsday(),
    id: `3`
  },

  '4': {
    text: `Almost two hours? Seriously?`,
    author: `Richard Harris`,
    emoji: `angry`,
    day: commentsday(),
    id: `4`
  },

  '5': {
    text: `Best film ever!`,
    author: `Piter Parker`,
    emoji: `puke`,
    day: commentsday(),
    id: `5`
  }
};

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};


export const UserAction = {
  UPDATE_CARD: `UPDATE_CARD`,
  ADD_COMMENT: `ADD_CARD`,
  DELETE_COMMENT: `DELETE_CARD`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const FilterType = {
  ALL: `All`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
  STATS: `STATS`
};

// export const MenuItem = {
//   FILTER: `FILTER`,
//   STATISTICS: `STATISTICS`
// };

// export const TimeFilter = {
//   ALL_TIME: `all-time`,
//   TODAY: `today`,
//   WEEK: `week`,
//   MONTH: `month`,
//   YEAR: `year`
// };
