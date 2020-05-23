import SortComponent from "../components/trip-sort";
import EventEditComponent from "../components/trip-item-edit";
import DaysListComponent from "../components/trip-days-list";
import DaysItemComponent from "../components/trip-day-item";
import EventsListComponent from "../components/trip-events-list";
import EventItemComponent from "../components/trip-events-item";
// import {render, remove, replace, RenderPosition} from "../utils/render.js";
import {render, replace, RenderPosition} from "../utils/render.js";

const renderEvent = (eventListElement, event) => {

  const eventComponent = new EventItemComponent(event);
  const eventEditComponent = new EventEditComponent(event);

  const onEditButtonClick = () => {
    replace(eventEditComponent, eventComponent);
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      onEditFormSubmit(evt);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.setEditButtonClickHandler(() => {
    onEditButtonClick();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    onEditFormSubmit(evt);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  render(eventListElement, eventComponent, RenderPosition.BEFOREEND);
};


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
  }

  render(events) {
    const renderEventsList = (eventsSection, eventDays) => {
      render(eventsSection, this._sortComponent, RenderPosition.AFTERBEGIN);
      render(eventsSection, this._daysListComponent, RenderPosition.BEFOREEND);

      const tripDaysList = document.querySelector(`.trip-days`);

      const eventDaysKeys = Object.keys(eventDays);

      eventDaysKeys.forEach((event, i) => {
        i++;
        render(tripDaysList, new DaysItemComponent(event, i), RenderPosition.BEFOREEND);
      });

      const tripDaysItem = document.querySelectorAll(`.trip-days__item`);

      for (let day of tripDaysItem) {
        render(day, new EventsListComponent(), RenderPosition.BEFOREEND);
      }

      const tripEventsList = document.querySelectorAll(`.trip-events__list`);

      eventDaysKeys.forEach((event, i) => {
        eventDays[event].forEach((it) => {
          renderEvent(tripEventsList[i], it);
        });
      });
    };

    renderEventsList(this._container, events);
  }
}
