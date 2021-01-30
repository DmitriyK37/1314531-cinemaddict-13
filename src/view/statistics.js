import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Smart from "./smart";
import {getUserTitle} from "./profile";

dayjs.extend(duration);

const BAR_HEIGHT = 100;

export const renderChart = (statisticCtx, uniqGenre, uniqGenreQuantitys) => {
  statisticCtx.height = BAR_HEIGHT * 5;
  const uniqGenreQuantity = uniqGenreQuantitys.sort((a, b) => {
    return (+b) - (+a);
  });

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: uniqGenre,
      datasets: [{
        data: uniqGenreQuantity,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createGenres = (cards) => {
  const cardGenre = cards.map((card) => card.genre);
  const cardGenres = cardGenre.reduce((a, b) => a.concat(b), []);
  return cardGenres.reduce((acc, item) => {
    if (acc.hasOwnProperty(item)) {
      acc[item]++;
    } else {
      acc[item] = 1;
    }
    return acc;
  }, []);
};

const createTotalDurationMarkup = (cards) => {
  const totalDuration = cards.reduce((sum, card) => {
    return sum + card.duration;
  }, 0);

  const hours = totalDuration >= 60 ? `${Math.trunc(totalDuration / 60)} <span class="statistic__item-description">h</span>` : ``;
  const minutes = (totalDuration % 60) > 0 ? `${totalDuration % 60} <span class="statistic__item-description">m</span>` : ``;

  return hours && minutes ? `${hours} ${minutes}` : null;
};

const createStatsTemplate = (cards, uniqGenre, activeFilter) => {
  const rank = getUserTitle(cards);
  const topGenre = uniqGenre[0];
  const totalDurationMarkup = createTotalDurationMarkup(cards);

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${rank}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${activeFilter === `all-time` ? `checked` : ``}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${activeFilter === `today` ? `checked` : ``}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${activeFilter === `week` ? `checked` : ``}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${activeFilter === `month` ? `checked` : ``}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${activeFilter === `year` ? `checked` : ``}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${cards.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${totalDurationMarkup}</p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </section>`;
};

export default class Statistics extends Smart {
  constructor(cards) {
    super();
    this._data = cards;
    this._statisticDate = this._data;
    this._activeFilter = `all-time`;

    this._formChangehandler = this._formChangehandler.bind(this);
    this._setFilterClickHandler();
    this._setCharts();
  }

  removeElement() {
    super.removeElement();
    if (this._genresChart !== null) {
      this._genresChart = null;
    }
  }

  getTemplate() {
    this._uniqGenre = Object.keys(createGenres(this._statisticDate));
    this._uniqGenreQuantitys = Object.values(createGenres(this._statisticDate));
    return createStatsTemplate(this._statisticDate, this._uniqGenre, this._activeFilter);
  }

  restoreHandlers() {
    this._setCharts();
    this._setFilterClickHandler();
  }

  _formChangehandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName === `INPUT`) {
      this._activeFilter = evt.target.value;
      switch (this._activeFilter) {
        case `all-time`:
          this._statisticDate = this._data.filter((item) => dayjs(item.watchDate));
          break;
        case `today`:
          this._statisticDate = this._data.filter((item) => dayjs(item.watchDate).isAfter(dayjs().add(-1, `day`)));
          break;
        case `week`:
          this._statisticDate = this._data.filter((item) => dayjs(item.watchDate).isAfter(dayjs().add(-1, `week`)));
          break;
        case `month`:
          this._statisticDate = this._data.filter((item) => dayjs(item.watchDate).isAfter(dayjs().add(-1, `month`)));
          break;
        case `year`:
          this._statisticDate = this._data.filter((item) => dayjs(item.watchDate).isAfter(dayjs().add(-1, `year`)));
          break;
      }
      this.updateElement(this._statisticDate);
    }
  }

  _setFilterClickHandler() {
    this.getElement().querySelector(`form`)
      .addEventListener(`change`, this._formChangehandler);
  }

  _setCharts() {
    if (this._genresChart !== null) {
      this._genresChart = null;
    }
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);

    this._genresChart = renderChart(statisticCtx, this._uniqGenre, this._uniqGenreQuantitys);
  }
}
