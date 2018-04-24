import {
  FETCH_EXCHANGES,
  RECEIVE_EXCHANGES, SEARCH_EXCHANGE
} from '../actions/types';

export default function(state = {
  isFetching: false,
  isEmpty: true,
  exchanges: [],
  value: '',
  coins: [],
}, action) {
  switch (action.type) {
    case FETCH_EXCHANGES:
      return Object.assign({}, state, {
        isFetching: true,
        isEmpty: false,
      });
    case RECEIVE_EXCHANGES:
      return Object.assign({}, state, {
        isFetching: false,
        coins: action.payload,
        exchanges: action.payload,
      });
    case SEARCH_EXCHANGE:
      const { value } = action;
      const coins = state.exchanges
        .filter(exchange => exchange.name.toLowerCase().includes(value));
      return { ...state, value, coins };
    default:
      return state;
  }
}
