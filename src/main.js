import App from './App.svelte';
import {load, save} from './storageService';

if(!load('dobString')) {
  save('dobString', '1970-01-01');
}

const app = new App({
  target: document.body,
});

export default app;
