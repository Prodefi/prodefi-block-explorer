import types from './types';
import { END_POINT_API } from '../../constants';

export const transactionActions = Object.freeze({
  transactionsAdd: data => ({
    type: types.TRANSACTIONS_ADD,
    payload: data,
  }),

  fetchNewestBlock: data => ({
    type: types.FETCHING_NEWEST_BLOCK_SUCCESS,
    payload: data,
  }),

  fetchLatestTransactions: (page, perPage) => async dispatch => {
    dispatch({ type: types.FETCHING_LATEST_TRANSACTION });

    try {
      const response = await fetch(`${END_POINT_API}/api/v1/txs/custom/listing?limit=${perPage}&page=${page}`);
      const data = await response.json();

      return dispatch({
        type: types.FETCHING_LATEST_TRANSACTION_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_LATEST_TRANSACTION_FAILURE,
      });
    }
  },

  fetchLatestValidators: () => async dispatch => {
    dispatch({ type: types.FETCHING_LATEST_VALIDATOR });

    try {
      const response = await fetch(`${END_POINT_API}/api/v1/validatorsets/latest`);
      const data = await response.json();

      return dispatch({
        type: types.FETCHING_LATEST_VALIDATOR_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_LATEST_VALIDATOR_FAILURE,
      });
    }
  },

  fetchStaking: () => async dispatch => {
      dispatch({ type: types.FETCHING_STAKING_VALIDATOR });

    try {
      const response = await fetch(`${END_POINT_API}/api/v1/staking/validators`);
      const data = await response.json();

      return dispatch({
        type: types.FETCHING_STAKING_VALIDATOR_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_STAKING_VALIDATOR_FAILURE,
      });
    }
  },

  fetchTxCharts: () => async dispatch => {
    dispatch({ type: types.FETCHING_TX_CHART });

    try {
      const response = await fetch(`${END_POINT_API}/api/v1/chart/txs`);
      const data = await response.json();

      return dispatch({
        type: types.FETCHING_TX_CHART_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_TX_CHART_FAILURE,
      });
    }
  },

  fetchTxInfo: txHash => async dispatch => {
    dispatch({ type: types.FETCHING_TX_DETAIL });
    try {
      const response = await fetch(`${END_POINT_API}/api/v1/txs/${txHash}`);
      const data = await response.json();
      return dispatch({
        type: types.FETCHING_TX_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_TX_DETAIL_FAILURE,
      });
    }
  },

  fetchLatestBlocks: (page, perPage) => async dispatch => {
    dispatch({ type: types.FETCHING_LATEST_BLOCK });

    try {
      const response = await fetch(`${END_POINT_API}/api/v1/blocks/custom/listing?limit=${perPage}&page=${page}`);
      const data = await response.json();
      return dispatch({
        type: types.FETCHING_LATEST_BLOCK_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_LATEST_BLOCK_FAILURE,
      });
    }
  },
});
