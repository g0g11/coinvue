import { DELETE_CURRENCY, FETCH_PORTFOLIO, RECEIVE_PORTFOLIO } from '../actions/types';

export default function(state = {
  isFetching: false,
  isEmpty: true,
  portfolio: [],
}, action) {
  switch (action.type) {
    case FETCH_PORTFOLIO:
      return Object.assign({}, state, {
        isFetching: true,
        isEmpty: false,
      });
    case RECEIVE_PORTFOLIO:
      return Object.assign({}, state, {
        isFetching: false,
        portfolio: action.payload,
      });
    case DELETE_CURRENCY:
      return {
        ...state,
        portfolio: state.portfolio.filter(currency => currency._id !== action.payload),
      };
    default:
      console.log('default');
      return state;
  }
}
