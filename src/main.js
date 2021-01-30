import QuantityFilm from "./view/footer-stats.js";
import Filter from "./presenter/filter.js";
import {render, RenderPosition} from "./utils/render.js";
import MovieList from "./presenter/movieList.js";
import CardsModel from "./model/movies.js";
import FilterModel from "./model/filter.js";
import {UpdateType} from "./const.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic jkdgfl98dg9jsdu`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict`;

const api = new Api(END_POINT, AUTHORIZATION);

const cardsModel = new CardsModel();

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.main`);

const filterPresenter = new Filter(siteMainElement, filterModel, cardsModel, api);
const listPresenter = new MovieList(siteMainElement, cardsModel, filterModel, api);

const footerStatistic = document.querySelector(`.footer__statistics`);
render(footerStatistic, new QuantityFilm(), RenderPosition.BEFOREEND);

listPresenter.init();
filterPresenter.init();

api.getMovies()
  .then((cards) => {
    cardsModel.setCards(UpdateType.INIT, cards);
  })
  .catch(() => {
    cardsModel.setCards(UpdateType.INIT, []);
  });
