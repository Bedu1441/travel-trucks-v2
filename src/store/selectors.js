import { createSelector } from '@reduxjs/toolkit';

export const selectCampersItems = (state) => state.campers?.items ?? [];
export const selectFilters = (state) => state.filters ?? {};
export const selectFavoriteIdsMap = (state) => state.favorites?.ids ?? {};

const normalizeText = (v) => String(v ?? '').trim().toLowerCase();

export const selectFilteredCampers = createSelector(
  [selectCampersItems, selectFilters],
  (itemsRaw, filters) => {
    const items = Array.isArray(itemsRaw) ? itemsRaw : [];

    const location = normalizeText(filters.location);
    const vehicleType = String(filters.vehicleType ?? ''); // UI value
    const equipment = Array.isArray(filters.equipment) ? filters.equipment : [];

    return items.filter((camper) => {
      if (!camper) return false;

      // 1) location: підрядок, case-insensitive
      if (location) {
        const camperLoc = normalizeText(camper.location);
        if (!camperLoc.includes(location)) return false;
      }

      // 2) vehicle type: в API поле "form"
      if (vehicleType) {
        if (String(camper.form ?? '') !== vehicleType) return false;
      }

      // 3) equipment: AND-логіка (всі вибрані ключі мають бути truthy)
      for (const key of equipment) {
        if (!camper?.[key]) return false;
      }

      return true;
    });
  }
);

// Для /favorites (показує тільки ті, що вже завантажені в items)
export const selectFavoriteCampers = createSelector(
  [selectCampersItems, selectFavoriteIdsMap],
  (itemsRaw, favMap) => {
    const items = Array.isArray(itemsRaw) ? itemsRaw : [];
    return items.filter((c) => c?.id != null && !!favMap[String(c.id)]);
  }
);
