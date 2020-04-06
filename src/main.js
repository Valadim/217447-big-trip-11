import {createTripInfoTemplate} from "./components/trip-info.js";
import {createTripCostTemplate} from "./components/trip-cost.js";
import {createTripInfoMainTemplate} from "./components/trip-main.js";
import {createMenuTemplate} from "./components/trip-tabs.js";
import {createFilterTemplate} from "./components/trip-filters.js";
import {createSortTemplate} from "./components/trip-sort.js";
import {createAddEventTemplate} from "./components/trip-item-edit.js";
import {createTripDaysListTemplate} from "./components/trip-days-list.js";
import {createTripDaysItemTemplate} from "./components/trip-day-item.js";
import {createTripPointListTemplate} from "./components/trip-events-list.js";
import {createTripPointItemTemplate} from "./components/trip-events-item.js";

const TRIP_POINT = 3;

const render = (container, template, place = `beforeEnd`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector(`.trip-main`);

render(tripMain, createTripInfoTemplate(), `afterBegin`);

const tripInfo = tripMain.querySelector(`.trip-info`);

render(tripInfo, createTripInfoMainTemplate());
render(tripInfo, createTripCostTemplate());

const tripControls = tripMain.querySelector(`.trip-controls`);

render(tripControls, createMenuTemplate());
render(tripControls, createFilterTemplate());

const tripEvenSection = document.querySelector(`.trip-events`);

render(tripEvenSection, createSortTemplate());

render(tripEvenSection, createAddEventTemplate());

render(tripEvenSection, createTripDaysListTemplate());

const tripDaysList = document.querySelector(`.trip-days`);
render(tripDaysList, createTripDaysItemTemplate());

const tripDaysItem = document.querySelector(`.trip-days__item`);
render(tripDaysItem, createTripPointListTemplate());

const tripPointList = document.querySelector(`.trip-events__list`);

for (let i = 0; i < TRIP_POINT; i++) {
  render(tripPointList, createTripPointItemTemplate());
}
