import EventsBoardController from "./controllers/events-bord";
import TripInfoComponent from "./components/trip-info";
import TripInfoMainComponent from "./components/trip-main";
import TripCostComponent from "./components/trip-cost";
import TripTabsComponent from "./components/trip-tabs";
import FilterComponent from "./components/trip-filters";

import {TABS} from "./mock/tabs";
import {TRIP_INFO} from "./const";
import {render, RenderPosition} from "./utils/render.js";
import {generateEvents} from "./mock/event.js";

const POINTS_COUNT = 20;
const events = generateEvents(POINTS_COUNT).sort((a, b) => {
  if (a.dateFrom < b.dateFrom) {
    return -1;
  } else {
    if (a.dateFrom > b.dateFrom) {
      return 1;
    } else {
      return 0;
    }
  }
});

const eventDays = {};

events.forEach((event) => {
  const eventDate = event.dateFrom.slice(0, 10);

  if (!eventDays[eventDate]) {
    eventDays[eventDate] = [];
  }
  eventDays[eventDate].push(event);
});

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new TripInfoComponent(), RenderPosition.AFTERBEGIN);

const tripInfo = tripMain.querySelector(`.trip-info`);
render(tripInfo, new TripInfoMainComponent(TRIP_INFO), RenderPosition.BEFOREEND);

render(tripInfo, new TripCostComponent(TRIP_INFO.cost), RenderPosition.BEFOREEND);

const tripControls = tripMain.querySelector(`.trip-controls`);
render(tripControls, new TripTabsComponent(TABS), RenderPosition.AFTERBEGIN);

render(tripControls, new FilterComponent(), RenderPosition.BEFOREEND);

const tripEvenSection = document.querySelector(`.trip-events`);

const eventsBoardController = new EventsBoardController(tripEvenSection);
eventsBoardController.render(eventDays);
