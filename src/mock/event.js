
const DESTINATION_DESCRIPTION = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
];

const generateEventOffers = () => {
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

const generateEventOptions = () => {
  return [{
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
};

const createEventPhoto = () => {
  const rand = Math.floor(Math.random() * 5);
  const photos = [];
  for (let i = 0; i <= rand; i++) {
    photos.push(`<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo">`);
  }
  return photos;
};

const createEventDescription = (array) => {
  return (array.slice(Math.floor(Math.random() * array.length)));
};

export const generateEvent = () => {
  return {
    transfer: [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`],
    activity: [`Check-in`, `Sightseeing`, `Restaurant`],
    destination: [`Amsterdam`, `Tacoma`, `Geneva`, `Miami`, `Saint Petersburg`],
    description: createEventDescription(DESTINATION_DESCRIPTION),
    date: `18/03/19`,
    time: `00:00`,
    photo: createEventPhoto(),
    eventOffers: generateEventOffers(),
    eventOptions: generateEventOptions(),
  };
};
