import axios from 'axios';
import { FETCH_CURRENCIES, FETCH_PORTFOLIO, FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/auth/user');
  dispatch({
    type: FETCH_USER,
    payload: res.data,
  });
};

export const fetchPortfolio = () => async dispatch => {
  const res = await axios.get('/api/wallet/all');
  dispatch({
    type: FETCH_PORTFOLIO,
    payload: res.data,
  });
};

export const fetchCurrencies = () => async dispatch => {
  const res = await axios.get('/api/currency/all');
  dispatch({
    type: FETCH_CURRENCIES,
    payload: res.data,
  });
};
