import { combineReducers } from 'redux';
import news from './news';
import favorites from './favorites';

const rootReducer = combineReducers({ news, favorites });

export default rootReducer;
