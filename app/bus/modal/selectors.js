import {createSelector} from 'reselect';

const selectModal = () => ({modal}) => modal;

export const selectAccountInfo = () => createSelector(selectModal(), ({accountInfo}) => accountInfo);

export const selectAddressInfo = () => createSelector(selectModal(), ({addressInfo}) => addressInfo);

export const selectStakingValidatorAddressInfo = () => createSelector(selectModal(), ({stakingValidatorAddressInfo}) => stakingValidatorAddressInfo);

export const selectProposerAddress = () => createSelector(selectModal(), ({proposerAddress}) => proposerAddress);

export const selectABIInfo = () => createSelector(selectModal(), ({abiInfo}) => abiInfo);

export const selectAccountHistory = () => createSelector(selectModal(), ({accountHistory}) => accountHistory);

export const selectTableData = () => createSelector(selectModal(), ({tableData}) => tableData);

export const selectAbiJsonData = () => createSelector(selectModal(), ({transactionData}) => transactionData);

export const selectScopes = () => createSelector(selectModal(), ({scopes}) => scopes);

export const selectBlockInfo = () => createSelector(selectModal(), ({blockInfo}) => blockInfo);

export const selectTxIdInfo = () => createSelector(selectModal(), ({txInfo}) => txInfo);

export const selectP2PAddresses = () => createSelector(selectModal(), ({p2pAddresses}) => p2pAddresses);

export const selectBpJson = () => createSelector(selectModal(), ({bpJson}) => bpJson);

export const selectRamPrice = () => createSelector(selectModal(), ({ramPrice}) => ramPrice);

export const selectEosApiData = () => createSelector(selectModal(), ({eosApiData}) => eosApiData);

export const selectTotal = () => createSelector(selectModal(), ({total}) => total);

export const selectLatestBlockInfoSocket = () => createSelector(selectModal(), ({latestBlockInfoSocket}) => latestBlockInfoSocket);

export const selectTotalAddress = () => createSelector(selectModal(), ({totalAddress}) => totalAddress);

export const selectStakingValidator = () => createSelector(selectModal(), ({stakingValidator}) => stakingValidator);

export const selectLatestStakingValidatorInfo = () => createSelector(selectModal(), ({latestStakingValidatorInfo}) => latestStakingValidatorInfo);

export const selectStakingValidatorUptimeInfoFilter = () => createSelector(selectModal(), ({stakingValidatorUptimeInfoFilter}) => stakingValidatorUptimeInfoFilter);

export const selectStakingValidatorUptimeInfo = () => createSelector(selectModal(), ({stakingValidatorUptimeInfo}) => stakingValidatorUptimeInfo);

export const selectDelegators = () => createSelector(selectModal(), ({delegators}) => delegators);

export const selectProposerBlocks = () => createSelector(selectModal(), ({proposerBlocks}) => proposerBlocks);

export const selectValidatorSet = () => createSelector(selectModal(), ({validatorSet}) => validatorSet);
