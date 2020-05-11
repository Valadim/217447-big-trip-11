export const DESTINATION_DESCRIPTION = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
];

export const DESTINATION_CITY = [`Amsterdam`, `Tacoma`, `Geneva`, `Miami`, `Saint Petersburg`];

export const EVENT_INFO = {
  transferType: [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`],
  activityType: [`Check-in`, `Sightseeing`, `Restaurant`],
  destinationCity: [`Amsterdam`, `Tacoma`, `Geneva`, `Miami`, `Saint Petersburg`],
};

export const SORT_ITEMS = [`Event`, `Time`, `Price`];

export const EVENT_OFFERS = [{
  title: `Order Uber`,
  price: 20,
}, {
  title: `Add luggage`,
  price: 50,
}, {
  title: `Switch to comfort`,
  price: 80,
}, {
  title: `Rent a car`,
  price: 200,
}, {
  title: `Add breakfast`,
  price: 50,
}, {
  title: `Book tickets`,
  price: 40,
}, {
  title: `Lunch in city`,
  price: 30,
}, {
  title: `Add meal`,
  price: 15,
}];

export const EVENT_OPTIONS = [{
  title: `Add luggage`,
  price: 30,
  className: `luggage`,
  isChecked: Math.random() > 0.5,
}, {
  title: `Switch to comfort class`,
  price: 100,
  className: `comfort`,
  isChecked: Math.random() > 0.5,
}, {
  title: `Add meal`,
  price: 15,
  className: `meal`,
  isChecked: Math.random() > 0.5,
}, {
  title: `Choose seats`,
  price: 5,
  className: `seats`,
  isChecked: Math.random() > 0.5,
}, {
  title: `Travel by train`,
  price: 40,
  className: `train`,
  isChecked: Math.random() > 0.5,
}];

export const TRIP_INFO = {
  cost: Math.floor(Math.random() * 2000),
  route: `Amsterdam — Miami — Geneva`,
  dateRange: `MAR 09 — 21`,
  tripDay: `1`,
  tripDate: `29 April`,
};
