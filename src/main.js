import Profile from "./view/profile.js";
import QuantityFilm from "./view/footer-stats.js";
import {generateCard} from "./mock/card.js";
import Filter from "./presenter/filter.js";
import {render, RenderPosition} from "./utils/render.js";
import MovieList from "./presenter/movieList.js";
import CardsModel from "./model/movies.js";
import FilterModel from "./model/filter.js";

const CARD = 20;

const cards = new Array(CARD).fill().map(generateCard);

const cardsModel = new CardsModel();
cardsModel.setCards(cards);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
const listPresenter = new MovieList(siteMainElement, cardsModel, filterModel);
const filterPresenter = new Filter(siteMainElement, filterModel, cardsModel);
filterPresenter.init();
listPresenter.init();

const footerStatistic = document.querySelector(`.footer__statistics`);
render(footerStatistic, new QuantityFilm(), RenderPosition.BEFOREEND);
