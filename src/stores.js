import {writable, derived} from 'svelte/store';
import {getRandomId} from './utils';

export const appMode = writable('default');

export const currentWeek = writable(null);

export const clickedWeek = writable(null);

export const timeSpans = writable([]);

export const categories = derived(timeSpans, $timeSpans => {
  const categories = [];

  for(let timeSpan of $timeSpans) {
    if(!categories.includes(timeSpan.category)) {
      categories.push({
        name: timeSpan.category,
        isVisible: true,
      });
    }
  }

  return categories;
});

export const showStyles = writable({
  past: true,
  now: true,
});

export const newTimeSpan = writable({
  startDate: null,
  endDate: null,
  name: '',
  category: '',
  style: {},
});
