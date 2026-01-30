import { createSlice } from '@reduxjs/toolkit';

const LS_KEY = 'traveltrucks_favorites';

function loadFavorites() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavorites(ids) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

const initialState = {
  ids: loadFavorites(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id);
      } else {
        state.ids.push(id);
      }
      saveFavorites(state.ids);
    },
    clearFavorites(state) {
      state.ids = [];
      saveFavorites(state.ids);
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;