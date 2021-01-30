// import Abstract from "./abstract.js";
// import {MenuItem} from "../const.js";

// const createStatsTemplate = (activFilter) => (
//   `<nav class="main-navigation">
//     <a href="#stats" class="main-navigation__additional ${MenuItem.STATISTICS === activFilter ? `main-navigation__additional--active` : ``}" data-stats-name="stats">Stats</a>
//   </nav>`
// );

// export default class MenuStatistics extends Abstract {
//   constructor(activFilter) {
//     super();
//     this._activFilter = activFilter;
//     this._menuClickHandler = this._menuClickHandler.bind(this);
//     this.setMenuClickHandler();
//   }

//   getTemplate() {
//     return createStatsTemplate(this._activFilter);
//   }

//   restoreHandlers() {
//     this.setMenuClickHandler();
//   }

//   _menuClickHandler(evt) {
//     evt.preventDefault();
//     if (evt.target.dataset.statsName === `stats`) {
//       this._callback.menuClick(MenuItem.STATISTICS);

//     } else {
//       this._callback.menuClick(MenuItem.FILTER);
//     }
//   }

//   setMenuClickHandler(callback) {
//     this._callback.menuClick = callback;
//     this.getElement().addEventListener(`click`, this._menuClickHandler);
//   }
// }

