import fetchApi from '../../helpers/api';

const thunkActionCreator = (path: string) => {
  return fetchApi(path);
};

export default thunkActionCreator;
