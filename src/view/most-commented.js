import Abstract from "./abstract.js";

const createMostCommentedFilmsTemplate = () => (
  `<section class="films-list films-list--extra films-list--most-commented">
    <h2 class="films-list__title">Most Commented</h2>
    <section class="films-list__container"></section>
  </section>`
);

export default class MostCommentedFilms extends Abstract {
  getTemplate() {
    return createMostCommentedFilmsTemplate();
  }
}
