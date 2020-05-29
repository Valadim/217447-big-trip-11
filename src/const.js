const MenuItem = {
  TABLE: `table`,
  STATS: `stats`,
};

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`,
};

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

const SortType = {
  DEFAULT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`,
};

const ACTIVITY_TYPES = [
  `check-in`,
  `sightseeing`,
  `restaurant`,
];

const DestinationUnknown = `We know nothing about this place.
  Please select a destination from the dropdown list.`;

const MenuItems = [
  {
    name: `table`,
    selected: true,
  },
  {
    name: `stats`,
    selected: false,
  },
];

const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const TRANSFER_TYPES = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
];

const URL = {
  POINTS: `points`,
  DESTINATIONS: `destinations`,
  OFFERS: `offers`,
};

export {
  MenuItem,
  Mode,
  FilterType,
  SortType,
  ACTIVITY_TYPES,
  DestinationUnknown,
  MenuItems,
  STORE_NAME,
  TRANSFER_TYPES,
  URL,
};
