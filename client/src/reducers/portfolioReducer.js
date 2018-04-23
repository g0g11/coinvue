import {
  DELETE_CURRENCY,
  FETCH_PORTFOLIO,
  RECEIVE_PORTFOLIO,
  SEARCH_PORTFOLIO,
} from '../actions/types';

export default function(state = {
  isFetching: false,
  isEmpty: true,
  portfolio: [],
  value: '',
  coins: [],
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
        coins: action.payload,
        portfolio: action.payload,
      });
    case DELETE_CURRENCY:
      return {
        ...state,
        coins: state.coins.filter(currency => currency._id !== action.payload),
        portfolio: state.portfolio.filter(currency => currency._id !== action.payload),
      };
    case SEARCH_PORTFOLIO:
      const { value } = action;
      const coins = state.portfolio
        .filter(currency => currency.currency.fullName.toLowerCase().includes(value.toLowerCase()));
      return { ...state, value, coins };
    default:
      return state;
  }
}
