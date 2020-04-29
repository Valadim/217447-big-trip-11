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
import {generateFilters} from "./mock/filter.js";
import {generateEvents} from "./mock/add-event.js";
import {generateMenuItems} from "./mock/menu";
import {TRIP_INFO} from "./const";


const tripMainInfo = TRIP_INFO;
const POINTS_COUNT = 20;
const mainMenu = generateMenuItems();

const render = (container, template, place = `beforeEnd`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector(`.trip-main`);

render(tripMain, createTripInfoTemplate(), `afterBegin`);

const tripInfo = tripMain.querySelector(`.trip-info`);

render(tripInfo, createTripInfoMainTemplate(tripMainInfo.route, tripMainInfo.dateRange));
render(tripInfo, createTripCostTemplate(tripMainInfo.cost));

const tripControls = tripMain.querySelector(`.trip-controls`);

render(tripControls, createMenuTemplate(mainMenu));

const filters = generateFilters();
const events = generateEvents(POINTS_COUNT);
const showingPointsCount = POINTS_COUNT;

render(tripControls, createFilterTemplate(filters));

const tripEvenSection = document.querySelector(`.trip-events`);

render(tripEvenSection, createSortTemplate());

render(tripEvenSection, createAddEventTemplate(events[0]));

render(tripEvenSection, createTripDaysListTemplate());

const tripDaysList = document.querySelector(`.trip-days`);
render(tripDaysList, createTripDaysItemTemplate(tripMainInfo.tripDay, tripMainInfo.tripDate));

const tripDaysItem = document.querySelector(`.trip-days__item`);
render(tripDaysItem, createTripPointListTemplate());

const tripPointList = document.querySelector(`.trip-events__list`);

events.slice(1, showingPointsCount)
  .forEach((event) => render(tripPointList, createTripPointItemTemplate(event)));

