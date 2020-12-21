import Sort from "../view/sort.js";
import Films from "../view/films.js";
import FilmBoard from "../view/film-board.js";
import FilmsList from "../view/films-container.js";
import TopRatedFilms from "../view/top-rate.js";
import MostCommentedFilms from "../view/most-commented.js";
import ShowMoreButton from "../view/show-more.js";
import NoCards from "../view/no-cards.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import Movie from "./movie.js";
import {sortCardDate, sortCardRate} from "../utils/common.js";
import {filter} from "../utils/filter.js";
import {SortType, UpdateType, UserAction} from "../const.js";

const CARD_STEP = 5;
const TOP_RATED_CARD = 2;
const MOST_COMMENTED_CARD = 2;

export default class MovieList {
  constructor(filmListElement, cardsModel, filterModel) {
    this._cardsModel = cardsModel;
    this._filterModel = filterModel;
    this._filmListElement = filmListElement;
    this._renderedCardCount = CARD_STEP;
    this._cardPresenter = {};
    this._mostCommentedCardPresenter = {};
    this._topRateCardPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = null;
    this._showMoreButtonComponent = null;


    this._filmsComponent = new Films();
    this._sortComponent = new Sort();
    this._filmBoardComponent = new FilmBoard();
    this._filmsListComponent = new FilmsList();
    this._noCardComponent = new NoCards();
    this._showMoreButtonComponent = new ShowMoreButton();
    this._topRatedFilmsComponent = new TopRatedFilms();
    this._mostCommentedFilmsComponent = new MostCommentedFilms();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._cardsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {

    render(this._filmListElement, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmBoardComponent, RenderPosition.BEFOREEND);
    render(this._filmBoardComponent, this._filmsListComponent, RenderPosition.BEFOREEND);

    this._renderMovieList();
  }

  _getCards() {
    const filterType = this._filterModel.getFilter();
    const cards = this._cardsModel.getCards();
    const filtredCards = filter[filterType](cards);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filtredCards.sort(sortCardDate);
      case SortType.RATING:
        return filtredCards.sort(sortCardRate);
    }
    return filtredCards;
  }

  _handleModeChange() {
    Object
      .values(this._cardPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_CARD:
        this._cardsModel.updateCard(updateType, update);
        break;
      case UserAction.ADD_CARD:
        this._cardsModel.addCard(updateType, update);
        break;
      case UserAction.DELETE_CARD:
        this._cardsModel.deleteCard(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this._cardPresenter[data.id]) {
          this._cardPresenter[data.id].init(data);
        }
        if (this._topRateCardPresenter[data.id]) {
          this._topRateCardPresenter[data.id].init(data);
        }
        if (this._mostCommentedCardPresenter[data.id]) {
          this._mostCommentedCardPresenter[data.id].init(data);
        }
        break;
      case UpdateType.MINOR:
        this._clearMovieList();
        this._renderMovieList();
        this._clearExtraBlock();
        this._renderTopRateList();
        this._renderMostCommentedList();
        break;
      case UpdateType.MAJOR:
        this._clearMovieList({resetRenderedCardCount: true, resetSortType: true});
        this._renderMovieList();
        this._clearExtraBlock();
        this._renderTopRateList();
        this._renderMostCommentedList();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearMovieList({resetRenderedCardCount: true});
    this._renderMovieList();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new Sort(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._filmsComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderCard(container, card, presentersMap) {
    const cardPresenter = new Movie(container, this._handleViewAction, this._handleModeChange);
    cardPresenter.init(card);
    if (presentersMap) {
      presentersMap[card.id] = cardPresenter;
    } else {
      this._cardPresenter[card.id] = cardPresenter;
    }
  }

  _renderCards(cards) {
    cards.forEach((card) => this._renderCard(this._filmsListComponent, card));
  }

  _renderNoCards() {
    render(this._filmListElement, this._noCardComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    const cardCount = this._getCards().length;
    const newRenderedCardCount = Math.min(cardCount, this._renderedCardCount + CARD_STEP);
    const cards = this._getCards().slice(this._renderedCardCount, newRenderedCardCount);

    this._renderCards(cards);
    this._renderedCardCount = newRenderedCardCount;

    if (this._renderedCardCount >= cardCount) {
      this._showMoreButtonComponent.getElement().remove();
      this._showMoreButtonComponent.removeElement();
    }
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButton();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

    render(this._filmBoardComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _clearMovieList({resetRenderedCardCount = false, resetSortType = false} = {}) {
    const cardCount = this._getCards().length;

    Object
      .values(this._cardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._cardPresenter = {};

    remove(this._sortComponent);
    remove(this._noCardComponent);
    remove(this._showMoreButtonComponent);

    if (resetRenderedCardCount) {
      this._renderedCardCount = CARD_STEP;
    } else {
      this._renderedCardCount = Math.min(cardCount, this._renderedCardCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _clearExtraBlock() {
    remove(this._topRatedFilmsComponent);
    remove(this._mostCommentedFilmsComponent);
  }

  _renderTopRateList() {
    const topRateFilmsConteiner = new FilmsList();
    render(this._filmsComponent, this._topRatedFilmsComponent, RenderPosition.BEFOREEND);
    render(this._topRatedFilmsComponent, topRateFilmsConteiner, RenderPosition.BEFOREEND);
    const topRateBox = (this._getCards().slice().sort((a, b) => {
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
    const mostCommentedBox = (this._getCards().slice().sort((a, b) => {
      return b.comments.length - a.comments.length;
    }));
    const mostCommentedCard = mostCommentedBox.slice(0, 2);
    for (let i = 0; i < MOST_COMMENTED_CARD; i++) {
      this._renderCard(mostComentedFilmsConteiner, mostCommentedCard[i], this._mostCommentedCardPresenter);
    }
  }

  _renderMovieList() {
    const cards = this._getCards();
    const cardCount = cards.length;
    if (cardCount === 0) {
      this._renderNoCards();

      return;
    }
    this._renderSort();
    this._renderCards(cards.slice(0, Math.min(cardCount, this._renderedCardCount)));

    if (cardCount > this._renderedCardCount) {
      this._renderShowMoreButton();
    }
    this._renderTopRateList();
    this._renderMostCommentedList();
  }
}
