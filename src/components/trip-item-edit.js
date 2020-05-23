import AbstractComponent from "./abstract-component.js";

import {DESTINATION_CITY, OFFERS_TYPE} from "../const";

const createEventTypeMarkup = (name, id) => {
  const typeTitle = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    `<div class="event__type-item">
       <input id="event-type-${id}" class="event__type-input  visually-hidden" type="radio"
         name="event-type" value="${name}">
       <label class="event__type-label  event__type-label--${name}" for="event-type-${id}">${typeTitle}</label>
     </div>`
  );
};

const createEventPhotoMarkup = (src, alt) => {
  return (
    `<img class="event__photo" src="${src}" alt="${alt}">`
  );
};

const createActivityMarkup = (name, id) => {
  const typeTitle = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    `<div class="event__type-item">
       <input id="event-type-${id}" class="event__type-input  visually-hidden" type="radio"
         name="event-type" value="${name}">
       <label class="event__type-label  event__type-label--${name}"
         for="event-type-${id}">${typeTitle}</label>
     </div>`
  );
};

const createDestinationMarkup = (city) => {
  return (
    `<option value="${city}"></option>`
  );
};

const createOfferOptionsMarkup = (title, price, id, isChecked) => {
  return (
    `<div class="event__offer-selector">
       <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}" ${isChecked ? `checked` : ``}>
       <label class="event__offer-label" for="event-offer-${id}">
         <span class="event__offer-title">${title}</span>
         &plus;
         &euro;&nbsp;<span class="event__offer-price">${price}</span>
       </label>
     </div>`
  );
};

const createFavoriteMarkup = (isFavorite) => {
  return (
    `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
     <label class="event__favorite-btn" for="event-favorite-1">
       <span class="visually-hidden">Add to favorite</span>
       <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
         <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
       </svg>
     </label>`
  );
};

const createEventEditTemplate = (event) => {
  const {dateFrom, dateTo, destination, isFavorite, offers} = event;

  const eventType = OFFERS_TYPE.slice(0, OFFERS_TYPE.length - 3).map((title, i) => createEventTypeMarkup(title, i)).join(`\n`);
  const activityType = OFFERS_TYPE.slice(-3).map((title, i) => createActivityMarkup(title, i)).join(`\n`);

  const destinationMarkup = DESTINATION_CITY.map((city) => createDestinationMarkup(city)).join(`\n`);
  const eventOptionMarkup = offers.map((it, i) => createOfferOptionsMarkup(it.title, it.price, i, i === 0)).join(`\n`);
  const eventPhoto = destination.pictures.map((it) => createEventPhotoMarkup(it.src, it.description)).join(`\n`);
  const description = destination.description;
  const favorite = createFavoriteMarkup(isFavorite);

  const beginTime = dateFrom.split(`T`)[0];
  const endTime = dateTo.split(`T`)[0];

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post" id="event-edit-form">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Transfer</legend>
                    ${eventType}
                  </fieldset>

                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>
                    ${activityType}
                  </fieldset>

                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  Flight to
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
                <datalist id="destination-list-1">
                ${destinationMarkup}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${beginTime}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>
              ${favorite}
            </header>
            <section class="event__details">
              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                <div class="event__available-offers">
                  ${eventOptionMarkup}
                </div>
              </section>

              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${description}</p>

                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    ${eventPhoto}
                  </div>
                </div>
              </section>
            </section>
          </form>`
  );
};

export default class EventEdit extends AbstractComponent {
  constructor(event) {
    super();

    this._event = event;
  }

  getTemplate() {
    return createEventEditTemplate(this._event);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
  }
}

