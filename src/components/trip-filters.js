import AbstractComponent from "./abstract-component";

const createFilterMarkup = (filterItem, isChecked) => {
  return (
    `<div class="trip-filters__filter">
       <input id="filter-${filterItem}"
       class="trip-filters__filter-input  visually-hidden"
       type="radio"
       name="trip-filter"
       value="${filterItem}"
       ${isChecked ? `checked` : ``}>
       <label class="trip-filters__filter-label" for="filter-${filterItem}">${filterItem}</label>
     </div>`
  );
};

const createFilterTemplate = (filters) => {
  const filterMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);
  return (
    `<div>
       <h2 class="visually-hidden">Filter events</h2>
       <form class="trip-filters" action="#" method="get">
         ${filterMarkup}
         <button class="visually-hidden" type="submit">Accept filter</button>
       </form>
     </div>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}
