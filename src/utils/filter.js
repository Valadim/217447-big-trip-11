import {FILTER_TYPE} from "../const.js";

export const getPointsByFilter = (points, filterType) => {
  switch (filterType) {
    case FILTER_TYPE.EVERYTHING:
      return points.sort((a, b) => a.startDate - b.startDate);
    case FILTER_TYPE.FUTURE:
      return points
      .filter((point) => point.endDate > new Date())
      .sort((a, b) => a.startDate - b.startDate);
    case FILTER_TYPE.PAST:
      return points
      .filter((point) => point.endDate < new Date())
      .sort((a, b) => a.startDate - b.startDate);
  }

  return points;
};
