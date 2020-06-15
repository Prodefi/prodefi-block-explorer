import {createSelector} from 'reselect';

// selector
const selectBlock = () => ({blocks}) => blocks;

// reselect function
export const selectLatestBlocks = () => createSelector(selectBlock(), ({latestBlocks}) => latestBlocks);
