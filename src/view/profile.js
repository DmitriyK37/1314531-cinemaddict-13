import Abstract from "./abstract.js";

const UserRating = {
  NOT_TITLE: 0,
  NOVICE: 10,
  MOVIE_BUFF: 20,
};

const UserTitles = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`,
};

export const getUserTitle = (hasWatched) => {
  if (hasWatched.length > UserRating.NOT_TITLE && hasWatched.length <= UserRating.NOVICE) {
    return UserTitles.NOVICE;
  } else if (hasWatched.length > UserRating.NOVICE && hasWatched.length <= UserRating.MOVIE_BUFF) {
    return UserTitles.FAN;
  } else if (hasWatched.length > UserRating.MOVIE_BUFF) {
    return UserTitles.MOVIE_BUFF;
  } else {
    return ``;
  }
};

const createProfileTemplate = (cards) => {
  const cardGenre = cards.map((card) => card.hasWatched);
  const hasWatched = [];
  for (let i = 0; i < cardGenre.length; i++) {
    if (cardGenre[i] === true) {
      hasWatched.push(cardGenre[i]);
    }
  }
  const title = getUserTitle(hasWatched);
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${title}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile extends Abstract {
  constructor(cards) {
    super();

    this._cards = cards;
  }

  getTemplate() {
    return createProfileTemplate(this._cards);
  }

}
