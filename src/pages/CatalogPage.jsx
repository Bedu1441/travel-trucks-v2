import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import css from './CatalogPage.module.css';
import CamperCard from '../components/CamperCard/CamperCard';

import { fetchCampers, resetCampers } from '../store/campersSlice';
import { setLocation, setVehicleType, toggleEquipment } from '../store/filtersSlice';

import { selectFilteredCampers } from '../store/selectors';

export default function CatalogPage() {
  const dispatch = useDispatch();

  const items = useSelector(selectFilteredCampers);
  const hasMore = useSelector((state) => !!state.campers?.hasMore);
  const isLoading = useSelector((state) => !!state.campers?.isLoading);
  const error = useSelector((state) => state.campers?.error);

  const location = useSelector((state) => state.filters?.location ?? '');
  const vehicleType = useSelector((state) => state.filters?.vehicleType ?? '');
  const equipment = useSelector((state) =>
    Array.isArray(state.filters?.equipment) ? state.filters.equipment : []
  );

  useEffect(() => {
    dispatch(fetchCampers({ mode: 'replace' }));
  }, [dispatch]);

  const onSearch = () => {
    if (isLoading) return;
    dispatch(resetCampers());
    dispatch(fetchCampers({ mode: 'replace' }));
  };

  const isEqActive = (key) => equipment.includes(key);

  const showNoResults = !isLoading && !error && Array.isArray(items) && items.length === 0;

  return (
    <section className={css.page}>
      <aside className={css.sidebar}>
        {/* LOCATION */}
        <div className={css.section}>
          <p className={css.sectionLabel}>Location</p>
          <div className={css.locationBox}>
            <svg className={css.locationSvg} viewBox="0 0 24 24" fill="none">
              <path
                d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.8" />
            </svg>

            <input
              className={css.locationInput}
              type="text"
              placeholder="City"
              value={location}
              onChange={(e) => dispatch(setLocation(e.target.value))}
            />
          </div>
        </div>

        {/* FILTERS */}
        <div className={css.section}>
          <p className={css.sectionLabel}>Filters</p>

          <h3 className={css.sectionTitle}>Vehicle equipment</h3>
          <div className={css.chipsGrid}>
            <button
              className={`${css.chip} ${isEqActive('AC') ? css.chipActive : ''}`}
              type="button"
              onClick={() => dispatch(toggleEquipment('AC'))}
              disabled={isLoading}
            >
              <span className={css.chipIcon}>*</span>
              AC
            </button>

            <button
              className={`${css.chip} ${isEqActive('transmission') ? css.chipActive : ''}`}
              type="button"
              onClick={() => dispatch(toggleEquipment('transmission'))}
              disabled={isLoading}
            >
              <span className={css.chipIcon}>⚙</span>
              Automatic
            </button>

            <button
              className={`${css.chip} ${isEqActive('kitchen') ? css.chipActive : ''}`}
              type="button"
              onClick={() => dispatch(toggleEquipment('kitchen'))}
              disabled={isLoading}
            >
              <span className={css.chipIcon}>☕</span>
              Kitchen
            </button>

            <button
              className={`${css.chip} ${isEqActive('TV') ? css.chipActive : ''}`}
              type="button"
              onClick={() => dispatch(toggleEquipment('TV'))}
              disabled={isLoading}
            >
              <span className={css.chipIcon}>▢</span>
              TV
            </button>

            <button
              className={`${css.chip} ${isEqActive('bathroom') ? css.chipActive : ''}`}
              type="button"
              onClick={() => dispatch(toggleEquipment('bathroom'))}
              disabled={isLoading}
            >
              <span className={css.chipIcon}>⌁</span>
              Bathroom
            </button>
          </div>

          <h3 className={css.sectionTitle}>Vehicle type</h3>
          <div className={css.chipsGrid}>
            <button
              className={`${css.chip} ${vehicleType === 'van' ? css.chipActive : ''}`}
              type="button"
              onClick={() => dispatch(setVehicleType('van'))}
              disabled={isLoading}
            >
              <span className={css.chipIcon}>▭</span>
              Van
            </button>

            <button
              className={`${css.chip} ${vehicleType === 'fullyIntegrated' ? css.chipActive : ''}`}
              type="button"
              onClick={() => dispatch(setVehicleType('fullyIntegrated'))}
              disabled={isLoading}
            >
              <span className={css.chipIcon}>▦</span>
              Fully Integrated
            </button>

            <button
              className={`${css.chip} ${vehicleType === 'alcove' ? css.chipActive : ''}`}
              type="button"
              onClick={() => dispatch(setVehicleType('alcove'))}
              disabled={isLoading}
            >
              <span className={css.chipIcon}>≡</span>
              Alcove
            </button>
          </div>

          <button
            className={css.searchBtn}
            type="button"
            onClick={onSearch}
            disabled={isLoading}
          >
            Search
          </button>
        </div>
      </aside>

      {/* RESULTS */}
      <div className={css.results}>
        {isLoading && <div className={css.loader}>Loading…</div>}
        {!!error && <div className={css.error}>Error: {error}</div>}

        {showNoResults && (
          <div className={css.noResults}>
            No campers match your filters. Try changing filters or click “Load more”.
          </div>
        )}

        {items.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}

        {hasMore && !isLoading && (
          <button
            className={css.loadMore}
            onClick={() => dispatch(fetchCampers({ mode: 'append' }))}
            type="button"
          >
            Load more
          </button>
        )}
      </div>
    </section>
  );
}
