import { createSelector } from 'reselect';

const selectTransactions = () => ({ transactions }) => transactions;

export const selectTransactionsList = () =>
  createSelector(selectTransactions(), ({ transactionsList }) => transactionsList);

export const selectBlocksList = () => createSelector(selectTransactions(), ({ blocksList }) => blocksList);

export const selectTransactionsInfo = () =>
  createSelector(selectTransactions(), ({ transactionsInfo }) => transactionsInfo);

export const selectLatestTransactionsList = () =>
  createSelector(selectTransactions(), ({ latestTransaction }) => latestTransaction);

export const selectStakingValidator = () =>
  createSelector(selectTransactions(), ({ stakingValidator }) => stakingValidator);

export const selectLatestValidator = () =>
  createSelector(selectTransactions(), ({ latestValidator }) => latestValidator);

export const selectNewTransaction = () => createSelector(selectTransactions(), ({ newTransaction }) => newTransaction);

export const selectLatestBlocks = () => createSelector(selectTransactions(), ({ latestBlocks }) => latestBlocks);

export const selectNewestBLock = () => createSelector(selectTransactions(), ({ newestBLock }) => newestBLock);
