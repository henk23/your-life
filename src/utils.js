import {stringify} from './dateUtils';
import {newTimeSpan} from './stores';
import {week} from './WeekDot.svelte';

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

export function makeStyleString(styleMap) {
  let style = '';

  for(let key in styleMap) {
    let unit = '';

    if(['border-width'].includes(key)) {
      unit = 'px';
    }

    style += styleMap[key] !== null ? `${key}:${styleMap[key]}${unit};` : '';
  }

  return style;
}

export function assembleStylesMap(week, newStylesMap = null) {
  const stylesMap = {
    'background-color': null,
    'border-color': null,
    'border-width': null,
  };

  for(let span of week.matchedTimeSpans) {
    for(let key in stylesMap) {
      if(span.style[key] !== null) {
        stylesMap[key] = span.style[key];
      }
    }
  }

  if(newStylesMap) {
    for(let key in newStylesMap) {
      if(newStylesMap[key] !== null) {
        stylesMap[key] = newStylesMap[key];
      }
    }
  }

  return stylesMap;
}
