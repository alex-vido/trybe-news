const fetchApi = async (path: string) => {
  try {
    let URL = 'https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100';
    switch (path) {
      case '/':
        break;
      case '/moreRecent':
        URL = 'http://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia&qtd=100&introsize=60';
        break;
      case '/release':
        URL = 'http://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release&qtd=100&introsize=60';
        break;
      default:
        break;
    }
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchApi;
