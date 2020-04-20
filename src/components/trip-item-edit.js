import {DESTINATION_DESCRIPTION} from "../const"
const createTransferTypeMarkup = (name) => {
  return (
    `<div class="event__type-item">
       <input id="event-type-${name.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio"
         name="event-type" value="${name.toLowerCase()}">
       <label class="event__type-label  event__type-label--${name.toLowerCase()}" for="event-type-${name.toLowerCase()}-1">${name}</label>
     </div>`
  );
};

const createActivityMarkup = (name) => {
  return (
    `<div class="event__type-item">
       <input id="event-type-${name.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio"
         name="event-type" value="${name.toLowerCase()}">
       <label class="event__type-label  event__type-label--${name.toLowerCase()}"
         for="event-type-${name.toLowerCase()}-1">${name}</label>
     </div>`
  );
};

const createDestinationMarkup = (name) => {
  return (
    `<option value="${name}"></option>`
  );
};

const createOfferMarkup = (title, price, className, isChecked) => {
  return (
    `<div class="event__offer-selector">
       <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${isChecked ? `checked` : ``}>
       <label class="event__offer-label" for="event-offer-luggage-1">
         <span class="event__offer-title">${title}</span>
         &plus;
         &euro;&nbsp;<span class="event__offer-price">${price}</span>
       </label>
     </div>`
  );
};

const createEventDescription = () => {
  return (DESTINATION_DESCRIPTION.slice(Math.floor(Math.random() * DESTINATION_DESCRIPTION.length)));
};

//

// const createRepeatingDaysMarkup = (days, repeatingDays) => {
//   return days
//     .map((day, index) => {
//       const isChecked = repeatingDays[day];
//       return (
//         `<input
//           class="visually-hidden card__repeat-day-input"
//           type="checkbox"
//           id="repeat-${day}-${index}"
//           name="repeat"
//           value="${day}"
//           ${isChecked ? `checked` : ``}
//         />
//         <label class="card__repeat-day" for="repeat-${day}-${index}"
//           >${day}</label
//         >`
//       );
//     })
//     .join(`\n`);
// };

//

const createEventPhoto = () => {
  const rand = Math.floor(Math.random() * 5);
  const photos = [];
  for (let i = 0; i <= rand; i++) {
    photos.push(`<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo">`);
  }
  return photos;
};

export const createAddEventTemplate = (eventsType) => {

  const transferTypeMarkup = eventsType.transfer.map((it) => createTransferTypeMarkup(it)).join(`\n`);
  const activityTypeMarkup = eventsType.activity.map((it) => createActivityMarkup(it)).join(`\n`);
  const destinationMarkup = eventsType.destination.map((it) => createDestinationMarkup(it)).join(`\n`);
  // const offermarkup = createOfferMarkup();
  const eventDescription = createEventDescription();
  const eventPhoto = createEventPhoto().join(`\n`);
  const date = `18/03/19`;
  const time = `00:00`;
  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
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
                    ${transferTypeMarkup}                    
                  </fieldset>

                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>
                    ${activityTypeMarkup}
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
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${date} ${time}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${date} ${time}">
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
            </header>
            <section class="event__details">
              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers">
                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
                    <label class="event__offer-label" for="event-offer-luggage-1">
                      <span class="event__offer-title">Add luggage</span>
                      &plus;
                      &euro;&nbsp;<span class="event__offer-price">30</span>
                    </label>
                  </div>

                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
                    <label class="event__offer-label" for="event-offer-comfort-1">
                      <span class="event__offer-title">Switch to comfort class</span>
                      &plus;
                      &euro;&nbsp;<span class="event__offer-price">100</span>
                    </label>
                  </div>

                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
                    <label class="event__offer-label" for="event-offer-meal-1">
                      <span class="event__offer-title">Add meal</span>
                      &plus;
                      &euro;&nbsp;<span class="event__offer-price">15</span>
                    </label>
                  </div>

                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
                    <label class="event__offer-label" for="event-offer-seats-1">
                      <span class="event__offer-title">Choose seats</span>
                      &plus;
                      &euro;&nbsp;<span class="event__offer-price">5</span>
                    </label>
                  </div>

                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
                    <label class="event__offer-label" for="event-offer-train-1">
                      <span class="event__offer-title">Travel by train</span>
                      &plus;
                      &euro;&nbsp;<span class="event__offer-price">40</span>
                    </label>
                  </div>
                </div>
              </section>

              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${eventDescription}</p>

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
