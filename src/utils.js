import {stringify} from './dateUtils';

const today = stringify(new Date());

export function getRandomId() {
  return Math.floor(Math.random() * 16 ** 6).toString(16).padStart(6, '0');
}

export function isMarked(appMode, newTimeSpan, currentWeek, week) {

  // Mark only once the start date was clicked.
  if(appMode !== 'create-time-span' || !newTimeSpan.startDate) {
    return false;
  }

  let endDateCondition;

  // Mark all hovered until end date is clicked
  if(!newTimeSpan.endDate) {
    endDateCondition = currentWeek && week.startDate <= currentWeek.endDate;
  } else {
    endDateCondition = week.startDate <= (newTimeSpan.endDate === 'ongoing' ? today : newTimeSpan.endDate);
  }

  return endDateCondition && week.endDate >= newTimeSpan.startDate;
}

export function isDisabled(appMode, newTimeSpan, week) {
  if(appMode !== 'create-time-span' || !newTimeSpan.startDate || newTimeSpan.endDate) {
    return false;
  }

  return week.endDate < newTimeSpan.startDate;
}
