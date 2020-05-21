import {createElement} from "../utils.js";

const createTripDaysItemTemplate = (eventDate, day) => {
  // const {dateFrom} = event;

  const pointDate = new Date(eventDate).toLocaleString(`en-US`, {month: `long`, day: `numeric`});

  return (
    `<li class="trip-days__item  day">
       <div class="day__info">
         <span class="day__counter">${day}</span>
         <time class="day__date" datetime="2019-03-18">${pointDate}</time>
       </div>
     </li>`
  );
};

export default class DaysItem {
  constructor(event, day) {
    this._event = event;
    this._day = day;
    this._element = null;
  }

  getTemplate() {
    return createTripDaysItemTemplate(this._event, this._day);
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
