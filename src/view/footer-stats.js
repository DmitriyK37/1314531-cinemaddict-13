import Abstract from "./abstract.js";

const createQuantityFilm = (allFilms) => {
  return `<section class="footer__statistics">
            <p>${allFilms} movies inside</p>
          </section>`;
};

export default class QuantityFilm extends Abstract {
  constructor(allFilms) {
    super();
    this._allFilms = allFilms;
  }

  getTemplate() {
    return createQuantityFilm(this._allFilms);
  }
}
