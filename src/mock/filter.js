// const cardToFilterMap = {
//   all: (cards) => cards.length,
//   watchlist: (cards) => cards
//     .filter((card) => card.toWatch).length,
//   history: (cards) => cards
//     .filter((card) => card.hasWatched).length,
//   favorites: (cards) => cards
//     .filter((card) => card.isFavorites).length
// };

// export const generateFilter = (cards) => {
//   return Object.entries(cardToFilterMap).map(([filterName, countCards]) => {
//     return {
//       name: filterName,
//       count: countCards(cards),
//     };
//   });
// };
