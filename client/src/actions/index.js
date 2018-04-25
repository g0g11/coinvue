import axios from 'axios';

import {
  FETCH_CURRENCIES,
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
  FETCH_CURRENCY,
} from './types';
import moment from 'moment/moment';

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

export const fetchCurrency = (id) => async dispatch => {
  const res = await axios.get(`/api/currency/${id}`);
  const history = await axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${res.data[0].shortName}&tsym=EUR&limit=50`);
  console.log('history', history);
  const getData = () => {
    const sortedData = [];
    let count = 0;
    for (let date in history.data.Data) {
      sortedData.push({
        d: moment(history.data.Data.time).format('MMM DD'),
        p: history.data.Data[date].high.toLocaleString('us-EN', { style: 'currency', currency: 'EUR' }),
        x: count, //previous days
        y: history.data.Data[date].high, // numerical price
      });
      count++;
    }

    return sortedData;
  };

  const result = await getData();
  dispatch({
    type: FETCH_CURRENCY,
    payload: result,
  });
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

