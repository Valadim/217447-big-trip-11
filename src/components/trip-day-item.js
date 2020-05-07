import {createElement} from "../utils.js";

const createTripDaysItemTemplate = (date) => {
  const {tripDay, tripDate} = date;
  return (
    `<li class="trip-days__item  day">
       <div class="day__info">
         <span class="day__counter">${tripDay}</span>
         <time class="day__date" datetime="2019-03-18">${tripDate}</time>
       </div>
     </li>`
  );
};

export default class DaysItem {
  constructor(date) {
    this._date = date;
    this._element = null;
  }

  getTemplate() {
    return createTripDaysItemTemplate(this._date);
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
