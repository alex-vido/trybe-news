import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from './components/Layout';
import Home from './pages/Home';
import fetchApi from './helpers/api';
import Favorites from './pages/Favorites';
import News from './components/News';
import NotFound from './pages/NotFound';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const fetch = async () => {
      const dataFetch = await fetchApi(path);
      dispatch({ type: 'NEWS', payload: dataFetch.items });
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Home /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/news" element={ <News /> } />
        <Route path="/release" element={ <News /> } />
        <Route path="/moreRecent" element={ <News /> } />
      </Route>
      <Route path="/*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
