import Abstract from "./abstract.js";

const createTopRatedFilmsTemplate = () => (
  `<section class="films-list films-list--extra films-list--top-rate">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container"></div>
  </section>`
);

export default class TopRatedFilms extends Abstract {
  getTemplate() {
    return createTopRatedFilmsTemplate();
  }
}
