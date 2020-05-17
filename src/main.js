import TripInfoComponent from "./components/trip-info";
import TripInfoMainComponent from "./components/trip-main";
import TripCostComponent from "./components/trip-cost";
import TripTabsComponent from "./components/trip-tabs";
import FilterComponent from "./components/trip-filters";
import SortComponent from "./components/trip-sort";
import EventEditComponent from "./components/trip-item-edit";
import DaysListComponent from "./components/trip-days-list";
import DaysItemComponent from "./components/trip-day-item";
import EventsListComponent from "./components/trip-events-list";
import EventItemComponent from "./components/trip-events-item";

import {generateEvents} from "./mock/event.js";
import {render, RenderPosition} from "./utils.js";
import {TRIP_INFO} from "./const";
import {TABS} from "./mock/tabs";
import {FILTER_ITEMS} from "./mock/filter";

const POINTS_COUNT = 20;

const events = generateEvents(POINTS_COUNT).sort((a, b) => (a.dateFrom < b.dateFrom) ? -1 : ((a.dateFrom > b.dateFrom) ? 1 : 0));

const eventDays = {};

events.forEach((event) => {
  const eventDate = event.dateFrom.slice(0, 10);

  if (!eventDays[eventDate]) {
    eventDays[eventDate] = [];
  }
  eventDays[eventDate].push(event);
});

const renderEvent = (eventListElement, event) => {
  const onEditButtonClick = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const eventComponent = new EventItemComponent(event);
  const editButton = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const eventEditComponent = new EventEditComponent(event);

  const editForm = eventEditComponent.getElement();
  editForm.addEventListener(`submit`, onEditFormSubmit);

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};


const renderEventsList = (eventsSection, eventDays) => {
  render(eventsSection, new SortComponent().getElement(), RenderPosition.AFTERBEGIN);
  render(eventsSection, new DaysListComponent().getElement(), RenderPosition.BEFOREEND);

  const tripDaysList = document.querySelector(`.trip-days`);

  Object.keys(eventDays).forEach((event, i) => {
    i++;
    render(tripDaysList, new DaysItemComponent(event, i).getElement(), RenderPosition.BEFOREEND);
  });

  const tripDaysItem = document.querySelectorAll(`.trip-days__item`);

  for (let day of tripDaysItem) {
    render(day, new EventsListComponent().getElement(), RenderPosition.BEFOREEND);
  }

  const tripEventsList = document.querySelectorAll(`.trip-events__list`);

  Object.keys(eventDays).forEach((event, i) => {
    eventDays[event].forEach((it) => {
      renderEvent(tripEventsList[i], it);
    });
  });
};

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new TripInfoComponent().getElement(), RenderPosition.AFTERBEGIN);

const tripInfo = tripMain.querySelector(`.trip-info`);
render(tripInfo, new TripInfoMainComponent(TRIP_INFO).getElement(), RenderPosition.BEFOREEND);

render(tripInfo, new TripCostComponent(TRIP_INFO.cost).getElement(), RenderPosition.BEFOREEND);

const tripControls = tripMain.querySelector(`.trip-controls`);
render(tripControls, new TripTabsComponent(TABS).getElement(), RenderPosition.AFTERBEGIN);

render(tripControls, new FilterComponent(FILTER_ITEMS).getElement(), RenderPosition.BEFOREEND);

const tripEvenSection = document.querySelector(`.trip-events`);

renderEventsList(tripEvenSection, eventDays);

