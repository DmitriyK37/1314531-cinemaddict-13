import Abstract from "./abstract.js";

const createFilmsListContainer = () => (
  `<div class="films-list__container"></div>`
);

export default class FilmsList extends Abstract {
  getTemplate() {
    return createFilmsListContainer();
  }
}
