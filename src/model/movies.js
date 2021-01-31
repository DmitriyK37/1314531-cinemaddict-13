import Observer from "../utils/observer.js";
import dayjs from "dayjs";

export default class Cards extends Observer {
  constructor() {
    super();
    this._cards = [];
  }

  setCards(updateType, cards) {
    this._cards = cards.slice();
    this._notify(updateType);
  }

  getCards() {
    return this._cards.slice();
  }

  updateCard(updateType, update) {
    const index = this._cards.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting card`);
    }

    this._cards = [
      ...this._cards.slice(0, index),
      update,
      ...this._cards.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addCard(updateType, update) {
    this._cards = [
      update,
      ...this._cards
    ];

    this._notify(updateType, update);
  }

  deleteCard(updateType, update) {
    const index = this._cards.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting card`);
    }

    this._cards = [
      ...this._cards.slice(0, index),
      ...this._cards.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(card) {
    const adaptedCard = Object.assign(
        {},
        card,
        {
          title: card.film_info.title,
          rating: card.film_info.total_rating,
          year: new Date(card.film_info.release.date),
          duration: card.film_info.runtime,
          genres: card.film_info.genre,
          poster: card.film_info.poster,
          description: card.film_info.description,
          age: card.film_info.age_rating,
          original: card.film_info.alternative_title,
          director: card.film_info.director,
          writers: card.film_info.writers,
          actors: card.film_info.actors,
          country: card.film_info.release.release_country,
          toWatch: card.user_details.watchlist,
          hasWatched: card.user_details.already_watched,
          isFavorites: card.user_details.favorite,
          watchDate: new Date(card.user_details.watching_date)
        }
    );

    delete adaptedCard.film_info;
    delete adaptedCard.user_details;

    return adaptedCard;
  }

  static adaptToServer(card) {
    const adaptedCard = Object.assign(
        {},
        card,
        {
          "film_info": {
            "actors": card.actors,
            "age_rating": card.age,
            "title": card.title,
            "alternative_title": card.original,
            "description": card.description,
            "director": card.director,
            "genre": card.genres,
            "poster": card.poster,

            "release": {
              "date": dayjs(card.year).format(),
              "release_country": card.country
            },

            "runtime": card.duration,
            "total_rating": card.rating,
            "writers": card.writers
          },

          "user_details": {
            "watchlist": card.toWatch,
            "already_watched": card.hasWatched,
            "favorite": card.isFavorites,
            "watching_date": card.hasWatched ?
              card.watchDate : null,
          }
        }
    );

    delete adaptedCard.age;
    delete adaptedCard.title;
    delete adaptedCard.description;
    delete adaptedCard.genres;
    delete adaptedCard.poster;
    delete adaptedCard.duration;
    delete adaptedCard.rating;
    delete adaptedCard.country;
    delete adaptedCard.writers;
    delete adaptedCard.director;
    delete adaptedCard.actors;
    delete adaptedCard.original;
    delete adaptedCard.year;
    delete adaptedCard.toWatch;
    delete adaptedCard.hasWatched;
    delete adaptedCard.isFavorites;
    delete adaptedCard.watchDate;

    return adaptedCard;
  }
}

