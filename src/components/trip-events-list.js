import AbstractComponent from "./abstract-component";

const createTripPointListTemplate = () => {
  return (
    `<ul class="trip-events__list">
     </ul>`
  );
};

export default class EventsList extends AbstractComponent {
  getTemplate() {
    return createTripPointListTemplate();
  }
}
