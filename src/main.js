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

import {generateEvents} from "./mock/add-event.js";
import {render, RenderPosition} from "./utils.js";
import {TRIP_INFO} from "./const";
import {TABS} from "./mock/tabs";
import {FILTER_ITEMS} from "./mock/filter";

const POINTS_COUNT = 20;

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
  const editForm = eventEditComponent.getElement().querySelector(`.event__save-btn`);
  editForm.addEventListener(`click`, onEditFormSubmit);

  // const editForm = eventEditComponent.getElement().querySelector(`form`);
  // editForm.addEventListener(`submit`, onEditFormSubmit);
};

const renderEventsList = (tripEventsSection, events) => {

  render(tripEventsSection, new SortComponent().getElement(), RenderPosition.AFTERBEGIN);

  render(tripEventsSection, new DaysListComponent().getElement(), RenderPosition.BEFOREEND);
  const tripDaysList = document.querySelector(`.trip-days`);
  render(tripDaysList, new DaysItemComponent(TRIP_INFO).getElement(), RenderPosition.BEFOREEND);

  const tripDaysItem = document.querySelector(`.trip-days__item`);
  render(tripDaysItem, new EventsListComponent().getElement(), RenderPosition.BEFOREEND);

  const tripEventsList = document.querySelector(`.trip-events__list`);

  // events.slice(0, POINTS_COUNT)
  //   .forEach((event) => render(tripEventsList, new EventItemComponent(event).getElement(), RenderPosition.BEFOREEND));

  events.slice(0, POINTS_COUNT)
    .forEach((event) => renderEvent(tripEventsList, event));
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

const events = generateEvents(POINTS_COUNT);

renderEventsList(tripEvenSection, events);
