const createMainNavigationTemplate = (filter) => {
  const {name, count} = filter;
  const filterName = name !== `all` ? name[0].toUpperCase() + name.substr(1).toLowerCase() : `All movies`;

  return `<a href="#${name}" class="main-navigation__item">${filterName} <span class="main-navigation__item-count">${count}</span></a>`;
};

export const createMenuTemplate = (filters) => {
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
