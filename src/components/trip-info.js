import AbstractComponent from './abstract-component.js';
import {parseDate} from '../utils/common.js';

const getMiddleValue = (citiesArr) => {
  let str = ``;
  const FIRST_ELEMENT = 1;
  const MIN_ELEMENTS = 2;
  const MAX_ELEMENTS = 3;
  switch (true) {
    case citiesArr.length <= MIN_ELEMENTS:
      str = `&nbsp;&mdash;&nbsp;`;
      break;
    case citiesArr.length === MAX_ELEMENTS:
      str = `&nbsp;&mdash;&nbsp; ${citiesArr[FIRST_ELEMENT]} &nbsp;&mdash;&nbsp;`;
      break;
    default:
      str = `&nbsp;&mdash;&nbsp; ... &nbsp;&mdash;&nbsp;`;
      break;
  }
  return str;
};

const getTripCities = (citiesArr, startDates) => {
  return `${startDates[0].city} ${getMiddleValue(citiesArr)} ${startDates[startDates.length - 1].city}`;
};

export default class TripInfo extends AbstractComponent {
  constructor(points) {
    super();
    this._points = points;
    this._startDates = this._points.slice().sort((a, b) => a.startDate - b.startDate);
    this._endDates = this._points.slice().sort((a, b) => a.endDate - b.endDate);
    this._cities = [...new Set(this._points.map((it) => it.city))];
  }

  getTemplate() {
    return (
      `${this._points.length === 0 ? `<div class="trip-info__main">
        <h1 class="trip-info__title"></h1>
        <p class="trip-info__dates"></p>
      </div>` :
        `<div class="trip-info__main">
        <h1 class="trip-info__title">
        ${getTripCities(this._cities, this._startDates)}
        </h1>

        <p class="trip-info__dates">
          ${parseDate(new Date(this._points[0].startDate))}
          &nbsp;&mdash;&nbsp;
          ${parseDate(new Date(this._endDates[this._endDates.length - 1].endDate))}
        </p>
      </div>`
      }`
    );
  }
}
