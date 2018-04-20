import axios from 'axios';
import { FETCH_CURRENCIES,
  FETCH_PORTFOLIO,
  FETCH_USER,
  RECEIVE_CURRENCIES,
  RECEIVE_PORTFOLIO,
} from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/auth/user');
  dispatch({
    type: FETCH_USER,
    payload: res.data,
  });
};

export const fetchPortfolio = () => dispatch => {
  dispatch({ type: FETCH_PORTFOLIO });
  return axios.get('/api/wallet/all')
    .then(res => dispatch({
      type: RECEIVE_PORTFOLIO,
      payload: res.data,
    }));
};

export const fetchCurrencies = () => dispatch => {
  dispatch({ type: FETCH_CURRENCIES });
  return axios.get('/api/currency/all')
    .then(res => dispatch({
      type: RECEIVE_CURRENCIES,
      payload: res.data,
    }));
};
