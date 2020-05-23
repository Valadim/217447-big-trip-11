import AbstractComponent from "./abstract-component";

const createTabsMarkup = (tab, isChecked) => {
  return (
    `<a class="trip-tabs__btn ${isChecked ? `trip-tabs__btn--active` : ``}" href="#">${tab}</a>`
  );
};

const createTabsTemplate = (tabsItem) => {
  const tabsMarkup = tabsItem.map((it, i) => createTabsMarkup(it, i === 0)).join(`\n`);
  return (
    `<div>
       <h2 class="visually-hidden">Switch trip view</h2>
       <nav class="trip-controls__trip-tabs trip-tabs">
       ${tabsMarkup}
       </nav>
     </div>`
  );
};

export default class TripTabs extends AbstractComponent {
  constructor(tabs) {
    super();

    this._tabs = tabs;
  }

  getTemplate() {
    return createTabsTemplate(this._tabs);
  }
}
