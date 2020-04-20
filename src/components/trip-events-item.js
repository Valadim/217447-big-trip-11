import {TRANSFER_TYPE, ACTIVITY_TYPE, DESTINATION_CITY} from "../const";

const createEventOfferMarkup = (title, price) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      +
      €&nbsp;<span class="event__offer-price">${price}</span>
     </li>`
  );
};

export const createTripPointItemTemplate = (eventOffers) => {
  const offersNumber = Math.floor(Math.random() * eventOffers.length);
  const eventOfferMarkup = eventOffers.map((it) => createEventOfferMarkup(it.title, it.price)).slice(0, offersNumber).join(`\n`);
  const destinationCity = DESTINATION_CITY[Math.floor(Math.random() * DESTINATION_CITY.length)];
  const transferType = TRANSFER_TYPE[Math.floor(Math.random() * TRANSFER_TYPE.length)];
  const date = `2019-03-18T`;
  const startTime = `10:30`;
  const endTime = `11:00`;
  const eventDuration = `30M`;
  const price = Math.floor(Math.random() * 100);
  return (
    `<li class="trip-events__item">
       <div class="event">
         <div class="event__type">
           <img class="event__type-icon" width="42" height="42" src="img/icons/${transferType.toLowerCase()}.png" alt="Event type icon">
         </div>
         <h3 class="event__title">${transferType} to ${destinationCity}</h3>

         <div class="event__schedule">
           <p class="event__time">
             <time class="event__start-time" datetime="${date}${startTime}">${startTime}</time>
             —
             <time class="event__end-time" datetime="${date}${endTime}">${endTime}</time>
           </p>
           <p class="event__duration">${eventDuration}</p>
         </div>

         <p class="event__price">
           €&nbsp;<span class="event__price-value">${price}</span>
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
