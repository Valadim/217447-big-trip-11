export const createTripCostTemplate = () => {
  const cost = `1230`;
  return (
    `<p class="trip-info__cost">
       Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
     </p>`
  );
};
