import { Outlet } from 'react-router-dom';
import Header from './Header';
import css from './MainLayout.module.css';

export default function MainLayout() {
  return (
    <div className={css.wrapper}>
      <Header />
      <main className={css.main}>
        <Outlet />
      </main>
    </div>
  );
}
