import {createElement} from "../utils.js";

const createEventOfferMarkup = (title, price) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      +
      €&nbsp;<span class="event__offer-price">${price}</span>
     </li>`
  );
};

const createEventItemTemplate = (event) => {
  const {basePrice, dateFrom, dateTo, destination, offers, type} = event;
  const eventOfferMarkup = offers.map((it) => createEventOfferMarkup(it.title, it.price)).join(`\n`);

  const beginTime = dateFrom.split(`T`)[1].slice(0, 5);
  const endTime = dateTo.split(`T`)[1].slice(0, 5);

  const typeTitle = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    `<li class="trip-events__item">
       <div class="event">
         <div class="event__type">
           <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
         </div>
         <h3 class="event__title">${typeTitle} to ${destination.name}</h3>

         <div class="event__schedule">
           <p class="event__time">
             <time class="event__start-time" datetime="${dateFrom}">${beginTime}</time>
             —
             <time class="event__end-time" datetime="${dateTo}">${endTime}</time>
           </p>
           <p class="event__duration">${`30M`}</p>
         </div>

         <p class="event__price">
           €&nbsp;<span class="event__price-value">${basePrice}</span>
         </p>

         <h4 class="visually-hidden">Offers:</h4>
         <ul class="event__selected-offers">
           ${eventOfferMarkup}
         </ul>

         <button class="event__rollup-btn" type="button">
           <span class="visually-hidden">Open event</span>
         </button>
       </div>
     </li>`
  );
};

export default class EventItem {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createEventItemTemplate(this._event);
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
