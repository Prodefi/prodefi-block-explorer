// Core
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

// Socket
import socket from '../../../init/socket';

// Components
import TransactionRow from './TransactionRow';

// Utils
import renderEnhancer from '../../../hoc/renderEnhancer';

// Svg
import { SvgPlayPause, SvgSpinner } from '../svg';

// Styles
import { Wrapper, Header, HeaderSpan, HeaderTable } from '../style';
import { TableTag, TableContainer } from './styles';

@translate()
class Transactions extends PureComponent {
  state = {
    isTransactionsSocketOn: true,
  };

  toggleTransactionsSocketOn = () =>
    this.setState(
      ({ isTransactionsSocketOn }) => ({ isTransactionsSocketOn: !isTransactionsSocketOn }),
      () => (this.state.isTransactionsSocketOn ? socket.emitTransactionsSocketOn() : socket.emitTransactionsSocketOff())
    );

  toggleAccountInfoModal = e => this.props.toggleModal('accountInfo', e.target.textContent);

  render() {
    const { isTransactionsSocketOn } = this.state;
    const { t, transactionsInfo = {}, toggleModal, transactionsList } = this.props;

    return (
      <Wrapper>
        {/*<Header>*/}
        {/*  <HeaderSpan>{t('i18nFirstSection.i18nTransactions.title')}</HeaderSpan>*/}
        {/*  <SvgPlayPause*/}
        {/*    toggleTransactionsSocketOn={this.toggleTransactionsSocketOn}*/}
        {/*    isTransactionsSocketOn={isTransactionsSocketOn}*/}
        {/*  />*/}
        {/*</Header>*/}
        <TableContainer>
          {transactionsInfo.totalBlockCount ? (
            <TableTag>
              <HeaderTable>
                <tr>
                  <th style={{ textAlign: 'center' }}>ID</th>
                  <th style={{ textAlign: 'center' }}>Block Num</th>
                  <th style={{ textAlign: 'center' }}>Trx Type</th>
                  <th style={{ textAlign: 'center' }}>Trx Owner</th>
                  <th colSpan="3" style={{ textAlign: 'center' }}>
                    Trx Body
                  </th>
                </tr>
              </HeaderTable>
              <tbody>
                {transactionsList.slice(0, 40).map((transaction, i) => (
                  <TransactionRow
                    transaction={transaction}
                    key={transaction.c1 * 100 + i}
                    iteration={i}
                    toggleModal={toggleModal}
                  />
                ))}
              </tbody>
            </TableTag>
          ) : (
            <SvgSpinner />
          )}
        </TableContainer>
      </Wrapper>
    );
  }
}

Transactions.propTypes = {
  t: PropTypes.func,
  transactionsList: PropTypes.array,
  transactionsInfo: PropTypes.object,
  toggleModal: PropTypes.func,
};

export default renderEnhancer(Transactions);
