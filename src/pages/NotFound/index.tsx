import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <div
      className={ styles.notFound }
    >
      <div
        className={ styles.notFoundHeader }
      >
        <Header />
        <Navigation />
      </div>
      <div
        className={ styles.notFoundContent }
      >
        <h2
          className={ styles.notFoundTitle }
        >
          Página não encontrada
        </h2>
      </div>
    </div>
  );
}

export default NotFound;
