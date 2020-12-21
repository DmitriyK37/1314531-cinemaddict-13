import dayjs from "dayjs";
import he from "he";
import {commentsBox, emojiesALL} from "../const";
import Smart from "./smart";

const generateGenresTemplate = (genre) => {
  return `<span class="film-details__genre">${genre.join(`, `)}</span>`;
};

const renderCommentsDate = (day) => {
  const commentsDateDiff = dayjs().diff(day, `day`);
  if (commentsDateDiff < 1) {
    return dayjs().format(`mm:H/dddd`);
  } else if (commentsDateDiff === 1) {
    return `today`;
  } else if (commentsDateDiff < 7) {
    return commentsDateDiff + ` days ago`;
  }
  return dayjs(new Date(day)).format(`DD/MM/YYYY H:mm`);
};

const createCommentsTemplate = (comments) => {
  return comments.map((id) => {
    return `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${commentsBox[id].emoji}.png" width="55" height="55" alt="emoji-${commentsBox[id].emoji}">
        </span>
        <div>
          <p class="film-details__comment-text">${he.encode(commentsBox[id].text)}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${commentsBox[id].author}</span>
            <span class="film-details__comment-day">${renderCommentsDate(commentsBox[id].day)}</span>
            <button class="film-details__comment-delete" data-id=${id}>Delete</button>
          </p>
        </div>
      </li>`;
  })
    .join(``);
};

const createEmojiesTemplate = (emojies, activeEmoji) => {
  return emojies
    .map((emoji) => {
      return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${emoji === activeEmoji ? `checked="checked"` : ``}>
        <label class="film-details__emoji-label" for="emoji-${emoji}">
          <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
        </label>`;
    })
    .join(``);
};

const createPopup = (card) => {
  const {
    title,
    rating,
    year,
    duration,
    poster,
    genre,
    description,
    comments,
    age,
    toWatch,
    hasWatched,
    isFavorites,
    emojies
  } = card;

  const actualGenres = generateGenresTemplate(genre);
  const date = dayjs(year).format(`D MMMM YYYY`);
  const emojiesListTemplate = createEmojiesTemplate(emojiesALL, emojies);

  const allComments = createCommentsTemplate(comments);

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
            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

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
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
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

    this._popupClickHandler = this._popupClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);
    this._deleteCommentClickHandler = this._deleteCommentClickHandler.bind(this);
    this._newCommentAddHandler = this._newCommentAddHandler.bind(this);
    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopup(this._data);
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

  _deleteCommentClickHandler(evt) {
    evt.preventDefault();
    const newComments = this._data.comments.filter((commentid) => commentid !== evt.target.dataset.id);
    this._callback.deleteCommentClick(newComments);
    this.updateData({
      comments: newComments
    }
    );
  }

  _newCommentAddHandler(evt) {
    if (evt.ctrlKey && evt.key === `Enter`) {
      if (this.getElement().querySelector(`textarea`).value !== `` && this._data.emojies !== null) {
        const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);
        const userComment = {
          text: this.getElement().querySelector(`textarea`).value,
          author: `User`,
          emoji: this._data.emojies,
          day: dayjs(),
          id: generateId() + ``
        };

        commentsBox[userComment.id] = userComment;
        document.removeEventListener(`keydown`, this._newCommentAddHandler);

        this.updateData({
          comments: [...this._data.comments, userComment.id]
        });
        document.querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
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

  static parseCardToData(card) {
    return Object.assign(
        {},
        card,
        {
          toWatch: card.toWatch,
          hasWatched: card.hasWatched,
          isFavorites: card.isFavorites,
          comments: card.comments,
        }
    );
  }

  static parseDataToCard(data) {
    data = Object.assign({}, data);

    delete data.toWatch;
    delete data.hasWatched;
    delete data.isFavorites;
    delete data.comments;


    return data;
  }
}
