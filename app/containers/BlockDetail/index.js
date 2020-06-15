// Core
import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import store from 'store';
import {translate} from 'react-i18next';
import ReactJson from 'react-json-view';

// Components
import PrettyDetail from './PrettyDetail';
import NavigationMenu from '../NavigationMenu';

// Actions
import {modalActions} from '../../bus/modal/actions';

// Selectors
import {selectBlockInfo} from '../../bus/modal/selectors';
import {selectModalDataFetchingState} from '../../bus/ui/selectors';

// Styles
import {
  PreWrapper,
  Main,
  Header,
  DetailTab,
  NoDataDiv,
  InputsJson,
  ActionSelect,
  ActionOption,
  PageTitle,
} from './styles';
import Footer from '../Footer';
import {SvgSpinner} from '../ScanPage/svg';

const mapStateToProps = createStructuredSelector({
  modalDataFetchingState: selectModalDataFetchingState(),
  blockInfo: selectBlockInfo(),
});

const mapDispatchToProps = dispach => ({
  actions: bindActionCreators(
    {
      fetchBlockInfo: modalActions.fetchBlockInfo,
    },
    dispach
  ),
});

@connect(mapStateToProps, mapDispatchToProps)
@translate()
class BlockDetail extends PureComponent {
  state = {
    isRaw: false,
    isMounted: false,
    blockId: this.props.match.params.blockId || store.get('modal_blockInfo') || 1,
    blockViewType: 'raw',
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
    const {blockId, isMounted} = this.state;
    let path = [];
    let newBlockId = blockId;

    if (isMounted) {
      const {action, location} = newProps.history;
      if (action !== 'PUSH') {
        return;
      }
      path = location.pathname.split('/');
      const seek = path.indexOf('block');

      if (seek !== -1) {
        newBlockId = path[seek + 1];
        if (newBlockId === blockId) {
          return;
        }
        this.loadData(newBlockId);
      }
    }
  }

  getData = () => {
    const {blockId} = this.state;

    const trimBlockId = blockId.replace(/\s/g, '');
    if (blockId) {
      if (!this.props.modalDataFetchingState) this.props.actions.fetchBlockInfo(trimBlockId);
      store.set('modal_blockInfo', trimBlockId);
    }
  };

  loadData = (loadedBlockId) => {
    if (loadedBlockId) {
      let tmp = loadedBlockId.replace(/\s/g, '');
      this.props.actions.fetchBlockInfo(tmp);
      this.setState({blockId: tmp});
      this.props.history.push(`/block/${tmp}`);
    }
  };

  changeDataType = isRaw => {
    this.setState({isRaw});
  };

  selectBlockView(e) {
    this.setState({blockViewType: e.target.value});
  }

  render() {
    const {isRaw, blockViewType} = this.state;
    const {modalDataFetchingState, blockInfo} = this.props;

    if ((!!blockInfo && blockInfo.name && blockInfo.name === 'Error') || (!!blockInfo.message && blockInfo.message === 'Bad request!...')) {
      return (
        <Fragment>
          <Header>
            <NavigationMenu/>
            <PageTitle>Block</PageTitle>
          </Header>
          <Main>
            <NoDataDiv>No data found.</NoDataDiv>
          </Main>
          <Footer/>
        </Fragment>
      );
    }

    if (!blockInfo || Object.keys(blockInfo).length === 0) {
      return (
        <Fragment>
          <Header>
            <NavigationMenu/>
            <PageTitle>Block</PageTitle>
          </Header>
          <Main>
            <SvgSpinner/>
          </Main>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Header>
          <NavigationMenu/>
          <PageTitle>Block</PageTitle>
          <div className="fix-mobile">
            <DetailTab
              onClick={this.changeDataType.bind(this, false)}
              color="#000"
              bg={!isRaw ? '#dedede' : '#fff'}
              style={{minWidth: '120px'}}
            >
              Details
            </DetailTab>
            <DetailTab
              onClick={this.changeDataType.bind(this, true)}
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
              <ActionSelect value={blockViewType} onChange={e => this.selectBlockView(e)}>
                <ActionOption value="json">JSON</ActionOption>
                <ActionOption value="raw">Raw</ActionOption>
              </ActionSelect>
              {blockViewType === 'raw' ? (
                <PreWrapper>{JSON.stringify(blockInfo, null, 2)}</PreWrapper>
              ) : (
                <ReactJson style={{background: 'none', wordBreak: 'break-all'}} theme="twilight" src={blockInfo}/>
              )}
            </InputsJson>
          ) : (
            <PrettyDetail loadData={this.loadData} blockInfo={blockInfo}/>
          ))}
        </Main>
        <Footer/>
      </Fragment>
    );
  }
}

BlockDetail.propTypes = {
  t: PropTypes.func,
  modalDataFetchingState: PropTypes.bool,
  actions: PropTypes.object,
  match: PropTypes.object,
  blockInfo: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(BlockDetail);
