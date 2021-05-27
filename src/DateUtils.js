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
