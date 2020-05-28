import EventItemComponent from '../components/trip-event-item.js';
import EventItemEditComponent from '../components/Trip-item-edit.js';
import Point from '../models/point.js';
import {renderElement, replaceElement, remove, RenderPosition} from '../utils/render.js';
import {POINT_MODE} from '../const.js';
import moment from 'moment';
import {encode} from 'he';

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
  const city = document.querySelector(`input[name="event-destination"]`).value;
  const checkedOffers = [
    ...document.querySelectorAll(`.event__offer-checkbox:checked + label[for^="event"]`)
  ];

  return new Point({
    "id": id,
    "type": formData.get(`event-type`),
    "date_from": moment(formData.get(`event-start-time`), `DD/MM/YY HH:mm`).valueOf(),
    "date_to": moment(formData.get(`event-end-time`), `DD/MM/YY HH:mm`).valueOf(),
    "base_price": parseInt(encode(formData.get(`event-price`)), 10),
    "offers": checkedOffers.map((offer) => ({
      "title": offer.querySelector(`.event__offer-title`).textContent,
      "price": Number(offer.querySelector(`.event__offer-price`).textContent)
    })),
    "destination": {
      "description": destination[city].description,
      "name": destination[city].name,
      "pictures": destination[city].pictures
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
    this._eventEditComponent = null;
    this._mode = POINT_MODE.DEFAULT;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._submitValue = null;
  }

  render(point, mode) {
    const oldEventItemComponent = this._eventItemComponent;
    const oldEvenItemEditComponent = this._eventEditComponent;
    this._mode = mode;

    this._eventItemComponent = new EventItemComponent(point);
    this._eventEditComponent = new EventItemEditComponent(point, this._offersSet, this._destinationsSet);

    this._eventItemComponent.setClickHandler(() => {
      this._replaceWaypointToWaypointEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setClickHandler(() => {
      this._replaceWaypointEditToWaypoint();
    });

    this._eventEditComponent.setSubmitClickHandler((evt)=> {
      evt.preventDefault();
      const formData = this._eventEditComponent.getData();
      this._submitValue = evt.target.value;
      let pointData = null;
      if (this._submitValue === `on`) {
        pointData = point;
        pointData.isFavorite = !pointData.isFavorite;
      } else {
        pointData = parseFormData(formData, this._destinationsSet, point.id);
        this._eventEditComponent.setData({
          saveButtonText: `Saving...`,
        });
        this._eventEditComponent.disableForm();
      }
      this._eventEditComponent.hideBorder();
      this._onDataChange(this, point, pointData);
    });

    this._eventEditComponent.setDeleteButtonClickHandler(() => {
      this._eventEditComponent.setData({
        deleteButtonText: `Deleting...`,
      });
      this._eventEditComponent.hideBorder();
      this._eventEditComponent.disableForm();
      this._onDataChange(this, point, null);
    });

    switch (mode) {
      case POINT_MODE.DEFAULT:
        if (oldEvenItemEditComponent && oldEventItemComponent) {
          replaceElement(this._eventItemComponent, oldEventItemComponent);
          replaceElement(this._eventEditComponent, oldEvenItemEditComponent);
          this._replaceWaypointEditToWaypoint();
        } else {
          renderElement(
              this._container,
              this._eventItemComponent
          );
        }
        break;
      case POINT_MODE.EDIT:
        if (oldEvenItemEditComponent) {
          replaceElement(this._eventEditComponent, oldEvenItemEditComponent);
        }
        break;
      case POINT_MODE.ADDING:
        if (oldEvenItemEditComponent && oldEventItemComponent) {
          remove(oldEventItemComponent);
          remove(oldEvenItemEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        renderElement(
            this._container.getElement(),
            this._eventEditComponent,
            RenderPosition.AFTERBEGIN
        );
        break;
    }
  }

  shake() {
    this._eventEditComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._eventItemComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this._eventEditComponent.getElement().style.animation = ``;
      this._eventItemComponent.getElement().style.animation = ``;

      this._eventEditComponent.setData({
        saveButtonText: `Save`,
        deleteButtonText: `Delete`,
      });
    }, SHAKE_ANIMATION_TIMEOUT);

    setTimeout(() => this._eventEditComponent.showBorder(), SHAKE_ANIMATION_TIMEOUT);
  }

  _replaceWaypointToWaypointEdit() {
    this._onViewChange();
    replaceElement(this._eventEditComponent, this._eventItemComponent);
    this._mode = POINT_MODE.EDIT;
  }

  _replaceWaypointEditToWaypoint() {
    this._eventEditComponent.reset();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    replaceElement(this._eventItemComponent, this._eventEditComponent);
    this._mode = POINT_MODE.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      if (this._mode === POINT_MODE.ADDING) {
        this._onDataChange(this, EmptyPoint, null);
      }
      this._replaceWaypointEditToWaypoint();
    }
  }

  setDefaultView() {
    if (this._mode !== POINT_MODE.DEFAULT) {
      this._replaceWaypointEditToWaypoint();
    }
  }

  destroy() {
    remove(this._eventEditComponent);
    remove(this._eventItemComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
