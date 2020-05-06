import {DESTINATION_DESCRIPTION, EVENT_INFO, EVENT_OFFERS, EVENT_OPTIONS} from "../const.js";
import {formatTime, formatDate} from "../utils";

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

const createEventPhoto = () => {
  const rand = Math.floor(Math.random() * 5);
  const photos = [];
  for (let i = 0; i <= rand; i++) {
    photos.push(`<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo">`);
  }
  return photos;
};

const createEventDescription = (array) => {
  return (array.slice(getRandomIntegerNumber(0, array.length)));
};

export const generateEvent = () => {
  return {
    transfer: EVENT_INFO.transferType,
    activity: EVENT_INFO.activityType,
    destination: EVENT_INFO.destinationCity,
    description: createEventDescription(DESTINATION_DESCRIPTION),
    date: formatDate(getRandomDate()),
    time: formatTime(getRandomDate()),
    startTime: formatTime(getRandomDate()),
    endTime: formatTime(getRandomDate()),
    photo: createEventPhoto(),
    eventOffers: EVENT_OFFERS,
    eventOptions: EVENT_OPTIONS,
    price: getRandomIntegerNumber(10, 100),
    eventDuration: getRandomIntegerNumber(10, 59) + `M`,
    transferType: EVENT_INFO.transferType[getRandomIntegerNumber(0, EVENT_INFO.transferType.length)],
    destinationCity: EVENT_INFO.destinationCity[getRandomIntegerNumber(0, EVENT_INFO.destinationCity.length)],
    offersNumber: getRandomIntegerNumber(0, EVENT_OFFERS.length),
  };
};
