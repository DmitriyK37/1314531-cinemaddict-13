import Profile from "./view/profile.js";
import SiteMenu from "./view/main-navigation.js";
import Sort from "./view/sort.js";
import FilmsBoard from "./view/films.js";
import FilmsList from "./view/films-container.js";
import FilmCard from "./view/film-card.js";
import ShowMoreButton from "./view/show-more.js";
import TopRatedFilms from "./view/top-rate.js";
import MostCommentedFilms from "./view/most-commented.js";
import QuantityFilm from "./view/footer-stats.js";
import Popup from "./view/popup.js";
import NoCard from "./view/no-card.js";
import {generateCard} from "./mock/card.js";
import {generateFilter} from "./mock/filter.js";
import {render, RenderPosition} from "./utils/render.js";

const CARD = 20;
const CARD_STEP = 5;
const TOP_RATED_CARD = 2;
const MOST_COMMENTED_CARD = 2;

const cards = new Array(CARD).fill().map(generateCard);
const filters = generateFilter(cards);

const body = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenu(filters), RenderPosition.BEFOREEND);
const fillterAll = document.querySelector(`.main-navigation__item`);
fillterAll.classList.add(`main-navigation__item--active`);
render(siteMainElement, new Sort(), RenderPosition.BEFOREEND);

if (cards.length === 0) {
  render(siteMainElement, new NoCard(), RenderPosition.BEFOREEND);
} else {
  render(siteMainElement, new FilmsBoard(), RenderPosition.BEFOREEND);
  const filmsBlock = document.querySelector(`.films`);
  const filmListElement = filmsBlock.querySelector(`.films-list`);
  render(filmListElement, new FilmsList(), RenderPosition.BEFOREEND);
  const filmsListElementContainer = filmListElement.querySelector(`.films-list__container`);

  const renderCard = (cardListElement, card) => {
    const cardComponent = new FilmCard(card);
    const popupComponent = new Popup(card);

    const openPopup = () => {
      body.appendChild(popupComponent.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const closePopup = () => {
      body.removeChild(popupComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    cardComponent.setCardClickHandler(() => {
      openPopup();
      body.classList.add(`hide-overflow`);
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        closePopup();
        document.removeEventListener(`keydown`, onEscKeyDown);
        body.classList.remove(`hide-overflow`);
      }
    };

    popupComponent.setPopupClickHandler(() => {
      closePopup();
      body.classList.remove(`hide-overflow`);
    });

    render(cardListElement, cardComponent, RenderPosition.BEFOREEND);
  };

  for (let i = 0; i < Math.min(cards.length, CARD_STEP); i++) {
    renderCard(filmsListElementContainer, (cards[i]));
  }

  if (cards.length > CARD_STEP) {
    let renderTemplateedCardCount = CARD_STEP;
    const showMoreButtonComponent = new ShowMoreButton();
    render(filmListElement, showMoreButtonComponent, RenderPosition.BEFOREEND);
    showMoreButtonComponent.setClickHandler(() => {
      cards
    .slice(renderTemplateedCardCount, renderTemplateedCardCount + CARD_STEP)
    .forEach((card) => renderCard(filmsListElementContainer, card));

      renderTemplateedCardCount += CARD_STEP;

      if (renderTemplateedCardCount >= cards.length) {
        showMoreButtonComponent.getElement().remove();
        showMoreButtonComponent.removeElement();
      }
    });
  }

  render(filmsBlock, new TopRatedFilms(), RenderPosition.BEFOREEND);
  const topRateFilmsBlock = filmsBlock.querySelector(`.films-list--top-rate`);
  const topRateElementContainer = topRateFilmsBlock.querySelector(`.films-list__container`);
  const topRateBox = (cards.sort((a, b) => {
    return b.rating - a.rating;
  }));
  const topRateCard = topRateBox.slice(0, 2);
  for (let i = 0; i < TOP_RATED_CARD; i++) {
    renderCard(topRateElementContainer, topRateCard[i]);
  }

  render(filmsBlock, new MostCommentedFilms(), RenderPosition.BEFOREEND);
  const mostCommentedFilmsBlock = filmsBlock.querySelector(`.films-list--most-commented`);
  const mostCommentedFilmsContainer = mostCommentedFilmsBlock.querySelector(`.films-list__container`);
  const mostCommentedBox = (cards.sort((a, b) => {
    return b.comments.length - a.comments.length;
  }));
  const mostCommentedCard = mostCommentedBox.slice(0, 2);
  for (let i = 0; i < MOST_COMMENTED_CARD; i++) {
    renderCard(mostCommentedFilmsContainer, mostCommentedCard[i]);
  }
}
// const footer = document.querySelector(`.footer`);
const footerStatistic = document.querySelector(`.footer__statistics`);
render(footerStatistic, new QuantityFilm(), RenderPosition.BEFOREEND);
