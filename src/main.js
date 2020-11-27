import {createProfileTemplate} from "./view/profile.js";
import {createMenuTemplate} from "./view/main-navigation.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsTemplate} from "./view/films.js";
import {createFilmsListContainer} from "./view/films-container.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createShowMoreButton} from "./view/show-more.js";
import {createTopRatedFilmsTemplate} from "./view/top-rate.js";
import {createMostCommentedFilmsTemplate} from "./view/most-commented.js";
import {createQuantityFilm} from "./view/footer-stats.js";
import {createPopup} from "./view/popup.js";
import {generateCard} from "./mock/card.js";
import {generateFilter} from "./mock/filter.js";

const CARD = 20;
const CARD_STEP = 5;
const TOP_RATED_CARD = 2;
const MOST_COMMENTED_CARD = 2;

const cards = new Array(CARD).fill().map(generateCard);
const filters = generateFilter(cards);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
render(siteHeaderElement, createProfileTemplate());
render(siteMainElement, createMenuTemplate(filters));
const fillterAll = document.querySelector(`.main-navigation__item`);
fillterAll.classList.add(`main-navigation__item--active`);
render(siteMainElement, createSortTemplate());

render(siteMainElement, createFilmsTemplate());
const filmsBlock = document.querySelector(`.films`);
const filmListElement = filmsBlock.querySelector(`.films-list`);
render(filmListElement, createFilmsListContainer());
const filmsListElementContainer = filmListElement.querySelector(`.films-list__container`);
for (let i = 0; i < Math.min(cards.length, CARD_STEP); i++) {
  render(filmsListElementContainer, createFilmCardTemplate(cards[i]));
}

if (cards.length > CARD_STEP) {
  let renderedCardCount = CARD_STEP;

  render(filmListElement, createShowMoreButton());
  const showMoreButton = filmListElement.querySelector(`.films-list__show-more`);
  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    cards
    .slice(renderedCardCount, renderedCardCount + CARD_STEP)
    .forEach((card) => render(filmsListElementContainer, createFilmCardTemplate(card), `beforeend`));

    renderedCardCount += CARD_STEP;

    if (renderedCardCount >= cards.length) {
      showMoreButton.remove();
    }
  });
}

render(filmsBlock, createTopRatedFilmsTemplate());
const topRateFilmsBlock = filmsBlock.querySelector(`.films-list--top-rate`);
const topRateElementContainer = topRateFilmsBlock.querySelector(`.films-list__container`);
for (let i = 0; i < TOP_RATED_CARD; i++) {
  render(topRateElementContainer, createFilmCardTemplate(cards[i]));
}

render(filmsBlock, createMostCommentedFilmsTemplate());
const mostCommentedFilmsContainer = filmsBlock.querySelector(`.films-list--most-commented`);
const mostCommentedFilmsList = mostCommentedFilmsContainer.querySelector(`.films-list__container`);
for (let i = 0; i < MOST_COMMENTED_CARD; i++) {
  render(mostCommentedFilmsList, createFilmCardTemplate(cards[i]));
}

const footer = document.querySelector(`.footer`);
const footerStatistic = document.querySelector(`.footer__statistics`);
render(footerStatistic, createQuantityFilm());

// render(footer, createPopup(cards), `afterend`);
for (let i = 0; i < CARD; i++) {
  render(footer, createPopup(cards[i]), `afterend`);
}
