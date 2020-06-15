import types from './types';

const initialState = {
  transactionsList: [],
  transactionsInfo: {},
  latestTransaction: [],
  latestValidator: [],
  stakingValidator: [],
  latestBlocks: [],
  chartTx: [],
  newTransaction: [],
  newestBLock: {},
};

export const transactionsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case types.TRANSACTIONS_ADD:
      return {
        ...state,
        newTransaction: JSON.parse(payload),
      };

    case types.FETCHING_LATEST_TRANSACTION:
      return {
        ...state,
        latestTransaction: [],
      };
    case types.FETCHING_LATEST_TRANSACTION_SUCCESS:
      return {
        ...state,
        latestTransaction: payload,
      };
    case types.FETCHING_LATEST_TRANSACTION_FAILURE:
      return {
        ...state,
        latestTransaction: [],
      };

    case types.FETCHING_LATEST_VALIDATOR:
      return {
        ...state,
        latestValidator: [],
      };
    case types.FETCHING_LATEST_VALIDATOR_SUCCESS:
      return {
        ...state,
        latestValidator: payload,
      };
    case types.FETCHING_LATEST_VALIDATOR_FAILURE:
      return {
        ...state,
        latestValidator: [],
      };

    case types.FETCHING_STAKING_VALIDATOR:
      return {
        ...state,
        stakingValidator: [],
      };
    case types.FETCHING_STAKING_VALIDATOR_SUCCESS:
      return {
        ...state,
        stakingValidator: payload,
      };
    case types.FETCHING_STAKING_VALIDATOR_FAILURE:
      return {
        ...state,
        stakingValidator: [],
      };

    case types.FETCHING_TX_CHART:
      return {
        ...state,
        chartTx: [],
      };
    case types.FETCHING_TX_CHART_SUCCESS:
      return {
        ...state,
        chartTx: payload,
      };
    case types.FETCHING_TX_CHART_FAILURE:
      return {
        ...state,
        chartTx: [],
      };

    case types.FETCHING_LATEST_BLOCK: {
      return {
        ...state,
        latestBlocks: [],
      };
    }
    case types.FETCHING_LATEST_BLOCK_SUCCESS: {
      return {
        ...state,
        latestBlocks: payload,
      };
    }
    case types.FETCHING_LATEST_BLOCK_FAILURE: {
      return {
        ...state,
        latestBlocks: [],
      };
    }

    case types.FETCHING_NEWEST_BLOCK_SUCCESS:
      return {
        ...state,
        newestBLock: {
          ...JSON.parse(payload)
        },
      };
    default:
      return state;
  }
};
