import {
  FETCH_CURRENCIES,
  FETCH_CURRENCY,
  RECEIVE_CURRENCIES,
  SEARCH_CURRENCY
} from '../actions/types';

export default function(state = {
  isFetching: false,
  isEmpty: true,
  currencies: [],
  value: '',
  coins: [],
  prices: [],
  fetchingData: true,
}, action) {
  switch (action.type) {
    case FETCH_CURRENCIES:
      return Object.assign({}, state, {
        isFetching: true,
        isEmpty: false,
      });
    case RECEIVE_CURRENCIES:
      return Object.assign({}, state, {
        isFetching: false,
        coins: action.payload,
        currencies: action.payload,
      });
    case SEARCH_CURRENCY:
      const { value } = action;
      const coins = state.currencies
        .filter(currency => currency.fullName.toLowerCase().includes(value.toLowerCase()));
      return { ...state, value, coins };
    case FETCH_CURRENCY:
      return Object.assign({}, state, {
        fetchingData: false,
        data: action.payload,
      });
      return { ...state, prices: action.payload };
    default:
      return state;
  }
}
