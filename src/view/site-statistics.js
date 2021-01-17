import Abstract from "./abstract.js";
import {MenuItem} from "../const.js";

const createStatsTemplate = () => (
  `<nav class="main-navigation">
    <a href="#stats" class="main-navigation__additional" data-stats-name="stats">Stats</a>
  </nav>`
);

export default class MenuStatistics extends Abstract {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createStatsTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.dataset.statsName === `stats`) {
      this._callback.menuClick(MenuItem.STATISTICS);

    } else {
      this._callback.menuClick(MenuItem.FILTER);
    }
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }
}

