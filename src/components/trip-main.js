import {createElement} from "../utils.js";

const createTripInfoMainTemplate = (tripInfo) => {
  const {route, dateRange} = tripInfo;
  return (
    `<div class="trip-info__main">
       <h1 class="trip-info__title">${route}</h1>
       <p class="trip-info__dates">${dateRange}</p>
     </div>`
  );
};

export default class TripInfoMain {
  constructor(tripInfo) {
    this._tripInfo = tripInfo;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoMainTemplate(this._tripInfo);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
