// Core
import io from 'socket.io-client';
import throttle from 'lodash/throttle';

// Actions
import {producerActions} from '../bus/producers/actions';
import {transactionActions} from '../bus/transactions/actions';
import {modalActions} from '../bus/modal/actions';

// Constants
import {END_POINT_API, TOTAL_TYPE} from '../constants';

class SocketClient {
  init = ({dispatch, getState}) => {
    this.dispatch = dispatch;
    this.getState = getState;
    this.socket = io(END_POINT_API);

    this.transactions = [];
  };

  connect() {
    this.socket.on('connect', () => {
      console.log('connect socket !!!!');

      this.socket.on('latestBlockInfo', data => {
        this.dispatch(modalActions.fetchTotal(data, TOTAL_TYPE.LATEST_BLOCK_INFO));
      });

      this.socket.on('stakingValidator', data => this.dispatch(modalActions.fetchTotal(data, TOTAL_TYPE.STAKING_VALIDATOR)));

      // fetch newest txs
      this.socket.on('listingLatestTx', data => this.dispatch(transactionActions.transactionsAdd(data)));

      // fetch newest block
      this.socket.on('latestBlock', data => this.dispatch(transactionActions.fetchNewestBlock(data)));

      this.socket.on('stakingValidatorUptimeInfo', data => {
        this.dispatch(modalActions.fetchStakingValidatorUptimeInfo(data))
      });

      this.socket.on('latestStakingValidatorInfo', data => this.dispatch(modalActions.fetchLatestStakingValidatorInfo(data)));

      this.socket.on('totalAddresses', data => this.dispatch(modalActions.fetchTotalAddresses(data)));

    });

    this.socket.on('disconnect', () => {
      console.log('disconnect');
    });
  }
}

export default new SocketClient();
