export function clone(date) {
  return new Date(date.getTime());
}

export function stringify(date) {
  return date.toISOString().substr(0, 10);
}

export function add(date, amount, unit) {
  let functionName;

  switch(unit) {
    case 'days':
      functionName = 'Date';
      break;
    case 'years':
      functionName = 'FullYear';
      break;
    default:
      throw new Error('Only days and years supported');
  }

  const newDate = clone(date);
  newDate['set' + functionName](newDate['get' + functionName]() + amount);
  return newDate;
}

export function generateYears(dateOfBirth) {
  let yearIterator = clone(dateOfBirth);
  const allYears = [];

  for(let y = 0; y < 100; y++) {
    let startOfYear = yearIterator;
    let endOfYear = add(add(startOfYear, 1, 'years'), -1, 'days');

    let weekIterator = clone(startOfYear);
    const allWeeks = [];

    for(let w = 1; w <= 52; w++) {
      let startOfWeek = weekIterator;

      weekIterator = add(weekIterator, 6, 'days');
      let endOfWeek = weekIterator;

      while(w === 52 && stringify(endOfWeek) < stringify(endOfYear)) {
        weekIterator = add(weekIterator, 1, 'days');
        endOfWeek = weekIterator;
      }

      allWeeks.push({
        weekNumber: w,
        startDate: stringify(startOfWeek),
        endDate: stringify(endOfWeek),
      });

      weekIterator = add(weekIterator, 1, 'days');
    }

    allYears.push({
      year: yearIterator.getFullYear(),
      age: y,
      startDate: stringify(startOfYear),
      endDate: stringify(endOfYear),
      weeks: allWeeks,
    });

    yearIterator = add(yearIterator, 1, 'years');
  }

  return allYears;
}
