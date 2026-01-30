import { NavLink } from 'react-router-dom';
import css from './Header.module.css';

const linkClass = ({ isActive }) =>
  isActive ? `${css.link} ${css.active}` : css.link;

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <div className={css.logo}>TravelTrucks</div>

        <nav className={css.nav}>
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/catalog" className={linkClass}>
            Catalog
          </NavLink>
        </nav>
      </div>
    </header>
  );
}