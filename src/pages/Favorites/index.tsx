import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { NewsListType, NewsType } from '../../helpers/types';
import styles from './Favorites.module.css';
import whiteHeart from '../../assets/whiteheart.png';
import redHeart from '../../assets/redHeart.png';
import { convertDateInDays } from '../../helpers/convertDateInDays';

function Favorites() {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state: NewsListType) => ({
    favorites: state.favorites.favorites,
  }));

  const [renderMoreNews, setRenderMoreNews] = useState(9);

  const handleFavorites = (item: NewsType) => {
    const updatedFavorites = favorites
      .filter((favorite) => favorite.id !== item.id);
    dispatch({ type: 'FAVORITES', payload: updatedFavorites });
  };

  const favoritesLimited = favorites.slice(0, renderMoreNews);

  const handleMoreNews = () => {
    setRenderMoreNews((prevVisibleNews) => prevVisibleNews + 9);
  };

  return (
    <div
      className={ styles.favorites }
    >
      <div
        data-testid="favoritesContainer"
        className={ styles.favoritesContainer }
      >
        { favorites && (favoritesLimited.map((item) => (
          <div
            data-testid="favoriteCard"
            className={ styles.favoriteCard }
            key={ item.id }
          >
            <h3
              className={ styles.title }
            >
              { item.titulo }

            </h3>
            <h4
              className={ styles.text }
            >
              { item.introducao }

            </h4>
            <div
              className={ styles.linkFavoriteContainer }
            >
              <h4
                className={ styles.date }
              >
                { convertDateInDays(item.data_publicacao) }

              </h4>
              <Link
                to={ item.link }
                target="_blank"
                rel="noopener noreferrer"
                className={ styles.btnReadNews }
              >
                Leia a notícia aqui
              </Link>
            </div>
            <div
              className={ styles.favoriteContainer }
            >
              <button
                data-testid="favButton"
                onClick={ () => handleFavorites(item) }
                className={ styles.btnFavorite }
              >
                <img
                  src={ favorites.some((favorite) => favorite.id === item.id)
                    ? redHeart : whiteHeart }
                  alt="favorite button"
                />

              </button>
            </div>
          </div>
        ))
        )}
      </div>
      <div
        className={ styles.moreNewsBtnContainer }
      >
        <button
          className={ styles.btnMoreNews }
          onClick={ handleMoreNews }
        >
          Mais NOTÍCIAS
        </button>
      </div>
    </div>
  );
}

export default Favorites;
