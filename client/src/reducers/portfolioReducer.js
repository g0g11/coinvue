import { FETCH_PORTFOLIO, RECEIVE_PORTFOLIO } from '../actions/types';

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
    default:
      return state;
  }
}
