import AbstractComponent from './abstract-component.js';

export default class TripCost extends AbstractComponent {

  getTemplate() {
    return (
      `<p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value"></span>
      </p>`
    );
  }
}
