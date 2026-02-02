import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { campersApi } from '../api/campersApi';
import { toggleFavorite } from '../store/favoritesSlice';

import css from './CamperDetailsPage.module.css';
import BookingForm from '../components/BookingForm/BookingForm';

const PLACEHOLDER_IMG =
  'https://images.unsplash.com/photo-1520981825232-ece5fae45120?auto=format&fit=crop&w=1400&q=60';

function formatPrice(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return '€0,00';
  return `€${n.toFixed(2).replace('.', ',')}`;
}

function getGallery(camper) {
  const g = camper?.gallery;
  if (!Array.isArray(g)) return [];
  return g
    .map((x) => (typeof x === 'string' ? x : x?.original ?? x?.url ?? null))
    .filter(Boolean);
}

export default function CamperDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const isFavorite = useSelector((state) => !!state.favorites?.ids?.[String(id)]);

  const [camper, setCamper] = useState(null);
  const [activeTab, setActiveTab] = useState('features');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        setCamper(null);
        setActiveTab('features');

        const { data } = await campersApi.get(`/campers/${id}`);
        if (isMounted) setCamper(data);
      } catch (e) {
        if (isMounted) setError(e?.message ?? 'Request failed');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    if (id) load();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const gallery = useMemo(() => getGallery(camper), [camper]);

  const gridImages = useMemo(() => {
    const base = gallery.length ? [...gallery] : [PLACEHOLDER_IMG];
    while (base.length < 4) base.push(base[base.length - 1]);
    return base.slice(0, 4);
  }, [gallery]);

  const title = camper?.name ?? 'Camper';
  const price = formatPrice(camper?.price);
  const rating = typeof camper?.rating === 'number' ? camper.rating : 0;
  const reviews = Array.isArray(camper?.reviews) ? camper.reviews : [];
  const reviewsCount = reviews.length;
  const location = camper?.location ?? '—';
  const description = camper?.description ?? '—';

  const onToggleFavorite = () => {
    dispatch(toggleFavorite(id));
  };

  const featureRows = useMemo(() => {
    if (!camper) return [];

    const rows = [];

    if (camper.form) rows.push({ label: 'Form', value: camper.form });

    if (camper.length) rows.push({ label: 'Length', value: String(camper.length) });
    if (camper.width) rows.push({ label: 'Width', value: String(camper.width) });
    if (camper.height) rows.push({ label: 'Height', value: String(camper.height) });
    if (camper.tank) rows.push({ label: 'Tank', value: String(camper.tank) });
    if (camper.consumption) rows.push({ label: 'Consumption', value: String(camper.consumption) });

    if (camper.transmission) rows.push({ label: 'Transmission', value: camper.transmission });
    if (camper.engine) rows.push({ label: 'Engine', value: camper.engine });

    const boolEq = [
      { key: 'AC', label: 'AC' },
      { key: 'bathroom', label: 'Bathroom' },
      { key: 'kitchen', label: 'Kitchen' },
      { key: 'TV', label: 'TV' },
      { key: 'radio', label: 'Radio' },
      { key: 'refrigerator', label: 'Refrigerator' },
      { key: 'microwave', label: 'Microwave' },
      { key: 'gas', label: 'Gas' },
      { key: 'water', label: 'Water' },
    ];

    const enabled = boolEq.filter((x) => camper?.[x.key]).map((x) => x.label);
    if (enabled.length) rows.push({ label: 'Equipment', value: enabled.join(', ') });

    return rows;
  }, [camper]);

  if (isLoading) return <div className={css.stateBox}>Loading…</div>;
  if (error) return <div className={css.stateBox}>Error: {error}</div>;
  if (!camper) return null;

  return (
    <section className={css.page}>
      <div className={css.topRow}>
        <Link className={css.backLink} to="/catalog">
          ← Back to catalog
        </Link>

        <button
          type="button"
          className={`${css.favBtn} ${isFavorite ? css.favActive : ''}`}
          onClick={onToggleFavorite}
        >
          <svg className={css.heart} viewBox="0 0 24 24" fill={isFavorite ? '#E44848' : 'none'}>
            <path
              d="M12.1 21s-7.1-4.4-9.4-8.3C.5 9.1 2.2 5.9 5.6 5.3c1.8-.3 3.6.4 4.7 1.8 1.1-1.4 2.9-2.1 4.7-1.8 3.4.6 5.1 3.8 2.9 7.4C19.2 16.6 12.1 21 12.1 21z"
              stroke={isFavorite ? '#E44848' : '#101828'}
              strokeWidth="1.8"
            />
          </svg>
          <span className={css.favText}>{isFavorite ? 'Saved' : 'Save'}</span>
        </button>
      </div>

      <div className={css.header}>
        <div className={css.titleRow}>
          <h1 className={css.title}>{title}</h1>
          <div className={css.price}>{price}</div>
        </div>

        <div className={css.metaRow}>
          <span>⭐ {rating} ({reviewsCount} Reviews)</span>
          <span>📍 {location}</span>
        </div>
      </div>

      <div className={css.galleryGrid}>
        {gridImages.map((src, idx) => (
          <img key={idx} className={css.galleryImg} src={src} alt={`${title} ${idx + 1}`} />
        ))}
      </div>

      <p className={css.description}>{description}</p>

      {/* ✅ LEFT: tabs+content | RIGHT: booking form (aligned to bottom) */}
      <div className={css.detailsGrid}>
        <div className={css.leftCol}>
          <div className={css.tabs}>
            <button
              type="button"
              className={`${css.tab} ${activeTab === 'features' ? css.tabActive : ''}`}
              onClick={() => setActiveTab('features')}
            >
              Features
            </button>

            <button
              type="button"
              className={`${css.tab} ${activeTab === 'reviews' ? css.tabActive : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({reviewsCount})
            </button>
          </div>

          {activeTab === 'features' ? (
            <div className={css.features}>
              {featureRows.length === 0 ? (
                <div className={css.emptyBox}>No features data.</div>
              ) : (
                <ul className={css.featureList}>
                  {featureRows.map((row) => (
                    <li className={css.featureRow} key={row.label}>
                      <span className={css.featureLabel}>{row.label}</span>
                      <span className={css.featureValue}>{row.value}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className={css.reviews}>
              {reviewsCount === 0 ? (
                <div className={css.emptyBox}>No reviews yet.</div>
              ) : (
                <ul className={css.reviewList}>
                  {reviews.map((r, idx) => (
                    <li className={css.reviewCard} key={idx}>
                      <div className={css.reviewTop}>
                        <span className={css.reviewer}>{r?.reviewer_name ?? 'Anonymous'}</span>
                        <span className={css.reviewRating}>
                          ⭐ {typeof r?.reviewer_rating === 'number' ? r.reviewer_rating : 0}
                        </span>
                      </div>
                      <p className={css.reviewText}>{r?.comment ?? '—'}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className={css.rightCol}>
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
