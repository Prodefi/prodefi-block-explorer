import EosApi from 'eosjs-api';

export const CHAIN_ID = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';

export const END_POINT_API = 'https://explorer.prodefi.io';

export const THROTTLE_TIMEOUT = 600;

export const API_KEY = 'AIzaSyCsLTZPNnXRnwOZNd_4dSL_aIy_5lIKp-8';

// how many transaction do we keep in the reducer
export const TRANSACTIONS_LIMIT = 50;

export const HISTORY_ITEMS_PER_PAGE = 20;

// Eos API
export const EOS = EosApi({
  httpEndpoint: 'https://explorer.prodefi.io',
});

export const TOTAL_TYPE = {
  LATEST_BLOCK_INFO: 1,
  COUNT_TPS: 2,
  TOTAL_TX: 3,
  CURRENT_TPS: 4,
  PEAK_TPS: 5,
  VALIDATOR: 6,
  STAKING_VALIDATOR: 7,
  VALIDATOR_BLOCK_TIME: 8,
};
