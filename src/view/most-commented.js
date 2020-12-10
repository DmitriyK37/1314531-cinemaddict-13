import Abstract from "./abstract.js";

const createMostCommentedFilmsTemplate = () => (
  `<section class="films-list films-list--extra films-list--most-commented">
    <h2 class="films-list__title">Most Commented</h2>
    <div class="films-list__container"></div>
  </section>`
);

export default class MostCommentedFilms extends Abstract {
  getTemplate() {
    return createMostCommentedFilmsTemplate();
  }
}
