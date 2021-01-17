import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Smart from "./smart";
import {FilterType} from "../const.js";
import {filter} from "../utils/filter.js";
import {TimeFilter} from "../const.js";
dayjs.extend(duration);

const BAR_HEIGHT = 50;

export const renderChart = (statisticCtx, uniqGenre, uniqGenreQuantitys) => {

  const uniqGenreQuantity = uniqGenreQuantitys.sort((a, b) => {
    return (+b) - (+a);
  });
  // const uniqGenreAll = uniqGenre;

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

const createStatsTemplate = (cards, uniqGenre) => {
  const topGenre = uniqGenre[0];
  const totalDurationMarkup = createTotalDurationMarkup(cards);

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Sci-Fighter</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${filter[FilterType.HISTORY](cards).length} <span class="statistic__item-description">movies</span></p>
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
      <canvas class="statistic__chart" width="1000" height="${BAR_HEIGHT * cards.length}"></canvas>
    </div>
  </section>`;
};

export default class Statistics extends Smart {
  constructor(cards) {
    super();

    cards = filter[FilterType.HISTORY](cards);
    this._data = cards;
    this._uniqGenre = Object.keys(createGenres(this._data));
    this._uniqGenreQuantitys = Object.values(createGenres(this._data));
    this._setCharts();
  }

  getTemplate() {

    return createStatsTemplate(this._data, this._uniqGenre);
  }

  // restoreHandlers() {
  //   this._setCharts();
  // }

  // _dateChangeHandler([dateFrom, dateTo]) {
  //   if (!dateFrom || !dateTo) {
  //     return;
  //   }

  //   this.updateData({
  //     dateFrom,
  //     dateTo
  //   });
  // }

  _setCharts() {
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    this._genresChart = renderChart(statisticCtx, this._uniqGenre, this._uniqGenreQuantitys);
  }
}
