import {writable, derived} from 'svelte/store';
import {getRandomId} from './utils';

export const appMode = writable('default');

export const currentWeek = writable(null);

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
  start: null,
  end: null,
  name: '',
  category: '',
});

function createEventBus() {
  const {subscribe, set} = writable({
    name: null,
    details: null,
  });

  return {
    subscribe,
    dispatch: (name, details) => {
      set({name, details});
    },
  };
}

export const eventBus = createEventBus();
