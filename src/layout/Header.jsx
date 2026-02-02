import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import css from './Header.module.css';

const linkClass = ({ isActive }) =>
  isActive ? `${css.link} ${css.active}` : css.link;

export default function Header() {
  const favoritesCount = useSelector(
    (state) => Object.keys(state.favorites?.ids ?? {}).length
  );

  return (
    <header className={css.header}>
      <div className={css.container}>
        <NavLink to="/" className={css.logo}>
          TravelTrucks
        </NavLink>

        <nav className={css.nav}>
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/catalog" className={linkClass}>
            Catalog
          </NavLink>

          <NavLink to="/favorites" className={linkClass}>
            Favorites
            {favoritesCount > 0 && (
              <span className={css.badge}>{favoritesCount}</span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
