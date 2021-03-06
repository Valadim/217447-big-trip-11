import AbstractComponent from './abstract-component.js';
import {parseTime, capitalizeFirstLetter} from '../utils/common.js';
import {TRANSFER_TYPES} from '../const.js';

const getDateDiff = (startDate, endDate) => {
  const MILLISECONDS_IN_DAY = 86400000;
  const MILLISECONDS_IN_HOUR = 3600000;
  const MILLISECONDS_IN_MINUTE = 60000;
  const days = Math.floor(((endDate - startDate) / MILLISECONDS_IN_DAY));
  const hours = Math.floor(((endDate - startDate) % MILLISECONDS_IN_DAY) / MILLISECONDS_IN_HOUR);
  const minutes = Math.round((((endDate - startDate) % MILLISECONDS_IN_DAY) % MILLISECONDS_IN_HOUR) / MILLISECONDS_IN_MINUTE);

  const addZero = (value) => value < 10 ? `0${value}` : `${value}`;

  const daysOutput = days !== 0 ? `${addZero(days)}D ` : ``;
  const hoursOutput = hours !== 0 ? `${addZero(hours)}H ` : ``;
  const minutesOutput = minutes !== 0 ? `${addZero(minutes)}M ` : ``;

  return daysOutput + hoursOutput + minutesOutput;
};

export default class TripEventItem extends AbstractComponent {
  constructor(point) {
    super();
    this._point = point;
    this._type = this._point.type;
    this._city = this._point.city;
    this._startDate = this._point.startDate;
    this._endDate = this._point.endDate;
    this._price = this._point.price;
    this._offers = this._point.offers;
    this._timezoneCorrection = new Date().getTimezoneOffset() * 60 * 1000;
  }

  getTemplate() {
    return (
      `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${capitalizeFirstLetter(this._type)} ${TRANSFER_TYPES.includes(this._type) ? `to` : `in`} ${this._city}</h3>

          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time"
                datetime="${new Date(this._startDate - this._timezoneCorrection).toISOString().slice(0, 16)}">
                ${parseTime(this._startDate)}
              </time>
              &mdash;
              <time class="event__end-time"
                datetime="${new Date(this._endDate - this._timezoneCorrection).toISOString().slice(0, 16)}">
                ${parseTime(this._endDate)}
              </time>
            </p>
            <p class="event__duration">${this._startDate === this._endDate ? `0D 0H 0M` : getDateDiff(this._startDate, this._endDate)}</p>
          </div>

          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${this._price}</span>
          </p>

          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${this._offers
              .slice(0, 3)
              .map((offer) => {
                const {title, price: cost} = offer;
                return (
                  `<li class="event__offer">
                  <span class="event__offer-title">${title}</span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">${cost}</span>
                </li>`
                );
              }
              ).join(``)}
          </ul>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
    );
  }

  setClickHandler(handler) {
    this.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, handler);
  }
}
