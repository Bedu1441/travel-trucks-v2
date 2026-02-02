import { useSelector } from 'react-redux';
import CamperCard from '../components/CamperCard/CamperCard';
import { selectFavoriteCampers } from '../store/selectors';
import css from './CatalogPage.module.css'; // тимчасово можна reuse, або зробиш окремий

export default function FavoritesPage() {
  const items = useSelector(selectFavoriteCampers);

  return (
    <section className={css.page}>
      <div className={css.results}>
        {items.length === 0 ? (
          <div className={css.noResults}>No favorites yet.</div>
        ) : (
          items.map((camper) => <CamperCard key={camper.id} camper={camper} />)
        )}
      </div>
    </section>
  );
}
