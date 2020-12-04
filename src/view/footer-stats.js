import Abstract from "./abstract.js";

const createQuantityFilm = () => (
  `<section class="footer__statistics">
    <p>130 291 movies inside</p>
  </section>`
);

export default class QuantityFilm extends Abstract {
  getTemplate() {
    return createQuantityFilm();
  }
}
