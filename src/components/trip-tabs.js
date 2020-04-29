const createMenuMarkup = (menuItems, isChecked) => {
  const {name} = menuItems;
  return (
    `<a class="trip-tabs__btn ${isChecked ? `trip-tabs__btn--active` : ``}" href="#">${name}</a>`
  );
};

export const createMenuTemplate = (name) => {
  const menuMarkup = name.map((it, i) => createMenuMarkup(it, i === 0)).join(`\n`);
  return (
    `<h2 class="visually-hidden">Switch trip view</h2>
     <nav class="trip-controls__trip-tabs  trip-tabs">
       ${menuMarkup}
     </nav>`
  );
};
