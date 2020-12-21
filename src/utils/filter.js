import {FilterType} from "../const";

export const filter = {
  [FilterType.ALL]: (cards) => cards,
  // all: (cards) => cards.length,
  [FilterType.WATCHLIST]: (cards) => cards.filter((card) => card.toWatch),
  // watchlist: (cards) => cards
  //   .filter((card) => card.toWatch).length,
  [FilterType.HISTORY]: (cards) => cards.filter((card) => card.hasWatched),
  // history: (cards) => cards
  //   .filter((card) => card.hasWatched).length,
  [FilterType.FAVORITES]: (cards) => cards.filter((card) => card.isFavorites)
  // favorites: (cards) => cards
  //   .filter((card) => card.isFavorites).length
};
