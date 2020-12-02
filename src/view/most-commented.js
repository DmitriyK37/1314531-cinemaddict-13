import {createElement} from "../utils.js";

const createMostCommentedFilmsTemplate = () => (
  `<section class="films-list films-list--extra films-list--most-commented">
    <h2 class="films-list__title">Most Commented</h2>
    <section class="films-list__container"></section>
  </section>`
);

export default class MostCommentedFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMostCommentedFilmsTemplate();
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
