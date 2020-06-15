import types from './types';

import {TRANSACTIONS_LIMIT} from '../../constants';
import {stripHtml} from '../../utils/stringUtils';

const initialState = {
  latestBlocks: {},
};

export const blocksReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case types.FETCHING_LATEST_BLOCK: {
      return {
        ...state,
        latestBlocks: {},
      };
    }
    case types.FETCHING_LATEST_BLOCK_SUCCESS: {
      return {
        ...state,
        latestBlocks: {...payload},
      };
    }
    case types.FETCHING_LATEST_BLOCK_FAILURE: {
      return {
        ...state,
        latestBlocks: {},
      };
    }
    default:
      return state;
  }
};
