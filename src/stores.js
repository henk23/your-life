import {writable, derived} from 'svelte/store';
import {load} from './storageService';
import {today} from './dateUtils';

export const appMode = writable('default');
export const showSettings = writable(false);
export const currentWeek = writable(null);
export const clickedWeek = writable(null);
export const dobString = writable(load('dateOfBirth') || today);
export const timeSpans = writable(load('timeSpans') || []);

export const categories = derived(timeSpans, $timeSpans => {
  const categories = [];

  for(let timeSpan of $timeSpans) {
    if(!categories.includes(timeSpan.category)) {
      categories.push(timeSpan.category);
    }
  }

  if(!categories.length) {
    categories.push('Default');
  }

  return [...new Set(categories)];
});

export const settings = writable(load('settings') || {
  showPast: true,
  blinkNow: true,
});

export const newTimeSpan = writable({
  startDate: null,
  endDate: null,
  name: '',
  category: '',
  style: {},
});
