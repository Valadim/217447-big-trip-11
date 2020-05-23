import AbstractComponent from "./abstract-component.js";

const createTripDaysItemTemplate = (eventDate, day) => {

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

export default class DaysItem extends AbstractComponent {
  constructor(event, day) {
    super();

    this._event = event;
    this._day = day;
  }

  getTemplate() {
    return createTripDaysItemTemplate(this._event, this._day);
  }
}
