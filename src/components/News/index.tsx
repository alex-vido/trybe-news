import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NewsListType, NewsType } from '../../helpers/types';
import styles from './News.module.css';
import whiteHeart from '../../assets/whiteheart.png';
import redHeart from '../../assets/redHeart.png';
import { convertDateInDays } from '../../helpers/convertDateInDays';

function News() {
  const dispatch = useDispatch();
  const { news, favorites } = useSelector((state: NewsListType) => ({
    news: state.news.news,
    favorites: state.favorites.favorites,
  }));

  const [renderMoreNews, setRenderMoreNews] = useState(10);
  const newsWithoutMostRecent = news.slice(1, renderMoreNews);

  const handleFavorites = (item: NewsType) => {
    const isFavorite = favorites.some((favorite) => favorite.id === item.id);
    if (isFavorite) {
      const updatedFavorites = favorites
        .filter((favorite) => favorite.id !== item.id);
      dispatch({ type: 'FAVORITES', payload: updatedFavorites });
    } else {
      dispatch({ type: 'FAVORITES', payload: [...favorites, item] });
    }
  };

  const handleMoreNews = () => {
    setRenderMoreNews((prevVisibleNews) => prevVisibleNews + 9);
  };

  return (
    <div
      className={ styles.news }
    >
      <div
        className={ styles.newsContainer }
      >
        { newsWithoutMostRecent && (newsWithoutMostRecent.map((item) => (
          <div
            className={ styles.newsCard }
            key={ item.id }
          >
            <h3
              data-testid="newsTitle"
              className={ styles.title }
            >
              { item.titulo }

            </h3>
            <h4
              data-testid="newsIntroduction"
              className={ styles.text }
            >
              { item.introducao }
            </h4>
            <div
              className={ styles.linkNewsContainer }
            >
              <h4
                data-testid="newsDate"
                className={ styles.date }
              >
                { convertDateInDays(item.data_publicacao) }

              </h4>
              <Link
                data-testid="newsLink"
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
                onClick={ () => handleFavorites(item) }
                className={ styles.btnFavorite }
              >
                <img
                  data-testid="favButton"
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
          data-testid="moreNewsBtn"
          className={ styles.btnMoreNews }
          onClick={ handleMoreNews }
        >
          Mais NOTÍCIAS
        </button>
      </div>
    </div>
  );
}

export default News;
