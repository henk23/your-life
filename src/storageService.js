export function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch(e) {
    alert('Error saving to localStorage: ' + e);
  }
}

export function load(key) {
  try {
    const encoded = localStorage.getItem(key);

    if(!encoded) {
      return null;
    }

    return JSON.parse(encoded);
  } catch(e) {
    alert('Error loading from localStorage: ' + e);
  }
}
