// Core
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';

// Socket
import {createStructuredSelector} from 'reselect';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {faServer} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'react-router-dom/Link';

// Components
import LatestTransactionRow from './LatestTransactionRow';

// Utils
import renderEnhancer from '../../../hoc/renderEnhancer';

// Svg
import {SvgSpinner} from '../svg';

// Styles
import {Wrapper, Header, HeaderLeft, HeaderRight} from '../style';
import {DivTag, TableContainer} from './styles';
import {selectLatestTransactionsList, selectNewTransaction} from '../../../bus/transactions/selectors';
import {transactionActions} from '../../../bus/transactions/actions';

const mapStateToProps = createStructuredSelector({
  latestTransaction: selectLatestTransactionsList(),
  newTransaction: selectNewTransaction(),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchLatestTransactions: transactionActions.fetchLatestTransactions,
    },
    dispatch
  ),
});

@connect(mapStateToProps, mapDispatchToProps)
@translate()
class LatestTransaction extends PureComponent {
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.props.actions.fetchLatestTransactions(1, 10);
  };

  componentDidUpdate(prevProps) {
    if (!!prevProps.newTransaction && prevProps.newTransaction.length > 0) {
      this.props.latestTransaction.txs = prevProps.newTransaction;
    }
  }

  render() {
    const {toggleModal, latestTransaction} = this.props;

    return (
      <Wrapper>
        <Header>
          <HeaderLeft>
            <FontAwesomeIcon icon={faServer} style={{marginRight: '5px'}}/>
            <span>Latest Transactions</span>
          </HeaderLeft>
          <HeaderRight>
            <Link to="/transactions" className="header-btn">
              View All
            </Link>
          </HeaderRight>
        </Header>
        <TableContainer>
          {!!latestTransaction && !!latestTransaction.txs ? (
            latestTransaction.txs.length > 0 ? (
              <DivTag>
                <div>
                  {latestTransaction.txs.map((transaction, i) => {
                    if (transaction.tx.value.msg.length > 0) {
                      return (
                        <LatestTransactionRow block={transaction} key={i} iteration={i} toggleModal={toggleModal}/>
                      );
                    }
                  })}
                </div>
              </DivTag>
            ) : (
              <div style={{fontStyle: 'italic'}}>No record(s) found</div>
            )
          ) : (
            <SvgSpinner/>
          )}
        </TableContainer>
      </Wrapper>
    );
  }
}

LatestTransaction.propTypes = {
  t: PropTypes.func,
  blocksList: PropTypes.array,
  transactionsInfo: PropTypes.object,
  latestTransaction: PropTypes.any,
  toggleModal: PropTypes.func,
  history: PropTypes.object,
};

export default renderEnhancer(LatestTransaction);
