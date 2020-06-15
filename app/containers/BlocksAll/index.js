// Core
import React, {PureComponent, Fragment} from 'react';

// Components
import Pagination from 'react-js-pagination';
import {createStructuredSelector} from 'reselect';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import NavigationMenu from '../NavigationMenu';
import Footer from '../Footer';
import {TransactionsContainer, TableContainer, TableTag, HeaderTable, CustomPaging} from './style';
import {selectLatestBlocks, selectLatestTransactionsList} from '../../bus/transactions/selectors';
import {transactionActions} from '../../bus/transactions/actions';
import {ItemContainer, Link, TextSpan, PageTitle} from './style';
import {SvgSpinner} from '../ScanPage/svg';

const mapStateToProps = createStructuredSelector({
  allBlock: selectLatestBlocks(),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchLatestBlocks: transactionActions.fetchLatestBlocks,
    },
    dispatch
  ),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class BlocksAll extends PureComponent {
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
    this.props.actions.fetchLatestBlocks(this.state.page, this.state.perPage);
  };

  handlePageChange(page) {
    page = page >= 10000 ? 10000 : page;
    this.setState({page}, () => {
      this.getData();
    });
  }

  render() {
    const {allBlock} = this.props;
    return (
      <Fragment>
        <NavigationMenu/>

        <TransactionsContainer>

          <PageTitle>
            Blocks
          </PageTitle>

          <TableContainer>

            <TableTag>
              <HeaderTable>
                <tr>
                  <th style={{minWidth: '100px', width: '100px', textAlign: 'center'}}>Height</th>
                  <th style={{minWidth: '100px', width: '100px', textAlign: 'center'}}>Time</th>
                  <th style={{minWidth: '400px', textAlign: 'center'}}>Block Hash</th>
                  <th style={{minWidth: '400px', textAlign: 'center'}}>Proposer Address</th>
                  <th style={{minWidth: '400px', width: '400px', textAlign: 'center'}}>Total TXS</th>
                </tr>
              </HeaderTable>
              <tbody>
              {!!allBlock && !!allBlock.blocks && allBlock.blocks.length > 0 ? (
                allBlock.blocks.map((allBlockItem, i) => (
                  <ItemContainer key={i}>
                    <TextSpan style={{minWidth: '100px', width: '100px', textAlign: 'center'}}>
                      <a href={`/block/${allBlockItem.block.header.height}`}
                         style={{cursor: 'pointer', color: '#7bcc3a'}}>
                        {allBlockItem.block.header.height}
                      </a>
                    </TextSpan>

                    <TextSpan style={{minWidth: '100px', width: '100px'}}>
                      {moment(allBlockItem.block.header.time).format('YYYY-MM-DD HH:mm:ss')}
                    </TextSpan>

                    <TextSpan style={{minWidth: '400px'}}>
                      {allBlockItem.block_meta.block_id.hash}
                    </TextSpan>

                    <TextSpan style={{minWidth: '400px', textAlign: 'center'}}>
                      <Link
                        href={`proposer/${allBlockItem.block.header.proposer_address}/${allBlockItem.block.header.height}`}
                        style={{width: '100%', justifyContent: 'center'}}>
                        {allBlockItem.block.header.proposer_address}
                      </Link>
                    </TextSpan>

                    <TextSpan style={{minWidth: '400px', width: '400px'}}>
                      {allBlockItem.block.header.num_txs}
                    </TextSpan>
                  </ItemContainer>
                ))
              ) : (
                <tr>
                  <td><SvgSpinner/></td>
                </tr>
              )}
              </tbody>
            </TableTag>

          </TableContainer>

          <CustomPaging>
            <Pagination
              activePage={this.state.page}
              itemsCountPerPage={this.state.perPage}
              totalItemsCount={!!allBlock && allBlock.total ? (allBlock.total >= 250000 ? 250000 : allBlock.total) : 0}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange.bind(this)}
            />
          </CustomPaging>

        </TransactionsContainer>

        <Footer/>

      </Fragment>
    );
  }
}
