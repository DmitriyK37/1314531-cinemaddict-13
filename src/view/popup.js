import dayjs from "dayjs";
import he from "he";
import {emojiesALL} from "../const";
import Smart from "./smart";

const generateGenresTemplate = (genre) => {
  return `<span class="film-details__genre">${genre.join(`, `)}</span>`;
};

const renderCommentsDate = (day) => {
  const commentsDateDiff = dayjs().diff(day, `day`);
  if (commentsDateDiff === 0) {
    return `today`;
  } else if (commentsDateDiff < 7) {
    return commentsDateDiff + ` days ago`;
  }
  return dayjs(new Date(day)).format(`DD/MM/YYYY H:mm`);
};

const createCommentsTemplate = (comments, isDisabled, deletingComment) => {
  return comments.map((comment) => {
    return `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${he.encode(comment.comment)}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${renderCommentsDate(comment.date)}</span>
            <button class="film-details__comment-delete" data-comment-id=${comment.id} ${isDisabled ? `disabled` : ``}>${comment.id === deletingComment ? `Deleting...` : `Delete`}</button>
          </p>
        </div>
      </li>`;
  })
    .join(``);
};

const createEmojiesTemplate = (emojies, activeEmoji, isDisabled) => {
  return emojies
    .map((emoji) => {
      return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" ${isDisabled ? `disabled` : ``} value="${emoji}" ${emoji === activeEmoji ? `checked="checked"` : ``}>
        <label class="film-details__emoji-label" for="emoji-${emoji}">
          <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
        </label>`;
    })
    .join(``);
};

const createPopup = (card, comments) => {
  const {
    title,
    rating,
    year,
    duration,
    poster,
    genre,
    description,
    age,
    toWatch,
    hasWatched,
    isFavorites,
    emojies,
    textComment,
    isDisabled,
    deletingComment
  } = card;

  const actualGenres = generateGenresTemplate(genre);
  const date = dayjs(year).format(`D MMMM YYYY`);
  const emojiesListTemplate = createEmojiesTemplate(emojiesALL, emojies, isDisabled);

  const allComments = createCommentsTemplate(comments, isDisabled, deletingComment);

  const toWatchPopup = toWatch ? `checked="checked"` : ``;
  const hasWatchedPopup = hasWatched ? `checked="checked"` : ``;
  const isFavoritesPopup = isFavorites ? `checked="checked"` : ``;

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./${poster}" alt="">

            <p class="film-details__age">${age}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">Anthony Mann</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">Erich von Stroheim, Mary Beth Hughes, Dan Duryea</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${date}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${Math.trunc(duration / 60)}h ${duration % 60}m</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">USA</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">${actualGenres}</td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${toWatchPopup}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${hasWatchedPopup}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavoritesPopup}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
              ${allComments}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
            ${card.emojies ? `<img data-emojies="${card.emojies}" src="images/emoji/${card.emojies}.png" width="55" height="55" alt="emoji-${card.emojies}">` : ``}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${isDisabled ? `disabled` : ``}>${textComment ? `${textComment}` : ``}</textarea>
            </label>

            <div class="film-details__emoji-list">
              ${emojiesListTemplate}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class Popup extends Smart {
  constructor(card) {
    super();
    this._card = card;
    this._data = Popup.parseCardToData(card);
    this._comments = [];

    this.setComments = this.setComments.bind(this);
    this.setDeleteComment = this.setDeleteComment.bind(this);
    this._popupClickHandler = this._popupClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);
    this._deleteCommentClickHandler = this._deleteCommentClickHandler.bind(this);
    this._newCommentAddHandler = this._newCommentAddHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopup(this._data, this._comments);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setPopupClickHandler(this._callback.popupClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setDeletCommentClickHandler(this._callback.deleteCommentClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, this._emojiChangeHandler);
    document.addEventListener(`keydown`, this._newCommentAddHandler);
    this.getElement()
    .querySelector(`.film-details__comment-input`)
    .addEventListener(`input`, this._commentInputHandler);
  }

  _popupClickHandler(evt) {
    evt.preventDefault();
    this._callback.popupClick();
  }

  _watchlistClickHandler() {
    this._callback.watchlistClick();
    this.updateData({
      toWatch: !this._data.toWatch
    }, true
    );
  }

  _watchedClickHandler() {
    this._callback.watchedClick();
    this.updateData({
      hasWatched: !this._data.hasWatched
    }, true
    );
  }

  _favoriteClickHandler() {
    this._callback.favoriteClick();
    this.updateData({
      isFavorites: !this._data.isFavorites
    }, true
    );
  }

  _emojiChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emojies: evt.target.value
    }
    );
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      textComment: evt.target.value
    }, true
    );
    document.removeEventListener(`input`, this._commentInputHandler);
  }

  _deleteCommentClickHandler(evt) {
    evt.preventDefault();
    const deleteComments = this._data.comments.find((item) => item === evt.target.dataset.commentId);
    this._callback.deleteCommentClick(deleteComments);
    this.updateData({
      isDeleting: true,
      deletingComment: evt.target.dataset.commentId
    });
  }

  _newCommentAddHandler(evt) {
    if (evt.ctrlKey && evt.key === `Enter`) {
      if (this.getElement().querySelector(`textarea`).value !== `` && this._data.emojies !== null) {
        const userComment = {
          comment: this.getElement().querySelector(`textarea`).value,
          date: dayjs(),
          emotion: this._data.emojies
        };
        this._callback.newCommentAdd(userComment, this._data.id);
        this._comments.push(userComment);

        document.removeEventListener(`keydown`, this._newCommentAddHandler);
        document.removeEventListener(`change`, this._emojiChangeHandler);
        document.removeEventListener(`input`, this._commentInputHandler);
      }
    }
  }

  setPopupClickHandler(callback) {
    this._callback.popupClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._popupClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setDeletCommentClickHandler(callback) {
    this._callback.deleteCommentClick = callback;
    const buttoms = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    buttoms.forEach((buttom) => buttom.addEventListener(`click`, this._deleteCommentClickHandler));
  }

  setNewCommentAddHandler(callback) {
    this._callback.newCommentAdd = callback;
  }

  setComments(comments) {
    this._comments = comments;
    this.updateElement();
  }

  addComments(comments, commentsIds) {
    this._comments = comments;
    this.updateData({textComment: null, emojies: null, comments: commentsIds});
  }

  setDeleteComment(id) {
    const index = this._comments.findIndex((comment) => comment.id === id);

    if (index === -1) {
      return;
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1)
    ];
    this.updateData({
      comments: this._data.comments.filter((commentId) => commentId !== id)
    }
    );
  }

  static parseCardToData(card) {
    return Object.assign(
        {},
        card,
        {
          toWatch: card.toWatch,
          hasWatched: card.hasWatched,
          isFavorites: card.isFavorites,
          comments: card.comments,
          deletingComment: null,
          isDisabled: false,
          isDeleting: false
        }
    );
  }

  static parseDataToCard(data) {
    data = Object.assign({}, data);

    delete data.toWatch;
    delete data.hasWatched;
    delete data.isFavorites;
    delete data.comments;
    delete data.isDisabled;
    delete data.isDeleting;

    return data;
  }
}
