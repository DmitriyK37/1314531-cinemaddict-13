import Abstract from "./abstract.js";

const createFilmsBoardTemplate = () => (
  `<section class="films">
  </section>`
);

export default class Films extends Abstract {
  getTemplate() {
    return createFilmsBoardTemplate();
  }
}
