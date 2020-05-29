import EventItemComponent from '../components/trip-event-item.js';
import EventItemEditComponent from '../components/trip-item-edit.js';
import Point from "../models/point.js";
import {renderElement, replaceElement, remove, RenderPosition} from '../utils/render.js';
import {Mode} from '../const.js';
import moment from 'moment';

const SHAKE_ANIMATION_TIMEOUT = 600;

export const EmptyPoint = {
  type: `taxi`,
  city: ``,
  startDate: Date.now(),
  endDate: Date.now(),
  price: 0,
  offers: [],
  description: ``,
  photos: [],
  isFavorite: false,
  isNew: true
};

const parseFormData = (formData, destination, id) => {
  const cityElement = document.querySelector(`input[name="event-destination"]`).value;
  const checkedOffers = [
    ...document.querySelectorAll(`.event__offer-checkbox:checked + label[for^="event"]`)
  ];
  return new Point({
    "id": id,
    "type": formData.get(`event-type`),
    "date_from": moment(formData.get(`event-start-time`), `DD/MM/YY HH:mm`).valueOf(),
    "date_to": moment(formData.get(`event-end-time`), `DD/MM/YY HH:mm`).valueOf(),
    "base_price": parseInt(formData.get(`event-price`), 10),
    "offers": checkedOffers.map((offer) => ({
      "title": offer.querySelector(`.event__offer-title`).textContent,
      "price": parseInt(offer.querySelector(`.event__offer-price`).textContent, 10)
    })),
    "destination": {
      "description": destination[cityElement].description,
      "name": destination[cityElement].name,
      "pictures": destination[cityElement].pictures
    },
    "is_favorite": formData.get(`event-favorite`) === `on`
  });
};

export default class PointController {
  constructor(container, onDataChange, onViewChange, offers, destinations) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._offersSet = offers;
    this._destinationsSet = destinations;
    this._eventItemComponent = null;
    this._eventItemEditComponent = null;
    this._mode = Mode.DEFAULT;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._submitValue = null;
  }

  render(point, mode) {
    const oldEventItemComponent = this._eventItemComponent;
    const oldEventItemEditComponent = this._eventItemEditComponent;
    this._mode = mode;
    this._eventItemComponent = new EventItemComponent(point);
    this._eventItemEditComponent = new EventItemEditComponent(point, this._offersSet, this._destinationsSet);

    this._eventItemComponent.setClickHandler(() => {
      this._replaceWaypointToWaypointEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventItemEditComponent.setClickHandler(() => {
      this._replaceWaypointEditToWaypoint();
    });

    this._eventItemEditComponent.setSubmitClickHandler((evt)=> {
      evt.preventDefault();
      const formData = this._eventItemEditComponent.getData();
      this._submitValue = evt.target.value;
      let pointData = null;
      if (this._submitValue === `on`) {
        pointData = point;
        pointData.isFavorite = !pointData.isFavorite;
      } else {
        pointData = parseFormData(formData, this._destinationsSet, point.id);
        this._eventItemEditComponent.setData({
          saveButtonText: `Saving...`,
        });
        this._eventItemEditComponent.disableForm();
      }
      this._eventItemEditComponent.hideBorder();
      this._onDataChange(this, point, pointData);
    });

    this._eventItemEditComponent.setDeleteButtonClickHandler(() => {
      this._eventItemEditComponent.setData({
        deleteButtonText: `Deleting...`,
      });
      this._eventItemEditComponent.hideBorder();
      this._eventItemEditComponent.disableForm();
      this._onDataChange(this, point, null);
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventItemEditComponent && oldEventItemComponent) {
          replaceElement(this._eventItemComponent, oldEventItemComponent);
          replaceElement(this._eventItemEditComponent, oldEventItemEditComponent);
          this._replaceWaypointEditToWaypoint();
        } else {
          renderElement(
              this._container,
              this._eventItemComponent
          );
        }
        break;
      case Mode.EDIT:
        if (oldEventItemEditComponent) {
          replaceElement(this._eventItemEditComponent, oldEventItemEditComponent);
        }
        break;
      case Mode.ADDING:
        if (oldEventItemEditComponent && oldEventItemComponent) {
          remove(oldEventItemComponent);
          remove(oldEventItemEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        renderElement(
            this._container.getElement(),
            this._eventItemEditComponent,
            RenderPosition.AFTERBEGIN
        );
        break;
    }
  }

  shake() {
    this._shakeDuration = SHAKE_ANIMATION_TIMEOUT / 1000;
    this._eventItemEditComponent.getElement().style.animation = `shake ${this._shakeDuration}s`;
    this._eventItemComponent.getElement().style.animation = `shake ${this._shakeDuration}s`;

    setTimeout(() => {
      this._eventItemEditComponent.getElement().style.animation = ``;
      this._eventItemComponent.getElement().style.animation = ``;
      this._eventItemEditComponent.setData({saveButtonText: `Save`, deleteButtonText: `Delete`});
    }, SHAKE_ANIMATION_TIMEOUT);

    setTimeout(() => this._eventItemEditComponent.showBorder(), SHAKE_ANIMATION_TIMEOUT);
  }

  _replaceWaypointToWaypointEdit() {
    this._onViewChange();
    replaceElement(this._eventItemEditComponent, this._eventItemComponent);
    this._mode = Mode.EDIT;
  }

  _replaceWaypointEditToWaypoint() {
    this._eventItemEditComponent.reset();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    replaceElement(this._eventItemComponent, this._eventItemEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyPoint, null);
      }
      this._replaceWaypointEditToWaypoint();
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceWaypointEditToWaypoint();
    }
  }

  destroy() {
    remove(this._eventItemEditComponent);
    remove(this._eventItemComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
