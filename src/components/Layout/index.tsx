import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Navigation from '../Navigation';
import MainContent from '../MainContent';
import styles from './Layout.module.css';

function Layout() {
  return (
    <div
      className={ styles.layout }
    >
      <Header />
      <MainContent />
      <Navigation />
      <Outlet />
    </div>
  );
}

export default Layout;
