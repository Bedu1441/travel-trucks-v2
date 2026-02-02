import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ids: {}, // { "12": true }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const id = String(action.payload);
      if (state.ids[id]) delete state.ids[id];
      else state.ids[id] = true;
    },
    clearFavorites(state) {
      state.ids = {};
    },
    setFavorites(state, action) {
      // для відновлення з localStorage
      state.ids = action.payload?.ids ?? {};
    },
  },
});

export const { toggleFavorite, clearFavorites, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

// selectors
export const selectFavoriteIdsMap = (state) => state.favorites?.ids ?? {};
export const makeSelectIsFavorite = (id) => (state) =>
  !!(state.favorites?.ids ?? {})[String(id)];
