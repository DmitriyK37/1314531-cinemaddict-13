import dayjs from "dayjs";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const sortCardDate = (cardA, cardB) => {
  return dayjs(cardB.year).diff(dayjs(cardA.year));
};

export const sortCardRate = (cardA, cardB) => {
  return (cardB.rating) - ((cardA.rating));
};

