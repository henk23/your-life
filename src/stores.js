import {writable, derived} from 'svelte/store';
import {load} from './storageService';

export const appMode = writable('default');
export const currentWeek = writable(null);
export const clickedWeek = writable(null);
export const dobString = writable(load('dateOfBirth') || '1970-01-01');
export const timeSpans = writable(load('timeSpans') || []);

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

  if(!categories.length) {
    categories.push({
      name: 'Default',
      isVisible: true,
    });
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
