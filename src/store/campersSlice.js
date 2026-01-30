import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { campersApi } from '../api/campersApi';

export const fetchCampers = createAsyncThunk(
  'campers/fetchCampers',
  async ({ mode = 'append' } = {}, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { campers } = state;

      const page = mode === 'replace' ? 1 : campers.page;
      const limit = campers.limit;

      // ✅ ВАЖЛИВО: MockAPI тут не приймає form/AC/bathroom/... -> дає 404
      const params = { page, limit };

      const { data } = await campersApi.get('/campers', { params });

      return { data, mode, limit };
    } catch (err) {
      return rejectWithValue(err?.message ?? 'Request failed');
    }
  }
);

const initialState = {
  items: [],       // ✅ ЗАВЖДИ масив
  page: 1,
  limit: 4,
  hasMore: true,
  isLoading: false,
  error: null,
};

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    resetCampers(state) {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;

        const { data, mode, limit } = action.payload;

        // ✅ НОРМАЛІЗАЦІЯ: гарантуємо масив
        const list = Array.isArray(data) ? data : data?.items ?? [];

        if (mode === 'replace') {
          state.items = list;
          state.page = 2;
        } else {
          state.items = [...state.items, ...list];
          state.page += 1;
        }

        state.hasMore = list.length === limit;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error?.message || 'Request failed';
      })
  },
});

export const { resetCampers } = campersSlice.actions;
export default campersSlice.reducer;