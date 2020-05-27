import SortComponent from "../components/trip-sort";
// import EventEditComponent from "../components/trip-item-edit";
import DaysListComponent from "../components/trip-days-list";
// import DaysItemComponent from "../components/trip-day-item";
// import EventsListComponent from "../components/trip-events-list";
// import EventItemComponent from "../components/trip-events-item";
// import {render, remove, replace, RenderPosition} from "../utils/render.js";
import FilterComponent from "../components/trip-filters";
// import PointController from "./point-controller";

// import {render, RenderPosition} from "../utils/render.js";


// const getSortedEvents = (events, sortType, from, to) => {
//   let sortedEvents = [];
//   const showingEvents = events.slice();
//
//   switch (sortType) {
//     case SortType.DATE_UP:
//       sortedEvents = showingEvents.sort((a, b) => a.dueDate - b.dueDate);
//       break;
//     case SortType.DATE_DOWN:
//       sortedEvents = showingEvents.sort((a, b) => b.dueDate - a.dueDate);
//       break;
//     case SortType.DEFAULT:
//       sortedEvents = showingEvents;
//       break;
//   }
//
//   return sortedEvents.slice(from, to);
// };


export default class EventsBoardController {
  constructor(container) {
    this._container = container;
    this._sortComponent = new SortComponent();
    this._daysListComponent = new DaysListComponent();
    this._filterComponents = new FilterComponent();

    this._points = [];

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._onDataChange = this._onDataChange.bind(this);
  }

  render(events) {
    this._events = events;

    // WIP
    // const isAllPointsArchived = this._events.every((event) => event.isArchive);

    // renderEvents(taskListElement, tasks.slice(0, this._showingTasksCount));

    // const renderEventsList = (eventsSection, eventDays, onDataChange) => {
    //   render(eventsSection, this._sortComponent, RenderPosition.AFTERBEGIN);
    //   render(eventsSection, this._daysListComponent, RenderPosition.BEFOREEND);
    //
    //   const tripDaysList = document.querySelector(`.trip-days`);
    //
    //   const eventDaysKeys = Object.keys(eventDays);
    //
    //   eventDaysKeys.forEach((event, i) => {
    //     i++;
    //     render(tripDaysList, new DaysItemComponent(event, i), RenderPosition.BEFOREEND);
    //   });
    //
    //   const tripDaysItem = document.querySelectorAll(`.trip-days__item`);
    //
    //   for (let day of tripDaysItem) {
    //     render(day, new EventsListComponent(), RenderPosition.BEFOREEND);
    //   }
    //
    //   // const tripEventsList = document.querySelectorAll(`.trip-events__list`);
    //
    //   // WIP
    //   // const pointController = new PointController(eventsSection, onDataChange);
    //   // pointController.render(eventDays);
    //   //
    //   // eventDaysKeys.forEach((event, i) => {
    //   //   eventDays[event].forEach((it) => {
    //   //     renderEvent(tripEventsList[i], it);
    //   //   });
    //   // });
    //
    //   // const sortedEvents = getSortedEvents(events, this._filterComponents.getSortType(), 0, 20);
    //   // renderEvent(tripEventsList, sortedEvents);
    // };
    //
    // renderEventsList(this._container, events);
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._tasks.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));

    taskController.render(this._tasks[index]);
  }

  // _onSortTypeChange(sortType) {
  //   // const sortedPoints = getSortedPoints(this._events, sortType, 0, 20);
  //   // const eventListElement = this._eventComponent.getElement();
  //   // eventListElement.innerHTML = ``;
  //   // const newTasks = renderTasks(taskListElement, sortedTasks, this._onDataChange);
  //   // renderEvents(eventListElement, sortedPoints);
  // }
}
