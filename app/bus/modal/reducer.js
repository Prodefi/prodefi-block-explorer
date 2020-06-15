// Types
import types from './types';
import { TOTAL_TYPE } from '../../constants';

const initialState = {
  accountInfo: {},
  abiInfo: {},
  accountHistory: {},
  blockInfo: {},
  txInfo: {},
  p2pAddresses: [],
  bpJson: {},
  ramPrice: [],
  eosApiData: {},
  scopes: {},
  transactionData: {},
  addressInfo: {},
  stakingValidatorAddressInfo: {},

  latestBlockInfoSocket: {},
  totalTx: 0,
  countTPS: 0,
  currentTPS: 0,
  peakTPS: 0,
  validatorBlockTime: 0,
  validator: {},
  stakingValidator: {},
  proposerAddress: {},
  latestStakingValidatorInfo: {},
  stakingValidatorUptimeInfo: {},
  stakingValidatorUptimeInfoFilter: {},
  delegators: {},
  proposerBlocks: {},
  validatorSet: {},

  totalAddress: 0
};

export const modalReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case types.FETCHING_ACCOUNT_INFO_SUCCESS:
      return {
        ...state,
        accountInfo: payload,
      };
    case types.FETCHING_ACCOUNT_INFO_FAIL:
      return {
        ...state,
        accountInfo: payload,
      };

    case types.FETCHING_ADDRESS_INFO_SUCCESS:
      return {
        ...state,
        addressInfo: payload,
      };
    case types.FETCHING_ADDRESS_INFO_FAIL:
      return {
        ...state,
        addressInfo: payload,
      };

    case types.FETCHING_STAKING_VALIDATOR_ADDRESS_INFO_SUCCESS:
      return {
        ...state,
        stakingValidatorAddressInfo: payload,
      };
    case types.FETCHING_STAKING_VALIDATOR_ADDRESS_INFO_FAIL:
      return {
        ...state,
        stakingValidatorAddressInfo: payload,
      };

    case types.FETCHING_PROPOSER_ADDRESS_SUCCESS:
      return {
        ...state,
        proposerAddress: payload,
      };
    case types.FETCHING_PROPOSER_ADDRESS_FAIL:
      return {
        ...state,
        proposerAddress: payload,
      };

    case types.FETCHING_ABI_INFO_SUCCESS:
      return {
        ...state,
        abiInfo: payload,
      };
    case types.FETCHING_ABI_INFO_FAIL:
      return {
        ...state,
        abiInfo: payload,
      };

    case types.FETCHING_ACCOUNT_HISTORY_SUCCESS:
      return {
        ...state,
        accountHistory: payload,
      };
    case types.FETCHING_ACCOUNT_HISTORY_FAIL:
      return {
        ...state,
        accountHistory: {
          totalNumber: 0,
          actions: [],
        },
      };

    case types.FETCHING_BLOCK_INFO_SUCCESS:
      return {
        ...state,
        blockInfo: payload,
      };
    case types.FETCHING_BLOCK_INFO_FAILURE:
      return {
        ...state,
        blockInfo: {},
      };

    case types.FETCHING_TX_INFO_SUCCESS:
      return {
        ...state,
        txInfo: payload,
      };
    case types.FETCHING_TX_INFO_FAILURE:
      return {
        ...state,
        txInfo: {},
      };

    case types.FETCHING_JSON_BY_ABI_SUCCESS:
      return {
        ...state,
        transactionData: payload,
      };
    case types.FETCHING_JSON_BY_ABI_FAIL:
      return {
        ...state,
        transactionData: {},
      };

    case type.FETCHING_CONTRACT_TABLE_MORE_SUCCESS:
      return {
        ...state,
        tableData: payload,
      };

    case types.FETCHING_CONTRACT_TABLE_SUCCESS:
      return {
        ...state,
        tableData: payload,
      };
    case types.FETCHING_CONTRACT_TABLE_FAILURE:
      return {
        ...state,
        tableData: {},
      };

    case types.FETCHING_SCOPES_SUCCESS:
      return {
        ...state,
        scopes: payload,
      };
    case types.FETCHING_SCOPES_FAIL:
      return {
        ...state,
        scopes: {},
      };

    case types.CLEAR_SCOPES_DATA:
      return {
        ...state,
        scopes: {},
        tableData: {},
      };

    case types.FETCHING_P2P_ADDRESSES_SUCCESS:
      return {
        ...state,
        p2pAddresses: payload,
      };
    case types.FETCHING_BP_JSON_SUCCESS:
      return {
        ...state,
        bpJson: payload,
      };
    case types.FETCHING_RAM_PRICE_SUCCESS:
      return {
        ...state,
        ramPrice: payload,
      };

    case types.EOS_API_SUCCESS:
      return {
        ...state,
        eosApiData: payload,
      };
    case types.EOS_API_FAILURE:
      return {
        ...state,
        eosApiData: {error: true},
      };

    case types.RESET_RAM_PRICE:
      return {
        ...state,
        ramPrice: [],
      };
    case types.RESET_EOS_API:
      return {
        ...state,
        eosApiData: {},
      };
    case types.RESET_BP_JSON:
      return {
        ...state,
        bpJson: {},
      };

    case types.FETCHING_TOTAL_SUCCESS: {
      switch (payload.type) {
        case TOTAL_TYPE.LATEST_BLOCK_INFO:
          return {
            ...state,
            latestBlockInfoSocket: {...JSON.parse(payload.data)},
          };
        case TOTAL_TYPE.VALIDATOR:
          return {
            ...state,
            validator: JSON.parse(payload.data),
          };
        case TOTAL_TYPE.STAKING_VALIDATOR:
          return {
            ...state,
            stakingValidator: {...JSON.parse(payload.data)},
          };
        case TOTAL_TYPE.COUNT_TPS:
          return {
            ...state,
            countTPS: payload.data,
          };
        case TOTAL_TYPE.TOTAL_TX:
          return {
            ...state,
            totalTx: payload.data,
          };
        case TOTAL_TYPE.CURRENT_TPS:
          return {
            ...state,
            currentTPS: payload.data,
          };
        case TOTAL_TYPE.PEAK_TPS:
          return {
            ...state,
            peakTPS: payload.data,
          };

        case TOTAL_TYPE.VALIDATOR_BLOCK_TIME:
          return {
            ...state,
            validatorBlockTime: payload.data,
          };
      }
      return;
    }

    case types.FETCHING_LATEST_STAKING_VALIDATOR_INFO_SUCCESS:
      return {
        ...state,
        latestStakingValidatorInfo: {...JSON.parse(payload.data)},
      };
    case types.FETCHING_STAKING_VALIDATOR_UPTIME_INFO_SUCCESS:
      return {
        ...state,
        stakingValidatorUptimeInfo: {...JSON.parse(payload.data)},
      };
    case types.FETCHING_STAKING_VALIDATOR_UPTIME_INFO_FILTER: {
      let filterValidator = payload.data;
      filterValidator.result = payload.data.result.filter(str => str.description.moniker.toLowerCase().includes(payload.searchTerm.toLowerCase()));

      return {
        ...state,
        stakingValidatorUptimeInfoFilter: filterValidator
      };

    }

    case types.FETCHING_DELEGATORS:
      return {
        ...state,
        delegators: {},
      };
    case types.FETCHING_DELEGATORS_SUCCESS:
      return {
        ...state,
        delegators: payload,
      };
    case types.FETCHING_DELEGATORS_FAILURE:
      return {
        ...state,
        delegators: {},
      };

    case types.FETCHING_PROPOSED_BLOCKS:
      return {
        ...state,
        proposerBlocks: {},
      };
    case types.FETCHING_PROPOSED_BLOCKS_SUCCESS:
      return {
        ...state,
        proposerBlocks: payload,
      };
    case types.FETCHING_PROPOSED_BLOCKS_FAILURE:
      return {
        ...state,
        proposerBlocks: {},
      };

    case types.FETCHING_VALIDATOR_SET:
      return {
        ...state,
        validatorSet: {},
      };
    case types.FETCHING_VALIDATOR_SET_SUCCESS:
      return {
        ...state,
        validatorSet: payload,
      };
    case types.FETCHING_VALIDATOR_SET_FAILURE:
      return {
        ...state,
        validatorSet: {},
      };

    case types.FETCHING_TOTAL_ADDRESS:
      return {
        ...state,
        totalAddress: payload.data,
      };
    default:
      return state;
  }
};
