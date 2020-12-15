import Profile from "./view/profile.js";
import SiteMenu from "./view/main-navigation.js";
import QuantityFilm from "./view/footer-stats.js";
import {generateCard} from "./mock/card.js";
import {generateFilter} from "./mock/filter.js";
import {render, RenderPosition} from "./utils/render.js";
import MovieList from "./presenter/movieList.js";

const CARD = 20;
// const TOP_RATED_CARD = 2;
// const MOST_COMMENTED_CARD = 2;

const cards = new Array(CARD).fill().map(generateCard);
const filters = generateFilter(cards);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenu(filters), RenderPosition.BEFOREEND);
const fillterAll = document.querySelector(`.main-navigation__item`);
fillterAll.classList.add(`main-navigation__item--active`);
const listPresenter = new MovieList(siteMainElement);
listPresenter.init(cards);

const footerStatistic = document.querySelector(`.footer__statistics`);
render(footerStatistic, new QuantityFilm(), RenderPosition.BEFOREEND);
