import App from './App.svelte';

if(!localStorage.getItem('dobString')) {
  localStorage.setItem('dobString', '1970-01-01');
}

const app = new App({
  target: document.body,
  props: {
    name: 'world'
  }
});

export default app;
