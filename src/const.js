export const TRANSFER_TYPE = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
export const ACTIVITY_TYPE = [`Check-in`, `Sightseeing`, `Restaurant`];
export const DESTINATION_CITY = [`Amsterdam`, `Tacoma`, `Geneva`, `Miami`, `Saint Petersburg`];
export const DESTINATION_DESCRIPTION = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
];

// export const EVENT_OFFERS = {
//   "Order Uber": 20,
//   "Add luggage": 50,
//   "Switch to comfort": 80,
//   "Rent a car": 200,
//   "Add breakfast": 50,
//   "Book tickets": 40,
//   "Lunch in city": 30,
// };

export const DESTINATION_PHOTO = `http://picsum.photos/248/152?r=${Math.random()}`;

export const generateEventOffers = () => {
  return [{
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
};
