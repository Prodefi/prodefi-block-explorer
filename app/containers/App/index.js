// Core
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {I18nextProvider} from 'react-i18next';

// Eslint
/* eslint global-require: 0 */

// Google analytics
import ReactGA from 'react-ga';

// Components
import ScanPage from '../ScanPage';
import BlockDetail from '../BlockDetail';
import TransactionDetail from '../TransactionDetail';
import NotFoundPage from '../NotFoundPage/Loadable';
import AddressDetail from '../AddressDetail';
import ProposerAddress from '../ProposerAddress';
import TransactionsAll from '../TransactionsAll';
import BlocksAll from '../BlocksAll';
import ValidatorAddressAll from '../ValidatorAddressAll';
import Staking from '../Staking';
import StakingValidatorDetail from '../StakingValidatorDetail'
import ValidatorProfile from '../ValidatorProfile'
import ValidatorAll from '../ValidatorAll'
import socket from '../../init/socket';
import i18n from './i18n';

// Selectors
import {selectActualBackgroundNumber} from '../../bus/ui/selectors';

// Styles
import {Wrapper} from './styles';

import './styles.css';

ReactGA.initialize('UA-121311805-2');

const mapStateToProps = createStructuredSelector({
  actualBackgroundNumber: selectActualBackgroundNumber(),
});

@connect(mapStateToProps)
export default class App extends PureComponent {
  componentDidMount() {
    socket.connect();
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    const {actualBackgroundNumber} = this.props;

    return (
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <ThemeProvider
            theme={{
              space: [0, 20, 20, 20, 30],
              breakpoints: ['320px', '768px', '1024px', '1200px'],
            }}
          >
            <Wrapper bgNum={actualBackgroundNumber}>
              <Switch>
                <Route exact path="/" component={ScanPage}/>
                <Route path="/validators" component={ValidatorAll}/>
                <Route path="/block/:blockId" component={BlockDetail}/>
                <Route path="/address/:addressId" component={AddressDetail}/>
                <Route path="/proposer/:address/:height" component={ProposerAddress}/>
                <Route path="/transaction/:trxId" component={TransactionDetail}/>
                <Route path="/transactions" component={TransactionsAll}/>
                <Route path="/blocks" component={BlocksAll}/>
                <Route path="/validators" component={ValidatorAddressAll}/>
                <Route path="/staking" component={Staking}/>
                <Route path="/staking-validator/:address" component={StakingValidatorDetail}/>
                <Route path="/validator-profile/:address/:height" component={ValidatorProfile}/>
                <Route component={NotFoundPage}/>
                <Route path="/404" component={NotFoundPage}/>
              </Switch>
            </Wrapper>
          </ThemeProvider>
        </BrowserRouter>
      </I18nextProvider>
    );
  }
}

App.propTypes = {
  actualBackgroundNumber: PropTypes.number,
};
