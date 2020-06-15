// Core
import {combineReducers} from 'redux';

// Reducers
import {uiReducer as ui} from '../bus/ui/reducer';
import {routeReducer as route} from '../bus/route/reducer';
import {producersReducer as producers} from '../bus/producers/reducer';
import {transactionsReducer as transactions} from '../bus/transactions/reducer';
import {modalReducer as modal} from '../bus/modal/reducer';
import {blocksReducer as blocks} from '../bus/blocks/reducer';

export default combineReducers({
  ui,
  route,
  producers,
  transactions,
  modal,
  blocks
});
