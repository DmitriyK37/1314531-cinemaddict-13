import FilmCard from "../view/film-card.js";
import Popup from "../view/popup.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";

export const State = {
  DELETING: `DELETING`,
  ABORTING: `ABORTING`,
  ADDING: `ADDING`
};

export default class Movie {
  constructor(filmsListComponent, changeData, changeMode, api) {
    this._filmsListComponent = filmsListComponent;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._api = api;
    this._cardComponent = null;
    this._popupComponent = null;

    this.setViewState = this._setViewState.bind(this);
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
      const prevPopupComponent = this._popupComponent;
      this._popupComponent = new Popup(card, this._api);
      this._api.getComments(card).then((comments) => {
        this._popupComponent.setComments(comments);
      });
      body.appendChild(this._popupComponent.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);

      this._popupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
      this._popupComponent.setWatchedClickHandler(this._handleWatchedClick);
      this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
      this._popupComponent.setNewCommentAddHandler((userComment, cardId) => {
        this._api.addComment(userComment, cardId).then((response) => {
          this._popupComponent.addComments(response.comments, response.movie.comments);
          this._changeData(
              UserAction.ADD_COMMENT,
              UpdateType.MINOR,
              response.movie
          );
        }
        )
        .catch(() => {
          this._setViewState(State.ABORTING);
        });
      });
      this._popupComponent.setDeletCommentClickHandler((commentId) => {
        const newComments = this._card.comments.filter((Id) => Id !== commentId);
        this._card.comments = newComments;
        this._api.deleteComment(commentId).then(() => {
          this._popupComponent.setDeleteComment(commentId);
          this._changeData(
              UserAction.UPDATE_CARD,
              UpdateType.MINOR,
              Object.assign(
                  {},
                  this._card,
                  {
                    comments: newComments
                  }
              )
          );
        }
        )
        .catch(() => {
          this._setViewState(State.ABORTING, commentId);
        });
      });
      this._popupComponent.setPopupClickHandler(() => {
        this.closePopup();
        body.classList.remove(`hide-overflow`);
      });

      if (prevPopupComponent === null) {
        render(this._cardComponent, this._popupComponent, RenderPosition.BEFOREEND);
        return;
      }

      if (this._filmsListComponent.getElement().contains(prevPopupComponent.getElement())) {
        replace(this._cardComponent, prevCardComponent);
      }
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

  _setViewState(state) {
    const resetFormState = () => {
      this._popupComponent.updateData({
        isDisabled: false,
        isDeleting: false
      });
    };
    switch (state) {
      case State.DELETING:
        this._popupComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ADDING:
        this._popupComponent.updateData({
          isDisabled: true,
        });
        break;
      case State.ABORTING:
        this._popupComponent.shake(resetFormState);
        break;
    }
  }

  destroy() {
    remove(this._cardComponent);
  }

  resetView() {
    this.closePopup();
  }

  _handleWatchlistClick() {
    this._changeData(
        UserAction.UPDATE_CARD,
        UpdateType.MINOR,
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
        UserAction.UPDATE_CARD,
        UpdateType.MINOR,
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
        UserAction.UPDATE_CARD,
        UpdateType.MINOR,
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
