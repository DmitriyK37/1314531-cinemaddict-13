// import Abstract from "./abstract.js";

// const createQuantityFilm = () => (
//   `<section class="footer__statistics">
//     <p>130 291 movies inside</p>
//   </section>`
// );

// export default class QuantityFilm extends Abstract {
//   getTemplate() {
//     return createQuantityFilm();
//   }
// }

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
