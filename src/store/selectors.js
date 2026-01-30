import { createSelector } from '@reduxjs/toolkit';

export const selectCampersItems = (state) => state.campers.items;
export const selectFilters = (state) => state.filters;

export const selectFilteredCampers = createSelector(
  [selectCampersItems, selectFilters],
  (items, filters) => {
    const location = (filters.location || '').trim().toLowerCase();
    const vehicleType = filters.vehicleType || '';
    const equipment = Array.isArray(filters.equipment) ? filters.equipment : [];

    return (Array.isArray(items) ? items : []).filter((camper) => {
      // location (в API у тебе "location": "Ukraine, Kyiv" etc)
      if (location) {
        const camperLoc = (camper.location || '').toLowerCase();
        if (!camperLoc.includes(location)) return false;
      }

      // vehicle type (в API це поле "form")
      if (vehicleType) {
        if ((camper.form || '') !== vehicleType) return false;
      }

      // equipment (AC, bathroom, kitchen, TV, radio, refrigerator, microwave, gas, water...)
      for (const key of equipment) {
        if (!camper[key]) return false; // якщо AC=true треба щоб camper.AC === true
      }

      return true;
    });
  }
);