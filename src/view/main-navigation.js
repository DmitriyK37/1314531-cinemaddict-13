import Abstract from "./abstract.js";

const createMainNavigationTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  const filterName = name !== `All` ? (name[0].toUpperCase() + name.substr(1).toLowerCase()) : `All movies`;

  return `<a href="#${name}" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}" data-filter-name=${name}>${filterName} ${name !== `All` ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`;
};

const createMenuTemplate = (filters, currentFilterType) => {
  const filterItems = filters
    .map((filter) => createMainNavigationTemplate(filter, currentFilterType))
    .join(``);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterItems}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class SiteMenu extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName === `A`) {
      evt.preventDefault();
      this._callback.filterTypeChange(evt.target.dataset.filterName);
    }
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
