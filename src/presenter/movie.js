import FilmCard from "../view/film-card.js";
import Popup from "../view/popup.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";

export default class Movie {
  constructor(filmsListComponent, changeData, changeMode) {
    this._filmsListComponent = filmsListComponent;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._cardComponent = null;
    this._popupComponent = null;

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(card) {
    this._card = card;
    const prevCardComponent = this._cardComponent;
    const body = document.querySelector(`body`);
    this._cardComponent = new FilmCard(card);


    this._cardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._cardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._cardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    const openPopup = () => {
      this._changeMode();
      this._popupComponent = new Popup(card);
      body.appendChild(this._popupComponent.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);

      this._popupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
      this._popupComponent.setWatchedClickHandler(this._handleWatchedClick);
      this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);

      this._popupComponent.setPopupClickHandler(() => {
        this.closePopup();
        body.classList.remove(`hide-overflow`);
      });
    };

    this.closePopup = () => {
      if (this._popupComponent) {
        body.removeChild(this._popupComponent.getElement());
        this._popupComponent = null;
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._cardComponent.setCardClickHandler(() => {
      openPopup();
      body.classList.add(`hide-overflow`);
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        this.closePopup();
        document.removeEventListener(`keydown`, onEscKeyDown);
        body.classList.remove(`hide-overflow`);
      }
    };

    if (prevCardComponent === null) {
      render(this._filmsListComponent, this._cardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmsListComponent.getElement().contains(prevCardComponent.getElement())) {
      replace(this._cardComponent, prevCardComponent);
    }

    remove(prevCardComponent);
  }

  destroy() {
    remove(this._cardComponent);
  }

  resetView() {
    this.closePopup();
  }

  _handleWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._card,
            {
              toWatch: !this._card.toWatch
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._card,
            {
              hasWatched: !this._card.hasWatched
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._card,
            {
              isFavorites: !this._card.isFavorites
            }
        )
    );
  }
}
