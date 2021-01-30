import QuantityFilm from "./view/footer-stats.js";
import Filter from "./presenter/filter.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import MovieList from "./presenter/movieList.js";
import CardsModel from "./model/movies.js";
import FilterModel from "./model/filter.js";
// import Statistics from "./view/statistics.js";
// import SiteMenu from "./view/main-navigation.js";
// import MenuStatistics from "./view/site-statistics.js";
import {MenuItem, UpdateType, FilterType} from "./const.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic jkdgfl98dg9jsdu`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict`;

const api = new Api(END_POINT, AUTHORIZATION);

const cardsModel = new CardsModel();

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.main`);

// let saitStats = new MenuStatistics();
// render(siteMainElement, new SiteMenu(), RenderPosition.BEFOREEND);
const filterPresenter = new Filter(siteMainElement, filterModel, cardsModel, api);
const listPresenter = new MovieList(siteMainElement, cardsModel, filterModel, api);

// let statisticsComponent = null;

const footerStatistic = document.querySelector(`.footer__statistics`);
render(footerStatistic, new QuantityFilm(), RenderPosition.BEFOREEND);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.FILTER:
      listPresenter.destroy();
      listPresenter.init();
      // remove(statisticsComponent);
      break;
    case MenuItem.STATISTICS:
      listPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
      // statisticsComponent = new Statistics(cardsModel.getCards());
      // remove(saitStats);
      // saitStats = new MenuStatistics(MenuItem.STATISTICS);
      // render(siteMainElement, saitStats, RenderPosition.BEFOREEND);
      // render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

listPresenter.init();
filterPresenter.init();

api.getMovies()
  .then((cards) => {
    cardsModel.setCards(UpdateType.INIT, cards);
    // saitStats.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    cardsModel.setCards(UpdateType.INIT, []);
    // saitStats.setMenuClickHandler(handleSiteMenuClick);
  });
