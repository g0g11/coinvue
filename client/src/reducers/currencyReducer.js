import { FETCH_CURRENCIES } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CURRENCIES:
      return action.payload;
    default:
      return state;
  }
}
