import {DESTINATION_DESCRIPTION, DESTINATION_CITY, EVENT_INFO, EVENT_OFFERS, EVENT_OPTIONS} from "../const.js";
import {formatTime, formatDate} from "../utils";

const OFFERS_TITLE = [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`, `Travel by train`];

const OFFERS_TYPE = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
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

const EVENT_PHOTO_COUNT = 5;
const EVENT_OFFERS_COUNT = 5;

// const createEventPhoto = () => {
//   const rand = Math.floor(Math.random() * EVENT_PHOTO_COUNT);
//   const photos = [];
//   for (let i = 0; i <= rand; i++) {
//     photos.push(`<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo">`);
//   }
//   return photos;
// };

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
  }
;




export const generatePoint = () => {
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

console.log(`start`);
console.log(generatePoint().destination.pictures.src);
console.log(generatePoint());
console.log(generateOffers(EVENT_OFFERS_COUNT));

console.log(`start1`);
