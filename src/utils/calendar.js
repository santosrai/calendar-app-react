const {
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  startOfDay,
  addDays
} = require("date-fns");

// generator function that return week
export const getWeek = (start = new Date()) => {
  let date = startOfWeek(startOfDay(start));
  return function () {
    const week = [...Array(7)].map((_, i) => addDays(date, i));
    date = addDays(week[6], 1);
    return week;
  };
};

// generator function that return month
export const getMonth = (start = new Date()) => {
  let month = [];
  let date = start;

  function lastDayOfRange(range) {
    return range[range.length - 1][6];
  }

  return function () {
    const weekGen = getWeek(startOfMonth(date));
    const endDate = startOfDay(endOfWeek(endOfMonth(date)));
    month.push(weekGen());

    while (lastDayOfRange(month) < endDate) {
      month.push(weekGen());
    }

    const range = month;
    month = [];
    //addDays donot change original date
    // instead create new date object
    date = addDays(lastDayOfRange(range), 1);

    return range;
  };
};
