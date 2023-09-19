import { AnyAction } from 'redux';

const initialState = {
  news: [],
};

export default function news(state = initialState, action: AnyAction) {
  switch (action.type) {
    case 'NEWS':
      return {
        ...state,
        news: action.payload,
      };
    default:
      return state;
  }
}
