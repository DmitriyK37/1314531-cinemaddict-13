import dayjs from "dayjs";
import {emojiesALL} from "../const";
// import {getRandomInteger} from "../utils";
import {commentsBox} from "../const.js";


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
  return dayjs(new Date(day)).format(`DD/MM/YYYY`);
};

const createCommentsTemplate = (commentCount) => {
  return commentCount.map((id) => {
    return `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${commentsBox[id].emoji}.png" width="55" height="55" alt="emoji-${commentsBox[id].emoji}">
        </span>
        <div>
          <p class="film-details__comment-text">${commentsBox[id].text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${commentsBox[id].author}</span>
            <span class="film-details__comment-day">${renderCommentsDate(commentsBox[id].day)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`;
  })
    .join(``);
};

const createEmojiesTemplate = (emojies) => {
  return emojies
    .map((emoji) => {
      return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
        <label class="film-details__emoji-label" for="emoji-${emoji}">
          <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
        </label>`;
    })
    .join(``);
};

export const createPopup = (card) => {
  const {
    title,
    rating,
    year,
    duration,
    poster,
    genre,
    description,
    comments,
    age
  } = card;

  const actualGenres = generateGenresTemplate(genre);
  const date = dayjs(year).format(`D MMMM YYYY`);
  const emojies = createEmojiesTemplate(emojiesALL);
  const allComments = createCommentsTemplate(comments);

  return `<section class="film-details visually-hidden">
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
                <td class="film-details__cell">${duration}</td>
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
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
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
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              ${emojies}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};
