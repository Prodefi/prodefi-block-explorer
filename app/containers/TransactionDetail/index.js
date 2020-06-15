// Core
import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createStructuredSelector} from 'reselect';
import store from 'store';
import {translate} from 'react-i18next';
import ReactJson from 'react-json-view';

// Components
import LoadingLine from '../../components/LoadingLine';
import PrettyDetail from './PrettyDetail';
import NavigationMenu from '../NavigationMenu';

// Selectors
import {selectTxIdInfo} from '../../bus/modal/selectors';
import {selectModalDataFetchingState} from '../../bus/ui/selectors';

// Actions
import {uiActions} from '../../bus/ui/actions';
import {modalActions} from '../../bus/modal/actions';

// Styles
import {Header, Main, PreWrapper, InputsJson, NoDataDiv, DetailTab, ActionSelect, ActionOption} from './styles';
import {selectLatestBlocks} from '../../bus/transactions/selectors';
import {transactionActions} from '../../bus/transactions/actions';
import Footer from '../Footer';
import {PageTitle} from '../BlockDetail/styles';
import {SvgSpinner} from '../ScanPage/svg';

const mapStateToProps = createStructuredSelector({
  modalDataFetchingState: selectModalDataFetchingState(),
  txIdData: selectTxIdInfo(),
  latestBlocks: selectLatestBlocks(),
});

const mapDispatchToProps = dispach => ({
  actions: bindActionCreators(
    {
      fetchTxInfo: modalActions.fetchTxInfo,
      toggleModal: uiActions.toggleModal,
      fetchLatestBlock: transactionActions.fetchLatestBlocks,
    },
    dispach
  ),
});

@connect(mapStateToProps, mapDispatchToProps)
@translate()
export default class TransactionDetail extends PureComponent {
  state = {
    isRaw: false,
    isMounted: false,
    transactionViewType: 'raw',
    txId:
      this.props.match.params.trxId ||
      store.get('modal_transactions') ||
      'd2e6534863e189af233e65306489edde3973cbca1fe32c6eab08e66eb5e609c0',
  };

  componentDidMount() {
    this.getData();
    this.setState({isMounted: true});
  }

  componentWillUnmount() {
    const yScroll = window.pageYOffset;
    window.scroll(0, yScroll);
  }

  componentWillReceiveProps(newProps) {
    const {txId, isMounted} = this.state;
    let path = [];
    let newTxId = txId;

    if (isMounted) {
      const {action, location} = newProps.history;
      if (action !== 'PUSH') {
        return;
      }
      path = location.pathname.split('/');
      const seek = path.indexOf('transaction');

      if (seek !== -1) {
        newTxId = path[seek + 1];
        if (newTxId === txId) {
          return;
        }
        this.loadData(newTxId);
      }
    }
  }

  changeDataType = dataType => e => {
    const isRaw = dataType === 'Raw';
    this.setState({isRaw});
  };

  getData = () => {
    const {txId} = this.state;
    if (txId) {
      let trxId = txId;
      if (trxId.substring(0, 2) === '0x' && txId.length > 64) {
        trxId = trxId.substring(2);
      }
      if (!this.props.modalDataFetchingState) this.props.actions.fetchTxInfo(trxId);
      store.set('modal_transactions', txId);
    }
  };

  loadData = (newTxId) => {
    if (newTxId) {
      let trxId = newTxId;
      if (trxId.substring(0, 2) === '0x' && newTxId.length > 64) {
        trxId = trxId.substring(2);
      }
      this.props.actions.fetchTxInfo(trxId);
      this.setState({txId: trxId});
      this.props.history.push(`/transaction/${trxId}`);
    }
  };

  selectActionView(e) {
    this.setState({transactionViewType: e.target.value});
  }

  render() {
    const {isRaw, transactionViewType} = this.state;
    const {modalDataFetchingState, txIdData} = this.props;

    if (!txIdData || Object.keys(txIdData).length === 0) {
      return (
        <Fragment>
          <Header>
            <NavigationMenu/>
            <PageTitle>Transaction</PageTitle>
          </Header>
          <Main>
            <SvgSpinner/>
          </Main>
          <Footer/>
        </Fragment>
      );
    }

    if (
      (!!txIdData.name && txIdData.name === 'Error') ||
      (!!txIdData.message && txIdData.message === 'Bad request!...')
    ) {
      return (
        <Fragment>
          <Header>
            <NavigationMenu/>
            <PageTitle>Transaction</PageTitle>
          </Header>
          <LoadingLine state={modalDataFetchingState}/>
          <Main>
            <NoDataDiv>No data found</NoDataDiv>
          </Main>
          <Footer/>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Header>
          <NavigationMenu/>
          <PageTitle>Transaction</PageTitle>
          <div className="fix-mobile">
            <DetailTab
              onClick={this.changeDataType('Pretty')}
              color="#000"
              bg={!isRaw ? '#dedede' : '#fff'}
              style={{minWidth: '120px'}}
              // disabled={!txIdData.trx}
            >
              Details
            </DetailTab>

            <DetailTab
              onClick={this.changeDataType('Raw')}
              color="#000"
              bg={!isRaw ? '#fff' : '#dedede'}
              style={{minWidth: '120px'}}
            >
              Raw
            </DetailTab>
          </div>
        </Header>

        <Main>
          {!modalDataFetchingState &&
          (isRaw ? (
            <InputsJson>
              <ActionSelect value={transactionViewType} onChange={e => this.selectActionView(e)}>
                <ActionOption value="json">JSON</ActionOption>
                <ActionOption value="raw">Raw</ActionOption>
              </ActionSelect>
              {transactionViewType === 'raw' ? (
                <PreWrapper>{JSON.stringify(txIdData, null, 2)}</PreWrapper>
              ) : (
                <ReactJson style={{background: 'none', wordBreak: 'break-all'}} theme="twilight" src={txIdData}/>
              )}
            </InputsJson>
          ) : (
            <PrettyDetail transactionInfo={txIdData}/>
          ))}
        </Main>

        <Footer/>
      </Fragment>
    );
  }
}

TransactionDetail.propTypes = {
  modalDataFetchingState: PropTypes.bool,
  txIdData: PropTypes.object,
  latestBlocks: PropTypes.any,
  actions: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
};
