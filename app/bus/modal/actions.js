// Instruments
import types from './types';
import {HISTORY_ITEMS_PER_PAGE, EOS, END_POINT_API} from '../../constants';

export const modalActions = Object.freeze({

  fetchAccountInfo: producerName => async dispatch => {
    dispatch({type: types.FETCHING_ACCOUNT_INFO});

    try {
      const response = await fetch(`${END_POINT_API}/api/v1/accounts/${producerName}`);
      const data = await response.json();
      return dispatch({
        type: types.FETCHING_ACCOUNT_INFO_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_ACCOUNT_INFO_FAIL,
      });
    }
  },

  fetchAddressInfo: address => async dispatch => {
    dispatch({type: types.FETCHING_ADDRESS_INFO});

    try {
      const response = await fetch(`${END_POINT_API}/api/v1/auth/accounts/${address}`);
      const data = await response.json();
      return dispatch({
        type: types.FETCHING_ADDRESS_INFO_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_ADDRESS_INFO_FAIL,
      });
    }
  },

  fetchStakingValidatorAddressInfo: address => async dispatch => {
    dispatch({type: types.FETCHING_STAKING_VALIDATOR_ADDRESS_INFO});

    try {
      const response = await fetch(`${END_POINT_API}/api/v1/staking/validators/${address}`);
      const data = await response.json();
      return dispatch({
        type: types.FETCHING_STAKING_VALIDATOR_ADDRESS_INFO_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_STAKING_VALIDATOR_ADDRESS_INFO_FAIL,
      });
    }
  },

  fetchProposerAddress: (address, height) => async dispatch => {
    dispatch({type: types.FETCHING_PROPOSER_ADDRESS});

    try {
      const response = await fetch(`${END_POINT_API}/api/v1/staking/validators/pdtvalcons/${address}/${height}`);
      const data = await response.json();
      return dispatch({
        type: types.FETCHING_PROPOSER_ADDRESS_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_PROPOSER_ADDRESS_FAIL,
      });
    }
  },

  fetchAccountHistory: (producerName, page, actionType, dateOrdered) => async dispatch => {
    dispatch({type: types.FETCHING_ACCOUNT_HISTORY});
    try {
      const response = await fetch(
        `${END_POINT_API}/api/v1/accounts/${producerName}/history?skip=${page}&limit=${HISTORY_ITEMS_PER_PAGE}&action_name=${actionType ||
        ''}&date_order=${dateOrdered || 'descending'}`
      );
      const data = await response.json();
      return dispatch({
        type: types.FETCHING_ACCOUNT_HISTORY_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_ACCOUNT_HISTORY_FAIL,
      });
    }
  },

  fetchBlockInfo: blockNum => async dispatch => {
    dispatch({type: types.FETCHING_BLOCK_INFO});
    try {
      // const response = await EOS.getBlock(blockNum);
      const response = await fetch(`${END_POINT_API}/api/v1/blocks/${blockNum}`);
      const data = await response.json();

      return dispatch({
        type: types.FETCHING_BLOCK_INFO_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_BLOCK_INFO_FAILURE,
      });
    }
  },

  fetchTxInfo: txId => async dispatch => {
    dispatch({type: types.FETCHING_TX_INFO});
    try {
      let response = null;
      if (txId.length <= 64) {
        response = await fetch(`${END_POINT_API}/api/v1/txhash/${txId}`);
      } else {
        response = await fetch(`${END_POINT_API}/api/v1/txs/${txId}`);
      }

      const data = await response.json();
      return dispatch({
        type: types.FETCHING_TX_INFO_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_TX_INFO_FAILURE,
      });
    }
  },

  fetchP2PAddresses: () => async dispatch => {
    dispatch({type: types.FETCHING_P2P_ADDRESSES});

    try {
      const response = await fetch(`${END_POINT_API}/api/v1/p2p/addresses`);
      const data = await response.json();
      return dispatch({
        type: types.FETCHING_P2P_ADDRESSES_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_P2P_ADDRESSES_FAILURE,
      });
    }
  },

  fetchBpJson: accountName => async dispatch => {
    dispatch({type: types.FETCHING_BP_JSON});

    try {
      const response = await fetch(`${END_POINT_API}/api/v1/chain/${accountName}/bp`);
      const data = await response.json();

      return dispatch({
        type: types.FETCHING_BP_JSON_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_BP_JSON_FAILURE,
      });
    }
  },

  fetchRamPrice: (from, to) => async dispatch => {
    dispatch({type: types.FETCHING_RAM_PRICE});

    try {
      const response = await fetch(`${END_POINT_API}/api/v1/ram?from=${from}&to=${to}`);

      const data = await response.json();
      return dispatch({
        type: types.FETCHING_RAM_PRICE_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_RAM_PRICE_FAILURE,
      });
    }
  },

  resetRamPriceStore: () => ({
    type: types.RESET_RAM_PRICE,
  }),

  resetEosApiStore: () => ({
    type: types.RESET_EOS_API,
  }),

  resetBpJsonStore: () => ({
    type: types.RESET_BP_JSON,
  }),

  getInfo: () => async dispatch => {
    dispatch({type: types.EOS_API_PENDING});

    try {
      const response = await EOS.getInfo({});
      return dispatch({
        type: types.EOS_API_SUCCESS,
        payload: response,
      });
    } catch (e) {
      return dispatch({
        type: types.EOS_API_FAILURE,
      });
    }
  },

  getBlock: data => async dispatch => {
    dispatch({type: types.EOS_API_PENDING});

    try {
      const {getBlock} = data;

      const response = await EOS.getBlock(getBlock);

      return dispatch({
        type: types.EOS_API_SUCCESS,
        payload: response,
      });
    } catch (e) {
      return dispatch({
        type: types.EOS_API_FAILURE,
      });
    }
  },

  getBlockHeaderState: data => async dispatch => {
    dispatch({type: types.EOS_API_PENDING});

    try {
      const {getBlockHeaderState} = data;

      const response = await EOS.getBlockHeaderState(getBlockHeaderState);

      return dispatch({
        type: types.EOS_API_SUCCESS,
        payload: response,
      });
    } catch (e) {
      return dispatch({
        type: types.EOS_API_FAILURE,
      });
    }
  },

  getAccount: data => async dispatch => {
    dispatch({type: types.EOS_API_PENDING});

    try {
      const {getAccount} = data;

      const response = await EOS.getAccount(getAccount);

      return dispatch({
        type: types.EOS_API_SUCCESS,
        payload: response,
      });
    } catch (e) {
      return dispatch({
        type: types.EOS_API_FAILURE,
      });
    }
  },

  getAbi: data => async dispatch => {
    dispatch({type: types.EOS_API_PENDING});

    try {
      const {getAbi} = data;

      const response = await EOS.getAbi(getAbi);

      return dispatch({
        type: types.EOS_API_SUCCESS,
        payload: response,
      });
    } catch (e) {
      return dispatch({
        type: types.EOS_API_FAILURE,
      });
    }
  },

  getRawCodeAndAbi: data => async dispatch => {
    dispatch({type: types.EOS_API_PENDING});

    try {
      const {getCode} = data;

      const response = await EOS.getRawCodeAndAbi(getCode);

      return dispatch({
        type: types.EOS_API_SUCCESS,
        payload: response,
      });
    } catch (e) {
      return dispatch({
        type: types.EOS_API_FAILURE,
      });
    }
  },

  getTableRows: data => async dispatch => {
    dispatch({type: types.EOS_API_PENDING});

    try {
      const {
        getTableRowsJson,
        getTableRowsCode,
        getTableRowsScope,
        getTableRowsTable,
        getTableRowsTableKey,
        getTableRowsLowerBound,
        getTableRowsUpperBound,
        getTableRowsLimit,
      } = data;
      const limit = +getTableRowsLimit;
      const json = getTableRowsJson === 'true';

      const response = await EOS.getTableRows(
        json,
        getTableRowsCode,
        getTableRowsScope,
        getTableRowsTable,
        getTableRowsTableKey,
        getTableRowsLowerBound,
        getTableRowsUpperBound,
        limit
      );

      return dispatch({
        type: types.EOS_API_SUCCESS,
        payload: response,
      });
    } catch (e) {
      return dispatch({
        type: types.EOS_API_FAILURE,
      });
    }
  },

  getCurrencyBalance: data => async dispatch => {
    dispatch({type: types.EOS_API_PENDING});

    try {
      const {getCurrencyBalanceСode, getCurrencyBalanceAccount, getCurrencyBalanceSymbol} = data;

      const response = await EOS.getCurrencyBalance(
        getCurrencyBalanceСode,
        getCurrencyBalanceAccount,
        getCurrencyBalanceSymbol
      );

      return dispatch({
        type: types.EOS_API_SUCCESS,
        payload: response,
      });
    } catch (e) {
      return dispatch({
        type: types.EOS_API_FAILURE,
      });
    }
  },

  getCurrencyStats: data => async dispatch => {
    dispatch({type: types.EOS_API_PENDING});

    try {
      const {getCurrencyStatsСode, getCurrencyStatsSymbol} = data;

      const response = await EOS.getCurrencyStats(getCurrencyStatsСode, getCurrencyStatsSymbol);

      return dispatch({
        type: types.EOS_API_SUCCESS,
        payload: response,
      });
    } catch (e) {
      return dispatch({
        type: types.EOS_API_FAILURE,
      });
    }
  },

  getProducers: data => async dispatch => {
    dispatch({type: types.EOS_API_PENDING});

    try {
      const {getProducersJson, getProducersLowerBound, getProducersLimit} = data;
      const limit = +getProducersLimit;
      const json = getProducersJson === 'true';

      const response = await EOS.getProducers(json, getProducersLowerBound, limit);

      return dispatch({
        type: types.EOS_API_SUCCESS,
        payload: response,
      });
    } catch (e) {
      return dispatch({
        type: types.EOS_API_FAILURE,
      });
    }
  },

  fetchLatestBlocks: () => async dispatch => {
    dispatch({type: types.FETCHING_LATEST_BLOCK});
    try {
      const response = await fetch(`${END_POINT_API}/blocks/latest`);
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

  fetchTotal: (data, type) => ({
    type: types.FETCHING_TOTAL_SUCCESS,
    payload: {data, type},
  }),

  fetchLatestStakingValidatorInfo: (data) => ({
    type: types.FETCHING_LATEST_STAKING_VALIDATOR_INFO_SUCCESS,
    payload: {data},
  }),

  fetchStakingValidatorUptimeInfo: (data) => ({
    type: types.FETCHING_STAKING_VALIDATOR_UPTIME_INFO_SUCCESS,
    payload: {data},
  }),

  fetchTotalAddresses: (data) => ({
    type: types.FETCHING_TOTAL_ADDRESS,
    payload: {data},
  }),

  fetchStakingValidatorUptimeInfoFilter: (data, searchTerm) => ({
    type: types.FETCHING_STAKING_VALIDATOR_UPTIME_INFO_FILTER,
    payload: {data, searchTerm},
  }),

  fetchDelegators: (validatorAdd) => async dispatch => {
    dispatch({type: types.FETCHING_DELEGATORS});
    try {
      const response = await fetch(`${END_POINT_API}/api/v1/staking/validators/${validatorAdd}/delegations`);
      const data = await response.json();

      return dispatch({
        type: types.FETCHING_DELEGATORS_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_DELEGATORS_FAILURE,
      });
    }
  },

  fetchProposedBlocks: (page, perPage, consensusPubkey) => async dispatch => {
    dispatch({type: types.FETCHING_PROPOSED_BLOCKS});

    try {
      const response = await fetch(`${END_POINT_API}/api/v1/blocks/custom/listing?limit=${perPage}&page=${page}&consensusPubkey=${consensusPubkey}`);
      const data = await response.json();
      return dispatch({
        type: types.FETCHING_PROPOSED_BLOCKS_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_PROPOSED_BLOCKS_FAILURE,
      });
    }
  },

  fetchValidatorSet: (blockHeight, consensusPubkey) => async dispatch => {
    dispatch({type: types.FETCHING_VALIDATOR_SET});

    try {
      const response = await fetch(`${END_POINT_API}/api/v1/validatorsets/listing?consensusPubkey=${consensusPubkey}&blockHeight=${blockHeight}`);
      const data = await response.json();
      return dispatch({
        type: types.FETCHING_VALIDATOR_SET_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: types.FETCHING_VALIDATOR_SET_FAILURE,
      });
    }
  },
});
