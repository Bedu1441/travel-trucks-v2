import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CamperCard from '../components/CamperCard/CamperCard';
import { selectFavoriteCampers } from '../store/selectors';

import css from './FavoritesPage.module.css';

export default function FavoritesPage() {
  const items = useSelector(selectFavoriteCampers);

  return (
    <section className={css.page}>
      <div className={css.headerRow}>
        <h1 className={css.title}>Favorites</h1>
        <p className={css.hint}>
          Saved campers: <strong>{items.length}</strong>
        </p>
      </div>

      {items.length === 0 ? (
        <div className={css.emptyBox}>
          No favorites yet. Go to{' '}
          <Link className={css.link} to="/catalog">
            Catalog
          </Link>{' '}
          and save a camper.
        </div>
      ) : (
        <div className={css.list}>
          {items.map((camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))}
        </div>
      )}
    </section>
  );
}
