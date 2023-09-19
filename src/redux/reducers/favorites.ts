import { AnyAction } from 'redux';

const initialState = {
  favorites: [],
};

export default function favorites(state = initialState, action: AnyAction) {
  switch (action.type) {
    case 'FAVORITES':
      return {
        ...state,
        favorites: action.payload,
      };
    default:
      return state;
  }
}
