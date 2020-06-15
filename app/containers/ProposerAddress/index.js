// Core
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import PrettyDetail from './PrettyDetail';
import NavigationMenu from '../NavigationMenu';

// Actions
import { modalActions } from '../../bus/modal/actions';

// Selectors
import { selectProposerAddress } from '../../bus/modal/selectors';

// Styles
import { PreWrapper, Main, Header, NoDataDiv, DetailTab } from './styles';
import Footer from '../Footer';
import { PageTitle } from '../BlockDetail/styles';
import { SvgSpinner } from '../ScanPage/svg';

const mapStateToProps = createStructuredSelector({
  proposerAddress: selectProposerAddress(),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchProposerAddress: modalActions.fetchProposerAddress,
    },
    dispatch
  ),
});

@connect(mapStateToProps, mapDispatchToProps)
@translate()
class ProposerAddress extends PureComponent {
  state = {
    tabIndex: 0,
    isMounted: false,
    address: this.props.match.params.address || '',
    height: this.props.match.params.height || '',
    accountViewType: 'raw',
    tableIndex: 0,
  };

  componentDidMount() {
    this.getData();
    this.setState({ isMounted: true });
  }

  componentWillUnmount() {
    const yScroll = window.pageYOffset;
    window.scroll(0, yScroll);
  }

  getData = () => {
    const { address, height } = this.state;
    if (address && address !== '' && height && height !== '') {
      this.props.actions.fetchProposerAddress(address, height);
      this.setState({ currentAccountHistoryPage: 1 });
    }
  };

  changeDataType = tabIndex => {
    this.setState({ tabIndex });
  };

  render() {
    const { tabIndex } = this.state;

    const { proposerAddress } = this.props;

    if (
      (!!proposerAddress && proposerAddress.name && proposerAddress.name === 'Error') ||
      (!!proposerAddress.message && proposerAddress.message === 'Bad request!...')
    ) {
      return (
        <Fragment>
          <Header>
            <NavigationMenu />
            <PageTitle>Proposer Address</PageTitle>
          </Header>
          <Main>
            <NoDataDiv>No data found.</NoDataDiv>
          </Main>
          <Footer />
        </Fragment>
      );
    }

    if (!proposerAddress || Object.keys(proposerAddress).length === 0) {
      return (
        <Fragment>
          <Header>
            <NavigationMenu />
            <PageTitle>Proposer Address</PageTitle>
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
          <PageTitle>Proposer Address</PageTitle>
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
          {tabIndex === 0 && <PrettyDetail proposerAddress={proposerAddress} />}

          {tabIndex === 1 && <PreWrapper>{JSON.stringify(proposerAddress, null, 2)}</PreWrapper>}
        </Main>
        <Footer />
      </Fragment>
    );
  }
}

ProposerAddress.propTypes = {
  t: PropTypes.func,
  modalDataFetchingState: PropTypes.bool,
  actions: PropTypes.object,
  proposerAddress: PropTypes.object,
};

export default withRouter(ProposerAddress);
