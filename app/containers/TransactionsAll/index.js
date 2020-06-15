// Core
import React, { PureComponent, Fragment } from 'react';

// Components
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import Pagination from 'react-js-pagination';
import NavigationMenu from '../NavigationMenu';

import Footer from '../Footer';
import { selectLatestTransactionsList } from '../../bus/transactions/selectors';
import { transactionActions } from '../../bus/transactions/actions';
import {
  ItemContainer,
  Link,
  TextSpan,
  PageTitle,
  TransactionsContainer,
  TableContainer,
  TableTag,
  HeaderTable,
  CustomPaging
} from './style';
import { SvgSpinner } from '../ScanPage/svg';
import NumberFormat from "react-number-format";

const RegExp = /^\d+0{6}$/;
const mapStateToProps = createStructuredSelector({
  allTransactions: selectLatestTransactionsList(),
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
export default class TransactionsAll extends PureComponent {
  state = {
    page: 1,
    perPage: 25,
  };

  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      perPage: 25,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.props.actions.fetchLatestTransactions(this.state.page, this.state.perPage);
  };

  handlePageChange(page) {
    page = page >= 10000 ? 10000 : page;
    this.setState({page}, () => {
      this.getData();
    });
  }

  formatAmount = (num) => {
    let result = 0;
    let numToStr = num.toString();
    if (RegExp.test(numToStr)) {
      result = numToStr.replace('000000', '');
      result = parseInt(result);
    } else {
      result = parseFloat(numToStr);
    }
    return result;
  };

  render() {
    const {allTransactions} = this.props;
    return (
      <Fragment>

        <NavigationMenu/>

        <TransactionsContainer>

          <PageTitle>
            Transactions
          </PageTitle>

          <TableContainer>

            <TableTag>
              <HeaderTable>
                <tr>
                  <th style={{minWidth: '100px', width: '100px', maxWidth: '100px', textAlign: 'center'}}>Height</th>
                  <th style={{minWidth: '100px', width: '100px', maxWidth: '100px', textAlign: 'center'}}>Time</th>
                  <th style={{minWidth: '500px', width: '500px', maxWidth: '500px', textAlign: 'center'}}>Tx Hash</th>
                  <th style={{minWidth: '250px', width: '250px', maxWidth: '250px', textAlign: 'center'}}>From /
                    Delegator
                  </th>
                  <th style={{minWidth: '250px', width: '250px', maxWidth: '250px', textAlign: 'center'}}>To /
                    Validator
                  </th>
                  <th style={{minWidth: '100px', width: '100px', maxWidth: '100px', textAlign: 'center'}}>Value</th>
                </tr>
              </HeaderTable>

              <tbody>
              {!!allTransactions && allTransactions.txs && allTransactions.txs.length > 0 ? (
                allTransactions.txs.map((latestTransaction, i) => {
                  if (latestTransaction.tx.value.msg.length > 0) {
                    return latestTransaction.tx.value.msg[0].type === 'cosmos-sdk/MsgSend' ? (
                      <ItemContainer key={i}>
                        <TextSpan style={{minWidth: '100px', width: '100px', textAlign: 'center'}}>
                          {latestTransaction.height}
                        </TextSpan>

                        <TextSpan style={{minWidth: '100px', width: '100px', textAlign: 'center'}}>
                          {moment(latestTransaction.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                        </TextSpan>

                        <TextSpan style={{minWidth: '500px', width: '500px', textAlign: 'left'}}>
                          <Link href={`/transaction/${latestTransaction.txhash}`}>
                            {latestTransaction.txhash}
                          </Link>
                        </TextSpan>

                        <TextSpan style={{minWidth: '250px', width: '250px'}}>
                          <Link href={`/address/${latestTransaction.tx.value.msg[0].value.from_address}`}>
                            {latestTransaction.tx.value.msg[0].value.from_address}
                          </Link>
                        </TextSpan>

                        <TextSpan style={{minWidth: '250px', width: '250px'}}>
                          <Link href={`/address/${latestTransaction.tx.value.msg[0].value.to_address}`}>
                            {latestTransaction.tx.value.msg[0].value.to_address}
                          </Link>
                        </TextSpan>

                        <TextSpan style={{minWidth: '200px', width: '200px'}}>
                            <NumberFormat
                              value={this.formatAmount(latestTransaction.tx.value.msg[0].value.amount[0].amount)}
                              displayType={'text'}
                              thousandSeparator={true}
                              suffix={' ' + latestTransaction.tx.value.msg[0].value.amount[0].denom.toUpperCase()}
                            />

                        </TextSpan>
                      </ItemContainer>
                    ) : latestTransaction.tx.value.msg[0].type === 'cosmos-sdk/MsgCreateValidator' ? (
                      <ItemContainer key={i}>
                        <TextSpan style={{minWidth: '100px', width: '100px', textAlign: 'center'}}>
                          {latestTransaction.height}
                        </TextSpan>

                        <TextSpan style={{minWidth: '100px', width: '100px', textAlign: 'center'}}>
                          {moment(latestTransaction.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                        </TextSpan>

                        <TextSpan style={{minWidth: '500px', width: '500px', textAlign: 'left'}}>
                          <Link href={`/transaction/${latestTransaction.txhash}`}>
                            {latestTransaction.txhash}
                          </Link>
                        </TextSpan>

                        <TextSpan style={{minWidth: '250px', width: '250px'}}>
                          <Link href={`/address/${latestTransaction.tx.value.msg[0].value.delegator_address}`}>
                            {latestTransaction.tx.value.msg[0].value.delegator_address}
                          </Link>
                        </TextSpan>

                        <TextSpan style={{minWidth: '250px', width: '250px'}}>
                          <Link
                            href={`/validator-profile/${latestTransaction.tx.value.msg[0].value.validator_address}`}>
                            {latestTransaction.tx.value.msg[0].value.validator_address}
                          </Link>
                        </TextSpan>

                        <TextSpan style={{minWidth: '200px', width: '200px'}}>
                        
                            <NumberFormat
                              value={this.formatAmount(latestTransaction.tx.value.msg[0].value.value.amount)}
                              displayType={'text'}
                              thousandSeparator={true}
                              suffix={' ' + latestTransaction.tx.value.msg[0].value.value.denom.toUpperCase()}
                            />

                        </TextSpan>
                      </ItemContainer>
                    ) : (latestTransaction.tx.value.msg[0].type === 'crosschain/AddTransaction' ? (
                          <ItemContainer key={i}>
                            <TextSpan style={{minWidth: '100px', width: '100px', textAlign: 'center'}}>
                              {latestTransaction.height}
                            </TextSpan>

                            <TextSpan style={{minWidth: '100px', width: '100px', textAlign: 'center'}}>
                              {moment(latestTransaction.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                            </TextSpan>

                            <TextSpan style={{minWidth: '500px', width: '500px', textAlign: 'left'}}>
                              <Link href={`/transaction/${latestTransaction.txhash}`}>
                                {latestTransaction.txhash}
                              </Link>
                            </TextSpan>

                            <TextSpan style={{minWidth: '250px', width: '250px', textAlign: 'left'}}>
                              <Link herf={`/address/${latestTransaction.tx.value.msg[0].value.submitter}`}>
                                {latestTransaction.tx.value.msg[0].value.submitter}
                              </Link>
                            </TextSpan>

                            <TextSpan style={{minWidth: '250px', width: '250px', textAlign: 'left'}}>

                                <span>
                                  {'Liquidity Pool ' + latestTransaction.tx.value.msg[0].value.transaction.type.charAt(0).toUpperCase() + latestTransaction.tx.value.msg[0].value.transaction.type.slice(1)}
                                </span>

                              <span style={{marginLeft: '5px'}}>
                                  Asset {latestTransaction.tx.value.msg[0].value.address === '0x0' ? (
                                <span style={{marginLeft: '3px', color: '#7bcc3a'}}>Ethereum</span>) : (
                                <span style={{marginLeft: '3px', color: '#7bcc3a'}}>DEFI</span>)}
                                </span>

                            </TextSpan>

                            <TextSpan style={{minWidth: '200px', width: '200px'}}>
                              {`${latestTransaction.tx.value.msg[0].value.transaction.value}`}
                            </TextSpan>

                          </ItemContainer>
                        ) :
                        (<tr>Empty</tr>)
                    );
                  }
                })
              ) : (
                <ItemContainer>
                  <TextSpan style={{
                    minWidth: '100px',
                    width: '100px',
                    maxWidth: '100px',
                    textAlign: 'center'
                  }}><SvgSpinner/></TextSpan>
                </ItemContainer>
              )}
              </tbody>

            </TableTag>

          </TableContainer>

          <CustomPaging>
            <Pagination
              activePage={this.state.page}
              itemsCountPerPage={this.state.perPage}
              totalItemsCount={!!allTransactions && allTransactions.total ? (allTransactions.total >= 250000 ? 250000 : allTransactions.total) : 0}
              pageRangeDisplayed={10}
              onChange={this.handlePageChange.bind(this)}
            />
          </CustomPaging>

        </TransactionsContainer>

        <Footer/>

      </Fragment>
    );
  }
}
