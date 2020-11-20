import {createProfileTemplate} from "./view/profile.js";
import {createMainNavigationTemplate} from "./view/main-navigation.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsTemplate} from "./view/films.js";
import {createFilmsListContainer} from "./view/films-container.js";
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreButton} from './view/show-more.js';
import {createTopRatedFilmsTemplate} from './view/top-rate.js';
import {createMostCommentedFilmsTemplate} from './view/most-commented.js';
import {createQuantityFilm} from './view/footer-stats.js';
import {createPopup} from './view/popup.js';

const CARD = 5;
const TOP_RATED_CARD = 2;
const MOST_COMMENTED_CARD = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
render(siteHeaderElement, createProfileTemplate());
render(siteMainElement, createMainNavigationTemplate());
render(siteMainElement, createSortTemplate());

render(siteMainElement, createFilmsTemplate());
const filmsBlock = document.querySelector(`.films`);
const filmListElement = filmsBlock.querySelector(`.films-list`);
render(filmListElement, createFilmsListContainer());
const filmsListElementContainer = filmListElement.querySelector(`.films-list__container`);
for (let i = 0; i < CARD; i++) {
  render(filmsListElementContainer, createFilmCardTemplate());
}

render(filmListElement, createShowMoreButton());


render(filmsBlock, createTopRatedFilmsTemplate());
const topRateFilmsBlock = filmsBlock.querySelector(`.films-list--top-rate`);
const topRateElementContainer = topRateFilmsBlock.querySelector(`.films-list__container`);
for (let i = 0; i < TOP_RATED_CARD; i++) {
  render(topRateElementContainer, createFilmCardTemplate());
}

render(filmsBlock, createMostCommentedFilmsTemplate());
const mostCommentedFilmsContainer = filmsBlock.querySelector(`.films-list--most-commented`);
const mostCommentedFilmsList = mostCommentedFilmsContainer.querySelector(`.films-list__container`);
for (let i = 0; i < MOST_COMMENTED_CARD; i++) {
  render(mostCommentedFilmsList, createFilmCardTemplate());
}

const footer = document.querySelector(`.footer`);
const footerStatistic = document.querySelector(`.footer__statistics`);
render(footerStatistic, createQuantityFilm());

render(footer, createPopup(), `afterend`);

