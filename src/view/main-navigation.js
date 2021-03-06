import Abstract from "./abstract";
import {FilterType} from "../const";

export default class SiteMenu extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._statisticShowClickHandler = this._statisticShowClickHandler.bind(this);
  }

  getTemplate() {
    const activeClassName = `main-navigation__item--active`;

    const filterCount = [];
    this._filters.forEach((filter) => {
      filterCount.push(filter.count);
    });

    return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item ${this._currentFilter === FilterType.ALL ? activeClassName : ``}" data-filter-type="${FilterType.ALL}">All movies</a>
      <a href="#watchlist" class="main-navigation__item ${this._currentFilter === FilterType.WATCHLIST ? activeClassName : ``}" data-filter-type="${FilterType.WATCHLIST}">Watchlist <span class="main-navigation__item-count">${filterCount[1]}</span></a>
      <a href="#history" class="main-navigation__item ${this._currentFilter === FilterType.HISTORY ? activeClassName : ``}" data-filter-type="${FilterType.HISTORY}">History <span class="main-navigation__item-count">${filterCount[2]}</span></a>
      <a href="#favorites" class="main-navigation__item ${this._currentFilter === FilterType.FAVORITES ? activeClassName : ``}" data-filter-type="${FilterType.FAVORITES}">Favorites <span class="main-navigation__item-count">${filterCount[3]}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional ${this._currentFilter === FilterType.STATS ? activeClassName : ``}" data-filter-type="${FilterType.STATS}">Stats</a>
  </nav>`;
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    if (evt.target.dataset.filterType) {
      evt.preventDefault();
      this._callback.filterTypeChange(evt.target.dataset.filterType);
    }
  }

  _statisticShowClickHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.statistic();
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }

  setStatisticShowClickHandler(callback) {
    this._callback.statistic = callback;
    this.getElement()
      .querySelector(`.main-navigation__additional`)
      .addEventListener(`click`, this._statisticShowClickHandler);
  }
}
