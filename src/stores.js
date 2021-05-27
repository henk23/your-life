import {writable, derived} from 'svelte/store';

export const currentWeek = writable(null);

export const timeSpans = writable([]);

export const categories = derived(timeSpans, $timeSpans => {
  const categories = [];

  for(let timeSpan of $timeSpans) {
    if(!categories.includes(timeSpan.category)) {
      categories.push(timeSpan.category);
    }
  }

  return categories;
});
