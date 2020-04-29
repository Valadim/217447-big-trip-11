export const createTripDaysItemTemplate = (eventDay, evenDate) => {
  return (
    `<li class="trip-days__item  day">
       <div class="day__info">
         <span class="day__counter">${eventDay}</span>
         <time class="day__date" datetime="2019-03-18">${evenDate}</time>
       </div>
     </li>`
  );
};
