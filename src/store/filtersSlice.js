import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: '',
  vehicleType: '', // form
  equipment: [],   // ['AC','kitchen',...]
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    setVehicleType(state, action) {
      state.vehicleType = action.payload; // один
    },
    toggleEquipment(state, action) {
      const key = action.payload;
      if (state.equipment.includes(key)) {
        state.equipment = state.equipment.filter((x) => x !== key);
      } else {
        state.equipment.push(key);
      }
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setLocation, setVehicleType, toggleEquipment, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;