import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { newsDataMock } from './mocks/newsData';
import { store } from '../redux';

describe('Testes verificando as rotas estão funcionando conforme o esperado', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => newsDataMock,
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Teste se ao clicar no nav, as rotas são alteradas', async () => {
    const { user } = renderWithRouter(
      <Provider store={ store }>
        <App />
      </Provider>,
    );

    expect(global.fetch).toHaveBeenCalled();
    const moreRecent = await screen.findByTestId('link-to-moreRecent');
    const release = await screen.findByTestId('link-to-release');
    const news = await screen.findByTestId('link-to-news');
    const favorites = await screen.findByTestId('link-to-favorites');
    expect(moreRecent).toBeInTheDocument();
    expect(release).toBeInTheDocument();
    expect(news).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
    await user.click(moreRecent);
    expect(window.location.pathname).toBe('/moreRecent');
    await user.click(release);
    expect(window.location.pathname).toBe('/release');
    await user.click(news);
    expect(window.location.pathname).toBe('/news');
    await user.click(favorites);
    expect(window.location.pathname).toBe('/favorites');
  });

  test('Teste se aoo entrar em uma rota não existente, o mesmo carrega o componente NotFound', async () => {
    renderWithRouter(
      <Provider store={ store }>
        <App />
      </Provider>,
      { route: '/rota-que-nao-existe' },
    );

    expect(global.fetch).toHaveBeenCalled();

    const notFound = screen.getByRole('heading', {
      name: /página não encontrada/i,
    });
    expect(notFound).toBeInTheDocument();
  });
});
