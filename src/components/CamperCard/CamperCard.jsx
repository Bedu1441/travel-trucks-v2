import { useDispatch, useSelector } from 'react-redux';

import { toggleFavorite } from '../../store/favoritesSlice';
import css from './CamperCard.module.css';

// ✅ CARD ICONS (from Figma)
import IconAC from '../../assets/icons/card/Card_AC.svg';
import IconKitchen from '../../assets/icons/card/Card_Kitchen.svg';
import IconAutomatic from '../../assets/icons/card/Card_Automatic.svg';
import IconPetrol from '../../assets/icons/card/Card_Petrol.svg';

const PLACEHOLDER_IMG =
  'https://images.unsplash.com/photo-1520981825232-ece5fae45120?auto=format&fit=crop&w=900&q=60';

function formatPrice(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return '€0,00';
  return `€${n.toFixed(2).replace('.', ',')}`;
}

/**
 * Build badges strictly by available data
 * Order matches Figma
 */
function buildBadges(camper) {
  const badges = [];

  if (camper?.transmission) {
    badges.push({
      key: 'automatic',
      icon: IconAutomatic,
      label: camper.transmission,
    });
  }

  if (camper?.engine) {
    badges.push({
      key: 'engine',
      icon: IconPetrol,
      label: camper.engine,
    });
  }

  if (camper?.AC) {
    badges.push({
      key: 'AC',
      icon: IconAC,
      label: 'AC',
    });
  }

  if (camper?.kitchen) {
    badges.push({
      key: 'kitchen',
      icon: IconKitchen,
      label: 'Kitchen',
    });
  }

  return badges.slice(0, 6);
}

export default function CamperCard({ camper }) {
  const dispatch = useDispatch();

  const isFavorite = useSelector(
    (state) => !!state.favorites?.ids?.[String(camper?.id)]
  );

  const title = camper?.name ?? 'Camper';
  const price = formatPrice(camper?.price);
  const rating = typeof camper?.rating === 'number' ? camper.rating : 0;
  const reviewsCount = Array.isArray(camper?.reviews) ? camper.reviews.length : 0;
  const location = camper?.location ?? '—';

  const imgSrc =
    camper?.gallery?.[0]?.original ||
    camper?.gallery?.[0] ||
    PLACEHOLDER_IMG;

  const desc = camper?.description || '—';
  const badges = buildBadges(camper);

  const onShowMore = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (camper?.id != null) {
      window.open(`/catalog/${camper.id}`, '_blank');
    }
  };

  const onFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (camper?.id != null) {
      dispatch(toggleFavorite(camper.id));
    }
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
                  xmlns="http://www.w3.org/2000/svg"
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
          <span>⭐ {rating} ({reviewsCount} Reviews)</span>
          <span>📍 {location}</span>
        </div>

        <p className={css.desc}>{desc}</p>

        <div className={css.badges}>
          {badges.map((b) => (
            <span className={css.badge} key={b.key}>
              <img src={b.icon} alt="" aria-hidden="true" />
              {b.label}
            </span>
          ))}
        </div>

        <button className={css.moreBtn} type="button" onClick={onShowMore}>
          Show more
        </button>
      </div>
    </article>
  );
}
