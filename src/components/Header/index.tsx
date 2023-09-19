import { Link } from 'react-router-dom';
import logoIcon from '../../assets/logo.png';
import styles from './Header.module.css';

function Header() {
  return (
    <header
      className={ styles.header }
    >
      <Link
        className={ styles.headerLink }
        to="/"
      >
        <img
          className={ styles.logo }
          src={ logoIcon }
          alt="Trybe icon"
        />
        <h1
          className={ styles.title }
        >
          Trybe News
        </h1>
      </Link>
    </header>
  );
}

export default Header;
