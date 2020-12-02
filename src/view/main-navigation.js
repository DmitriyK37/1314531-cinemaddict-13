import {createElement} from "../utils.js";

const createMainNavigationTemplate = (filter) => {
  const {name, count} = filter;
  const filterName = name !== `all` ? name[0].toUpperCase() + name.substr(1).toLowerCase() : `All movies`;

  return `<a href="#${name}" class="main-navigation__item">${filterName} <span class="main-navigation__item-count">${count}</span></a>`;
};

const createMenuTemplate = (filters) => {
  const filterItems = filters
    .map((filter) => createMainNavigationTemplate(filter))
    .join(``);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterItems}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class SiteMenu {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
