// Core
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import store from 'store';
import { translate } from 'react-i18next';
import PrettyDetail from './PrettyDetail';
import NavigationMenu from '../NavigationMenu';

// Actions
import { modalActions } from '../../bus/modal/actions';

// Selectors
import { selectStakingValidatorAddressInfo } from '../../bus/modal/selectors';

// Styles
import { PreWrapper, Main, Header, NoDataDiv, DetailTab, ActionOption, ActionSelect } from './styles';
import Footer from '../Footer';
import { PageTitle } from '../BlockDetail/styles';
import { SvgSpinner } from '../ScanPage/svg';

const mapStateToProps = createStructuredSelector({
  stakingValidatorAddressInfo: selectStakingValidatorAddressInfo(),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchStakingValidatorAddressInfo: modalActions.fetchStakingValidatorAddressInfo,
    },
    dispatch
  ),
});

@connect(mapStateToProps, mapDispatchToProps)
@translate()
class StakingValidatorDetail extends PureComponent {
  state = {
    tabIndex: 0,
    isMounted: false,
    address: this.props.match.params.address || '',
    accountViewType: 'raw',
    tableIndex: 0,
  };

  componentDidMount() {
    this.getData();
    this.setState({ isMounted: true });
  }

  componentWillReceiveProps(newProps) {
    const { address, isMounted } = this.state;
    let path = [];
    let newAddress = address;

    if (isMounted) {
      const { action, location } = newProps.history;
      if (action !== 'PUSH') {
        return;
      }
      path = location.pathname.split('/');
      const seek = path.indexOf('staking-validator');

      if (seek !== -1) {
        newAddress = path[seek + 1];
        if (newAddress === address) {
          return;
        }
        this.setState({ scope: '', tableIndex: 0, tableLimit: 100 });
        this.props.actions.clearScope();
        this.loadData(newAddress);
      }
    }
  }

  componentWillUnmount() {
    const yScroll = window.pageYOffset;
    window.scroll(0, yScroll);
  }

  getData = () => {
    const { address } = this.state;
    if (address && address !== '') {
      this.props.actions.fetchStakingValidatorAddressInfo(address);
      this.setState({ currentAccountHistoryPage: 1 });
    }
  };

  loadData = address => {
    if (address) {
      this.props.actions.fetchStakingValidatorAddressInfo(address);

      this.setState({ currentAccountHistoryPage: 1 });
      store.set('modal_accountInfo', address);
      this.setState({ address });
      const { history } = this.props;
      history.push(`/address/${address}`);
    }
  };

  changeDataType = tabIndex => {
    this.setState({ tabIndex });
  };

  render() {
    const { tabIndex } = this.state;

    const { stakingValidatorAddressInfo } = this.props;

    if (
      (!!stakingValidatorAddressInfo &&
        stakingValidatorAddressInfo.name &&
        stakingValidatorAddressInfo.name === 'Error') ||
      (!!stakingValidatorAddressInfo.message && stakingValidatorAddressInfo.message === 'Bad request!...')
    ) {
      return (
        <Fragment>
          <Header>
            <NavigationMenu />
            <PageTitle>Validator</PageTitle>
          </Header>
          <Main>
            <NoDataDiv>No data found.</NoDataDiv>
          </Main>
          <Footer />
        </Fragment>
      );
    }

    if (!stakingValidatorAddressInfo || Object.keys(stakingValidatorAddressInfo).length === 0) {
      return (
        <Fragment>
          <Header>
            <NavigationMenu />
            <PageTitle>Validator</PageTitle>
          </Header>
          <Main>
            <SvgSpinner />
          </Main>
          <Footer />
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Header>
          <NavigationMenu />
          <PageTitle>Validator</PageTitle>
          <div className="fix-mobile">
            <DetailTab
              onClick={this.changeDataType.bind(this, 0)}
              color="#000"
              bg={tabIndex === 0 ? '#dedede' : '#fff'}
              style={{ minWidth: '120px' }}
            >
              Details
            </DetailTab>
            <DetailTab
              onClick={this.changeDataType.bind(this, 1)}
              color="#000"
              bg={tabIndex === 1 ? '#dedede' : '#fff'}
              style={{ minWidth: '120px' }}
            >
              Raw
            </DetailTab>
          </div>
        </Header>
        <Main>
          {tabIndex === 0 && <PrettyDetail stakingValidatorAddressInfo={stakingValidatorAddressInfo} />}

          {tabIndex === 1 && <PreWrapper>{JSON.stringify(stakingValidatorAddressInfo, null, 2)}</PreWrapper>}
        </Main>
        <Footer />
      </Fragment>
    );
  }
}

StakingValidatorDetail.propTypes = {
  t: PropTypes.func,
  modalDataFetchingState: PropTypes.bool,
  actions: PropTypes.object,
  stakingValidatorAddressInfo: PropTypes.object,
  match: PropTypes.any,
};

export default withRouter(StakingValidatorDetail);
