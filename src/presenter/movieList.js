import Sort from "../view/sort.js";
import Films from "../view/films.js";
import FilmBoard from "../view/film-board.js";
import FilmsList from "../view/films-container.js";
import TopRatedFilms from "../view/top-rate.js";
import MostCommentedFilms from "../view/most-commented.js";
import ShowMoreButton from "../view/show-more.js";
import NoCards from "../view/no-cards.js";
import {render, RenderPosition} from "../utils/render.js";
import Movie from "./movie.js";
import {updateItem} from "../utils/common.js";

const CARD_STEP = 5;
const TOP_RATED_CARD = 2;
const MOST_COMMENTED_CARD = 2;

export default class MovieList {
  constructor(filmListElement) {
    this._filmListElement = filmListElement;
    this._renderCardCount = CARD_STEP;
    this._cardPresenter = {};
    this._mostCommentedCardPresenter = {};
    this._topRateCardPresenter = {};

    this._filmsComponent = new Films();
    this._sortComponent = new Sort();
    this._filmBoardComponent = new FilmBoard();
    this._filmsListComponent = new FilmsList();
    this._noCardComponent = new NoCards();
    this._showMoreButtonComponent = new ShowMoreButton();
    this._topRatedFilmsComponent = new TopRatedFilms();
    this._mostCommentedFilmsComponent = new MostCommentedFilms();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleCardChange = this._handleCardChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(cards) {
    this._cards = cards.slice();

    render(this._filmListElement, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmBoardComponent, RenderPosition.BEFOREEND);
    render(this._filmBoardComponent, this._filmsListComponent, RenderPosition.BEFOREEND);

    this._renderMovieList();
  }

  _handleModeChange() {
    Object
      .values(this._cardPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleCardChange(updatedCard) {
    this._cards = updateItem(this._cards, updatedCard);
    this._cardPresenter[updatedCard.id].init(updatedCard);
    if (this._mostCommentedCardPresenter[updatedCard.id]) {
      this._mostCommentedCardPresenter[updatedCard.id].init(updatedCard);
    }
    if (this._topRateCardPresenter[updatedCard.id]) {
      this._topRateCardPresenter[updatedCard.id].init(updatedCard);
    }
  }

  _renderSort() {
    render(this._filmsComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderCard(container, card, presentersMap) {
    const cardPresenter = new Movie(container, this._handleCardChange, this._handleModeChange);
    cardPresenter.init(card);
    if (presentersMap) {
      presentersMap[card.id] = cardPresenter;
    } else {
      this._cardPresenter[card.id] = cardPresenter;
    }
  }

  _renderCards(from, to) {
    this._cards
    .slice(from, to)
    .forEach((card) => this._renderCard(this._filmsListComponent, card));
  }

  _renderNoCards() {
    render(this._filmListElement, this._noCardComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderCards(this._renderCardCount, this._renderCardCount + CARD_STEP);

    this._renderCardCount += CARD_STEP;

    if (this._renderCardCount >= this._cards.length) {
      this._showMoreButtonComponent.getElement().remove();
      this._showMoreButtonComponent.removeElement();
    }
  }

  _renderShowMoreButton() {
    render(this._filmBoardComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderCardList() {
    for (let i = 0; i < Math.min(this._cards.length, CARD_STEP); i++) {
      this._renderCard(this._filmsListComponent, (this._cards[i]));
    }

    if (this._cards.length > CARD_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderTopRateList() {
    const topRateFilmsConteiner = new FilmsList();
    render(this._filmsComponent, this._topRatedFilmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._topRatedFilmsComponent, RenderPosition.BEFOREEND);
    render(this._topRatedFilmsComponent, topRateFilmsConteiner, RenderPosition.BEFOREEND);
    const topRateBox = (this._cards.slice().sort((a, b) => {
      return (+b.rating) - (+a.rating);
    }));
    const topRateCard = topRateBox.slice(0, 2);
    for (let i = 0; i < TOP_RATED_CARD; i++) {
      this._renderCard(topRateFilmsConteiner, topRateCard[i], this._topRateCardPresenter);
    }
  }

  _renderMostCommentedList() {
    const mostComentedFilmsConteiner = new FilmsList();
    render(this._filmsComponent, this._mostCommentedFilmsComponent, RenderPosition.BEFOREEND);
    render(this._mostCommentedFilmsComponent, mostComentedFilmsConteiner, RenderPosition.BEFOREEND);
    const mostCommentedBox = (this._cards.slice().sort((a, b) => {
      return b.comments.length - a.comments.length;
    }));
    const mostCommentedCard = mostCommentedBox.slice(0, 2);
    for (let i = 0; i < MOST_COMMENTED_CARD; i++) {
      this._renderCard(mostComentedFilmsConteiner, mostCommentedCard[i], this._mostCommentedCardPresenter);
    }
  }

  _renderMovieList() {
    if (this._cards.length === 0) {
      this._renderNoCards();
    }

    this._renderCardList();
    this._renderSort();
    this._renderTopRateList();
    this._renderMostCommentedList();
  }
}
