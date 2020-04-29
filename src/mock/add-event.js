import {generateEvent} from "./event";

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};


export {generateEvents};
