import { FETCH_EXCHANGES, RECEIVE_EXCHANGES } from '../actions/types';

export default function(state = {
  isFetching: false,
  isEmpty: true,
  exchanges: [],
}, action) {
  switch (action.type) {
    case FETCH_EXCHANGES:
      return Object.assign({}, state, {
        isFetching: false,
        isEmpty: false,
      });
    case RECEIVE_EXCHANGES:
      return Object.assign({}, state, {
        isFetching: false,
        exchanges: action.payload,
      });
    default:
      return state;
  }
}
