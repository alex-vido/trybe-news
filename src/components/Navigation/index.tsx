import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation() {
  return (
    <div
      className={ styles.navigation }
    >
      <nav
        className={ styles.nav }
      >
        <ul
          className={ styles.list }
        >
          <li
            className={ styles.item }
          >
            <Link
              data-testid="link-to-moreRecent"
              className={ styles.link }
              to="/moreRecent"
            >
              Mais Recentes
            </Link>
          </li>
          <li
            className={ styles.item }
          >
            <Link
              data-testid="link-to-release"
              className={ styles.link }
              to="/release"
            >
              Release
            </Link>
          </li>
          <li>
            <Link
              data-testid="link-to-news"
              className={ styles.link }
              to="/news"
            >
              Notícia
            </Link>
          </li>
          <li>
            <Link
              data-testid="link-to-favorites"
              className={ styles.link }
              to="/favorites"
            >
              Favoritas
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
