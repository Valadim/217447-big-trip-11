const DESTINATION_DESCRIPTION = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
];
const transferType = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const activityType = [`Check-in`, `Sightseeing`, `Restaurant`];
const destinationCity = [`Amsterdam`, `Tacoma`, `Geneva`, `Miami`, `Saint Petersburg`];

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

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const castTimeFormat = (value) => {
  return value < 10 ? `${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

function formatDate(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear() % 100;
  if (day < 10) {
    day = `0` + day;
  }
  if (month < 10) {
    month = `0` + month;
  }
  if (year < 10) {
    year = `0` + year;
  }
  return day + `/` + month + `/` + year;
}

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
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    transfer: transferType,
    activity: activityType,
    destination: destinationCity,
    description: createEventDescription(DESTINATION_DESCRIPTION),
    date: formatDate(getRandomDate()),
    time: formatTime(getRandomDate()),
    startTime: `10:30`,
    endTime: `11:24`,
    photo: createEventPhoto(),
    eventOffers: generateEventOffers(),
    eventOptions: generateEventOptions(),
    dueDate,
  };
};
