import Profile from "./view/profile.js";
import QuantityFilm from "./view/footer-stats.js";
// import {generateCard} from "./mock/card.js";
import Filter from "./presenter/filter.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import MovieList from "./presenter/movieList.js";
import CardsModel from "./model/movies.js";
import FilterModel from "./model/filter.js";
import Statistics from "./view/statistics.js";
import MenuStatistics from "./view/site-statistics.js";
import {MenuItem, UpdateType, FilterType} from "./const.js";
import Api from "./api.js";

// const CARD = 20;
const AUTHORIZATION = `Basic jkdgfl98dg9jsdu`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict`;

const api = new Api(END_POINT, AUTHORIZATION);

const cardsModel = new CardsModel();

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

// render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
const saitStats = new MenuStatistics();
render(siteMainElement, saitStats, RenderPosition.BEFOREEND);
const filterPresenter = new Filter(saitStats, filterModel, cardsModel, api);
const listPresenter = new MovieList(siteMainElement, cardsModel, filterModel, api);

let statisticsComponent = null;

const footerStatistic = document.querySelector(`.footer__statistics`);
render(footerStatistic, new QuantityFilm(), RenderPosition.BEFOREEND);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.FILTER:
      listPresenter.destroy();
      listPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATISTICS:
      listPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
      statisticsComponent = new Statistics(cardsModel.getCards());
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

// saitStats.setMenuClickHandler(handleSiteMenuClick);
listPresenter.init();
filterPresenter.init();

api.getMovies()
  .then((cards) => {
    cardsModel.setCards(UpdateType.INIT, cards);
    render(siteHeaderElement, new Profile(cards), RenderPosition.BEFOREEND);
    saitStats.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    cardsModel.setCards(UpdateType.INIT, []);
    render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
    saitStats.setMenuClickHandler(handleSiteMenuClick);
  });
