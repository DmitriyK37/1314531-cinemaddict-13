import {FilterType} from "../const";

export const filter = {
  [FilterType.ALL]: (cards) => cards || [],
  [FilterType.WATCHLIST]: (cards) => cards.filter((card) => card.toWatch),
  [FilterType.HISTORY]: (cards) => cards.filter((card) => card.hasWatched),
  [FilterType.FAVORITES]: (cards) => cards.filter((card) => card.isFavorites),
  [FilterType.STATS]: (cards) => cards
};
