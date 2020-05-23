import AbstractComponent from "./abstract-component";

const createTripInfoMainTemplate = (tripInfo) => {
  const {route, dateRange} = tripInfo;
  return (
    `<div class="trip-info__main">
       <h1 class="trip-info__title">${route}</h1>
       <p class="trip-info__dates">${dateRange}</p>
     </div>`
  );
};

export default class TripInfoMain extends AbstractComponent {
  constructor(tripInfo) {
    super();

    this._tripInfo = tripInfo;
  }

  getTemplate() {
    return createTripInfoMainTemplate(this._tripInfo);
  }
}
