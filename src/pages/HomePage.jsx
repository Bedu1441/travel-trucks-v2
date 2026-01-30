import { Link } from 'react-router-dom';
import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <section className={css.hero}>
      <div className={css.overlay} />

      <div className={css.content}>
        <h1 className={css.title}>Campers of your dreams</h1>
        <p className={css.text}>You can find everything you want in our catalog</p>

        <Link className={css.cta} to="/catalog">
          View Now
        </Link>
      </div>
    </section>
  );
}