import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { NewsListType } from '../../helpers/types';
import styles from './MainContent.module.css';
import whiteHeart from '../../assets/whiteheart.png';
import redHeart from '../../assets/redHeart.png';
import { convertDateInDays } from '../../helpers/convertDateInDays';

function MainContent() {
  const dispatch = useDispatch();
  const { news, favorites } = useSelector((state: NewsListType) => ({
    news: state.news.news,
    favorites: state.favorites.favorites,
  }));

  const moreRecentNews = news[0];
  const imagens = moreRecentNews?.imagens;
  const parsedImagens = imagens ? JSON.parse(imagens) : null;

  const isFavorite = favorites.some((favorite) => favorite.id === moreRecentNews?.id);

  const handleFavorites = () => {
    if (isFavorite) {
      const updatedFavorites = favorites
        .filter((favorite) => favorite.id !== moreRecentNews?.id);
      dispatch({ type: 'FAVORITES', payload: updatedFavorites });
    } else {
      dispatch({ type: 'FAVORITES', payload: [...favorites, moreRecentNews] });
    }
  };

  return (
    <div className={ styles.MainContent }>
      <div className={ styles.containerImage }>
        <img
          className={ styles.mainImage }
          src={ `https://agenciadenoticias.ibge.gov.br/${parsedImagens?.image_intro}` }
          alt="main news"
        />
      </div>
      { moreRecentNews && (
        <div className={ styles.containerNews }>
          <div className={ styles.favoriteContainer }>
            <h3 className={ styles.moreRecentText }>Notícia mais recente</h3>
            <button
              data-testid="mainContentFavButton"
              className={ styles.favoriteButton }
              type="button"
              onClick={ handleFavorites }
            >
              <img src={ isFavorite ? redHeart : whiteHeart } alt="favorite button" />
            </button>
          </div>
          <h2
            className={ styles.title }
            data-testid="mainContentTitle"
          >
            { moreRecentNews.titulo }
          </h2>
          <h3
            className={ styles.text }
            data-testid="mainContentIntroduction"
          >
            { moreRecentNews.introducao}
          </h3>
          <div className={ styles.linkNewsContainer }>
            <h4
              data-testid="mainContentDate"
            >
              { convertDateInDays(moreRecentNews.data_publicacao) }
            </h4>
            <Link
              data-testid="mainContentLink"
              to={ moreRecentNews.link }
              target="_blank"
              rel="noopener noreferrer"
              className={ styles.btnReadNews }
            >
              Leia a notícia aqui
            </Link>
          </div>
        </div>
      ) }
    </div>
  );
}

export default MainContent;
