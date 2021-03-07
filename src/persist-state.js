export const persistState = (storageKey, state) => {
  window.localStorage.setItem(storageKey, JSON.stringify(state));
}

export const getIntialState = (storageKey, defaultValue) => {
  const savedState = window.localStorage.getItem(storageKey);
  try {
    if (!savedState) {
      return defaultValue;
    }
    return JSON.parse(savedState ?? {});
  } catch (e) {
    console.error('Error loading state: '+storageKey);
    return defaultValue;
  }
}