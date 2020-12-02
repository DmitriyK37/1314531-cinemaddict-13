import dayjs from "dayjs";
import {createElement} from "../utils.js";

const createFilmCardTemplate = (card) => {
  const {
    title,
    rating,
    year,
    duration,
    poster,
    genre,
    description,
    comments,
    toWatch,
    hasWatched,
    isFavorites
  } = card;

  const date = dayjs(year).format(`YYYY`);
  const toWatchClassName = toWatch ? `film-card__controls-item--active` : ``;
  const hasWatchedClassName = hasWatched ? `film-card__controls-item--active` : ``;
  const isFavoritesClassName = isFavorites ? `film-card__controls-item--active` : ``;

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${date}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre[0]}</span>
    </p>
    <img src="./images/posters/${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${toWatchClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${hasWatchedClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavoritesClassName}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCard {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
