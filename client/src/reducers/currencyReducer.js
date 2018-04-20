import { FETCH_CURRENCIES, RECEIVE_CURRENCIES } from '../actions/types';

export default function(state = {
  isFetching: false,
  isEmpty: true,
  currencies: [],
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
        currencies: action.payload,
      });
    default:
      return state;
  }
}
