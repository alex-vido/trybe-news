import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { newsDataMock } from './mocks/newsData';
import { store } from '../redux';

describe('Testes do App', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => newsDataMock,
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Teste se a aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(
      <Provider store={ store }>
        <App />
      </Provider>,
    );
    const recentes = screen.getByRole('link', { name: /mais recentes/i });
    const release = screen.getByRole('link', { name: /release/i });
    const noticia = screen.getByRole('link', { name: /notícia/i });
    const favorite = screen.getByRole('link', { name: /favoritas/i });
    expect(recentes).toBeInTheDocument();
    expect(release).toBeInTheDocument();
    expect(noticia).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  test('Teste se a aplicação possui header', () => {
    renderWithRouter(
      <Provider store={ store }>
        <App />
      </Provider>,
    );
    const title = screen.getByRole('heading', { name: /trybe news/i });
    expect(title).toBeInTheDocument();
  });

  test('Teste se a aplicação possui as informações da notícia mais recente', async () => {
    renderWithRouter(
      <Provider store={ store }>
        <App />
      </Provider>,
    );

    expect(global.fetch).toHaveBeenCalled();

    const textNewer = await screen.findByRole('heading', { name: /notícia mais recente/i });
    const mainContenttitle = await screen.findByTestId('mainContentTitle');
    const mainContentIntroduction = await screen.findByTestId('mainContentIntroduction');
    const mainContentLink = await screen.findByTestId('mainContentLink');
    const mainContentDate = await screen.findByTestId('mainContentDate');
    const mainContentFavButton = await screen.findByTestId('mainContentFavButton');
    expect(textNewer).toBeInTheDocument();
    expect(mainContenttitle).toBeInTheDocument();
    expect(mainContentIntroduction).toBeInTheDocument();
    expect(mainContentLink).toBeInTheDocument();
    expect(mainContentDate).toBeInTheDocument();
    expect(mainContentFavButton).toBeInTheDocument();
  });

  test('Teste se a aplicação renderizou as notícias', async () => {
    renderWithRouter(
      <Provider store={ store }>
        <App />
      </Provider>,
    );

    expect(global.fetch).toHaveBeenCalled();

    const newsTitle = screen.getAllByTestId('newsTitle');
    const newsIntroduction = screen.getAllByTestId('newsIntroduction');
    const newsDate = screen.getAllByTestId('newsDate');
    const newsLink = screen.getAllByTestId('newsLink');
    const favButton = screen.getAllByTestId('favButton');

    expect(newsTitle).toHaveLength(9);
    expect(newsIntroduction).toHaveLength(9);
    expect(newsDate).toHaveLength(9);
    expect(newsLink).toHaveLength(9);
    expect(favButton).toHaveLength(9);
  });

  test('Teste se botão renderizar mais noticias está funcionando conforme esperado', async () => {
    const { user } = renderWithRouter(
      <Provider store={ store }>
        <App />
      </Provider>,
    );

    expect(global.fetch).toHaveBeenCalled();

    const moreNewsBtn = screen.getByTestId('moreNewsBtn');
    expect(moreNewsBtn).toBeInTheDocument();
    await user.click(moreNewsBtn);
    const newsTitle = screen.getAllByTestId('newsTitle');
    const newsIntroduction = screen.getAllByTestId('newsIntroduction');
    const newsDate = screen.getAllByTestId('newsDate');
    const newsLink = screen.getAllByTestId('newsLink');
    const favButton = screen.getAllByTestId('favButton');
    expect(newsTitle).toHaveLength(10);
    expect(newsIntroduction).toHaveLength(10);
    expect(newsDate).toHaveLength(10);
    expect(newsLink).toHaveLength(10);
    expect(favButton).toHaveLength(10);
  });
});
