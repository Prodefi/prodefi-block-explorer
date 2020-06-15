// Core
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import store from 'store';
import { translate } from 'react-i18next';

// Components
import PrettyDetail from './PrettyDetail';
import NavigationMenu from '../NavigationMenu';

// Actions
import { modalActions } from '../../bus/modal/actions';

// Selectors
import { selectAddressInfo } from '../../bus/modal/selectors';

// Styles
import { PreWrapper, Main, Header, NoDataDiv, DetailTab, ActionOption, ActionSelect } from './styles';
import Footer from '../Footer';
import { PageTitle } from '../BlockDetail/styles';
import { SvgSpinner } from '../ScanPage/svg';

const mapStateToProps = createStructuredSelector({
  addressInfo: selectAddressInfo(),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchAddressInfo: modalActions.fetchAddressInfo,
    },
    dispatch
  ),
});

@connect(mapStateToProps, mapDispatchToProps)
@translate()
class AddressDetail extends PureComponent {
  state = {
    tabIndex: 0,
    addressId: this.props.match.params.addressId || '',
    accountViewType: 'raw',
    tableIndex: 0,
  };

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    const yScroll = window.pageYOffset;
    window.scroll(0, yScroll);
  }

  componentWillReceiveProps(newProps) {
    const {addressId, isMounted} = this.state;
    let path = [];
    let newAddressId = addressId;

    if (isMounted) {
      const {action, location} = newProps.history;
      if (action !== 'PUSH') {
        return;
      }
      path = location.pathname.split('/');
      const seek = path.indexOf('transaction');

      if (seek !== -1) {
        newAddressId = path[seek + 1];
        if (newAddressId === addressId) {
          return;
        }
        this.loadData(newAddressId);
      }
    }
  }

  getData = () => {
    const { addressId } = this.state;
    if (addressId) {
      this.props.actions.fetchAddressInfo(addressId);
      this.setState({ currentAccountHistoryPage: 1 });
    }
  };

  loadData = addressId => {
    if (addressId) {
      this.props.actions.fetchAddressInfo(addressId);

      this.setState({ currentAccountHistoryPage: 1 });
      this.setState({ addressId });
      this.props.history.push(`/address/${addressId}`);
    }
  };

  changeDataType = tabIndex => {
    this.setState({ tabIndex });
  };

  render() {
    const { tabIndex } = this.state;

    const { addressInfo } = this.props;

    if (
      (!!addressInfo && addressInfo.name && addressInfo.name === 'Error') ||
      (!!addressInfo.message && addressInfo.message === 'Bad request!...')
    ) {
      return (
        <Fragment>
          <Header>
            <NavigationMenu />
            <PageTitle>Address</PageTitle>
          </Header>
          <Main>
            <NoDataDiv>No data found.</NoDataDiv>
          </Main>
          <Footer />
        </Fragment>
      );
    }
    if (!addressInfo || Object.keys(addressInfo).length === 0) {
      return (
        <Fragment>
          <Header>
            <NavigationMenu />
            <PageTitle>Address</PageTitle>
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
          <PageTitle>Address</PageTitle>
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
          {tabIndex === 0 && <PrettyDetail addressInfo={addressInfo} />}

          {tabIndex === 1 && <PreWrapper>{JSON.stringify(addressInfo, null, 2)}</PreWrapper>}
        </Main>
        <Footer />
      </Fragment>
    );
  }
}

AddressDetail.propTypes = {
  t: PropTypes.func,
  modalDataFetchingState: PropTypes.bool,
  actions: PropTypes.object,
  addressInfo: PropTypes.object,
};

export default withRouter(AddressDetail);
