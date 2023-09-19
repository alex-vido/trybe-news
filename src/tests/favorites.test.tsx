import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Favorites from '../pages/Favorites';
import { newsDataMock } from './mocks/newsData';
import { store } from '../redux';

describe('Testes dos favoritos', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => newsDataMock,
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Teste se o botão está favoritando as noticias', async () => {
    const { user } = renderWithRouter(
      <Provider store={ store }>
        <App />
      </Provider>,
    );

    expect(global.fetch).toHaveBeenCalled();

    const mainContentFavButton = await screen.findByTestId('mainContentFavButton');
    const favButton = screen.getAllByTestId('favButton');
    expect(mainContentFavButton).toBeInTheDocument();
    expect(favButton).toHaveLength(9);
    await user.click(mainContentFavButton);
    await user.click(favButton[0]);
    await user.click(favButton[1]);
    await user.click(favButton[2]);
  });

  test('Teste se os itens favoritados são exibidos e removidos em Favorites', async () => {
    const { user } = renderWithRouter(
      <Provider store={ store }>
        <Favorites />
      </Provider>,
    );

    const favContainer = await screen.findByTestId('favoritesContainer');
    const favCard = screen.getAllByTestId('favoriteCard');
    const favButton = screen.getAllByTestId('favButton');

    expect(favContainer).toBeInTheDocument();
    expect(favCard).toHaveLength(4);
    await user.click(favButton[2]);
    const favButtonNews = screen.getAllByTestId('favButton');
    expect(favButtonNews).toHaveLength(3);
  });
});
