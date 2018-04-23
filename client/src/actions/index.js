import axios from 'axios';

import { FETCH_CURRENCIES,
  FETCH_PORTFOLIO,
  FETCH_USER,
  FETCH_EXCHANGES,
  RECEIVE_CURRENCIES,
  DELETE_CURRENCY,
  RECEIVE_PORTFOLIO,
  RECEIVE_EXCHANGES,
  SEARCH_PORTFOLIO,
  SEARCH_CURRENCY,
  SEARCH_EXCHANGE,
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

export const deleteCurrency = (id) => dispatch => {
  axios.delete(`/api/wallet/remove/${id}`)
    .then(res => dispatch({
      type: DELETE_CURRENCY,
      payload: id,
    }));
};

export const fetchExchanges = () => dispatch => {
  dispatch({ type: FETCH_EXCHANGES });
  return axios.get('/api/exchanges/all')
    .then(res => dispatch({
      type: RECEIVE_EXCHANGES,
      payload: res.data,
    }));
};

export const submitNewApi = (values) => async dispatch => {
  const res = await axios.post('/api/wallet/api', values);
  dispatch({ type: FETCH_PORTFOLIO, payload: res.data });
};

export const submitNewCurrency = (values) => async dispatch => {
  const res = await axios.post('/api/wallet/add', values);
  dispatch({ type: FETCH_PORTFOLIO, payload: res.data });
};

export const searchPortfolio = (value) => async dispatch => {
  dispatch({ type: SEARCH_PORTFOLIO, value });
};

export const searchCurrency = (value) => async dispatch => {
  dispatch({ type: SEARCH_CURRENCY, value });
};

export const searchExchange = (value) => async dispatch => {
  dispatch({ type: SEARCH_EXCHANGE, value });
};
