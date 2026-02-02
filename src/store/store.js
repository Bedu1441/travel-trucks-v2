import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './campersSlice';
import filtersReducer from './filtersSlice';
import favoritesReducer from './favoritesSlice';

const loadFavorites = () => {
  try {
    const raw = localStorage.getItem('favorites');
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
  preloadedState: {
    favorites: loadFavorites() ?? { ids: {} },
  },
});

store.subscribe(() => {
  try {
    localStorage.setItem('favorites', JSON.stringify(store.getState().favorites));
  } catch {
    // ignore write errors (private mode, quota, etc.)
  }
});
