import css from './CamperCard.module.css';

function formatPrice(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return '€0,00';
  return `€${num.toFixed(2).replace('.', ',')}`;
}

export default function CamperCard({ camper }) {
  const name = camper?.name ?? 'Camper';
  const price = formatPrice(camper?.price);
  const location = camper?.location ?? '';
  const rating = camper?.rating ?? 4.4;
  const reviewsCount = camper?.reviews?.length ?? 2;

  const img =
    camper?.gallery?.[0] ||
    camper?.images?.[0] ||
    camper?.image ||
    'https://images.unsplash.com/photo-1520981825232-ece5fae45120?auto=format&fit=crop&w=900&q=60';

  const badges = [];
  if (camper?.transmission) badges.push(camper.transmission);
  if (camper?.engine) badges.push(camper.engine);

  const safeBadges =
    badges.length > 0 ? badges.slice(0, 4) : ['Automatic', 'Petrol', 'Kitchen', 'AC'];

  return (
    <article className={css.card}>
      <div className={css.imageWrap}>
        <img className={css.image} src={img} alt={name} />
      </div>

      <div className={css.body}>
        <div className={css.headerRow}>
          <h3 className={css.title}>{name}</h3>

          <div className={css.priceFav}>
            <span className={css.price}>{price}</span>
            <button className={css.favBtn} type="button" aria-label="Add to favorites">
              <svg className={css.heart} viewBox="0 0 24 24" fill="none">
                <path
                  d="M12.1 21s-7.1-4.4-9.4-8.3C.5 9.1 2.2 5.9 5.6 5.3c1.8-.3 3.6.4 4.7 1.8 1.1-1.4 2.9-2.1 4.7-1.8 3.4.6 5.1 3.8 2.9 7.4C19.2 16.6 12.1 21 12.1 21z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className={css.metaRow}>
          <span className={css.metaItem}>
            <span className={css.star}>★</span> {rating} ({reviewsCount} Reviews)
          </span>

          <span className={css.metaItem}>
            <svg className={css.icon} viewBox="0 0 24 24" fill="none">
              <path
                d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            {location}
          </span>
        </div>

        <p className={css.desc}>{camper?.description ?? '—'}</p>

        <div className={css.badges}>
          {safeBadges.map((b) => (
            <span key={b} className={css.badge}>
              {b}
            </span>
          ))}
        </div>

        <button className={css.moreBtn} type="button">
          Show more
        </button>
      </div>
    </article>
  );
}