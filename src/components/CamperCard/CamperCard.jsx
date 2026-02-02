import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../store/favoritesSlice';
import css from './CamperCard.module.css';

import { Link } from 'react-router-dom';

const PLACEHOLDER_IMG =
  'https://images.unsplash.com/photo-1520981825232-ece5fae45120?auto=format&fit=crop&w=900&q=60';

// Мапінг іконок
const equipmentIcons = {
  transmission: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.6667 4.16663H15.8334V8.33329" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.8334 4.16663L10.8334 9.16663" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.33335 15.8333H4.16669V11.6666" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.16669 15.8333L9.16669 10.8333" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  engine: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.8334 14.1666V6.66663C15.8334 5.74615 15.0872 4.99996 14.1667 4.99996H5.83337C4.9129 4.99996 4.16671 5.74615 4.16671 6.66663V15" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.6667 8.33337H8.33337V11.6667H11.6667V8.33337Z" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.8334 10.8334H17.5" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  AC: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.1667 5.83337C15.5474 5.83337 16.6667 4.71408 16.6667 3.33337" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.33331 16.6666C3.33331 15.2859 4.4526 14.1666 5.83331 14.1666H16.6666" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.33331 10H14.1666C15.5474 10 16.6666 8.88071 16.6666 7.5" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  kitchen: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 11.6666V15" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.33331 11.6666V15" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.3333 3.33337V16.6667" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.6666 6.66663H13.3333" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 3.33337C3.33331 3.33337 3.33331 5.83337 3.33331 5.83337V9.16671C3.33331 9.16671 3.33331 11.6667 5 11.6667C6.66663 11.6667 6.66663 9.16671 6.66663 9.16671V5.83337C6.66663 5.83337 6.66663 3.33337 5 3.33337Z" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  TV: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.6667 5.83337H3.33337C2.4129 5.83337 1.66669 6.57957 1.66669 7.50004V14.1667C1.66669 15.0872 2.4129 15.8334 3.33337 15.8334H16.6667C17.5872 15.8334 18.3334 15.0872 18.3334 14.1667V7.50004C18.3334 6.57957 17.5872 5.83337 16.6667 5.83337Z" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 18.3334L12.5 18.3334" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 15.8334V18.3334" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  bathroom: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.6667 15.8334V16.6667" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.33331 15.8334V16.6667" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.5 15.8334H2.5V11.6667C2.5 10.1667 5.83333 9.16671 5.83333 9.16671C5.83333 9.16671 9.16667 10.8334 10.8333 10.8334C12.5 10.8334 17.5 9.16671 17.5 9.16671V15.8334Z" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 3.33337V6.66671" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

function formatPrice(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return '€0,00';
  return `€${n.toFixed(2).replace('.', ',')}`;
}

function buildBadges(camper) {
  const badges = [];

  if (camper?.transmission) {
    badges.push({ id: 'transmission', label: camper.transmission });
  }
  if (camper?.engine) {
    badges.push({ id: 'engine', label: camper.engine });
  }

  const eqKeys = ['AC', 'kitchen', 'TV', 'bathroom'];
  eqKeys.forEach((key) => {
    if (camper?.[key]) {
      badges.push({ id: key, label: key === 'AC' ? 'AC' : key });
    }
  });

  return badges.slice(0, 6);
}

export default function CamperCard({ camper }) {
  const dispatch = useDispatch();

  // ✅ Під map-структуру: state.favorites.ids = { [id]: true }
  const isFavorite = useSelector(
    (state) => !!state.favorites?.ids?.[String(camper?.id)]
  );

  const title = camper?.name ?? 'Camper';
  const price = formatPrice(camper?.price);
  const rating = typeof camper?.rating === 'number' ? camper.rating : 0;
  const reviewsCount = Array.isArray(camper?.reviews) ? camper.reviews.length : 0;
  const location = camper?.location ?? '—';

  // Перевірка наявності картинки
  const imgSrc =
    camper?.gallery?.[0]?.original ||
    camper?.gallery?.[0] ||
    PLACEHOLDER_IMG;

  const desc = camper?.description || '—';
  const badges = buildBadges(camper);

  const onFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (camper?.id != null) dispatch(toggleFavorite(camper.id));
  };

  return (
    <article className={css.card}>
      <div className={css.imageWrap}>
        <img className={css.image} src={imgSrc} alt={title} />
      </div>

      <div className={css.body}>
        <div className={css.headerRow}>
          <h3 className={css.title}>{title}</h3>

          <div className={css.priceFav}>
            <span className={css.price}>{price}</span>

            <button
              className={`${css.favBtn} ${isFavorite ? css.favoriteActive : ''}`}
              type="button"
              onClick={onFavoriteClick}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg
                className={css.heart}
                viewBox="0 0 24 24"
                fill={isFavorite ? '#E44848' : 'none'}
              >
                <path
                  d="M12.1 21s-7.1-4.4-9.4-8.3C.5 9.1 2.2 5.9 5.6 5.3c1.8-.3 3.6.4 4.7 1.8 1.1-1.4 2.9-2.1 4.7-1.8 3.4.6 5.1 3.8 2.9 7.4C19.2 16.6 12.1 21 12.1 21z"
                  stroke={isFavorite ? '#E44848' : '#101828'}
                  strokeWidth="1.8"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className={css.metaRow}>
          <span className={css.metaItem}>
            ⭐ {rating} ({reviewsCount} Reviews)
          </span>
          <span className={css.metaItem}>📍 {location}</span>
        </div>

        <p className={css.desc}>{desc}</p>

        <div className={css.badges}>
          {badges.map((b) => (
            <span className={css.badge} key={b.id}>
              <span className={css.icon}>{equipmentIcons[b.id]}</span>
              {b.label}
            </span>
          ))}
        </div>

        <Link
          className={css.moreBtn}
          to={`/catalog/${camper.id}`}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          Show more
        </Link>
      </div>
    </article>
  );
}
