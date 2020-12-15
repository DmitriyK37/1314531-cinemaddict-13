import Abstract from "./abstract.js";

const createFilmsBoardTemplate = () => (
  `<section class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </section>`
);

export default class FilmBoard extends Abstract {
  getTemplate() {
    return createFilmsBoardTemplate();
  }
}
