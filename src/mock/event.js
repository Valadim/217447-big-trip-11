import {DESTINATION_DESCRIPTION, DESTINATION_CITY, OFFERS_TITLE, OFFERS_TYPE} from "../const.js";
import {formatTime, formatDate} from "../utils";

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => min + Math.floor(Math.random() * (max - min));

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);
  targetDate.setHours(getRandomIntegerNumber(0, 23), getRandomIntegerNumber(0, 59));

  return targetDate;
};

const EVENT_PHOTO_COUNT = 5;

const generateEventPhoto = (count) => {
  const rand = Math.floor(Math.random() * count);
  const eventPhotos = [];
  for (let i = 0; i < rand; i++) {
    eventPhotos.push({
      description: getRandomArrayItem(DESTINATION_DESCRIPTION),
      src: `http://picsum.photos/248/152?r=${Math.random()}`,
    });
  }
  return eventPhotos;
};

const EVENT_OFFERS_COUNT = 5;

const generateOffers = (count) => {
  const rand = Math.floor(Math.random() * count);
  const eventOffers = [];
  for (let i = 0; i < rand; i++) {
    eventOffers.push({
      title: getRandomArrayItem(OFFERS_TITLE),
      price: getRandomIntegerNumber(10, 200),
    });
  }
  return eventOffers;
};

const generateEvent = () => {
  return ({
    basePrice: getRandomIntegerNumber(100, 2000),
    dateFrom: getRandomDate().toISOString(),
    dateTo: getRandomDate().toISOString(),
    destination: {
      description: getRandomArrayItem(DESTINATION_DESCRIPTION),
      name: getRandomArrayItem(DESTINATION_CITY),
      pictures: generateEventPhoto(EVENT_PHOTO_COUNT),
    },
    id: getRandomIntegerNumber(0, 10),
    isFavorite: Math.random() > 0.5,
    offers: generateOffers(EVENT_OFFERS_COUNT),
    type: getRandomArrayItem(OFFERS_TYPE),
  });
};

export const generateEvents = (count) => new Array(count).fill(``).map(generateEvent);
