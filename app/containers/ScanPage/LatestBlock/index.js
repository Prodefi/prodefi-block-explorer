// Core
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';

// Socket
import {createStructuredSelector} from 'reselect';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCubes, faServer} from '@fortawesome/free-solid-svg-icons';
import Link from 'react-router-dom/Link';

// Components
import LatestBlockRow from './LatestBlockRow';

// Utils
import renderEnhancer from '../../../hoc/renderEnhancer';

// Svg
import {SvgPlayPause, SvgSpinner} from '../svg';

// Styles
import {Wrapper, Header, HeaderLeft, HeaderRight} from '../style';
import {DivTag, TableContainer} from './styles';
import {
  selectLatestBlocks, selectNewestBLock,
} from '../../../bus/transactions/selectors';
import {transactionActions} from '../../../bus/transactions/actions';

const mapStateToProps = createStructuredSelector({
  newestBlock: selectNewestBLock(),
  latestBlock: selectLatestBlocks(),
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
@translate()
class LatestBlock extends PureComponent {
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.props.actions.fetchLatestBlocks(1, 10);
    this.setState({currentAccountHistoryPage: 1});
  };

  componentDidUpdate(prevProps) {
    if (!!prevProps.newestBlock && Object.entries(prevProps.newestBlock).length !== 0 &&
      !!this.props.latestBlock && !!this.props.latestBlock.blocks && this.props.latestBlock.blocks.length > 0) {
      if (this.props.latestBlock.blocks[0].block.header.height !== prevProps.newestBlock.block.header.height) {
        this.props.latestBlock.blocks.unshift(prevProps.newestBlock);
        this.props.latestBlock.blocks.pop();
      }
    }
  }

  render() {
    const {toggleModal, latestBlock} = this.props;

    return (
      <Wrapper>
        <Header>
          <HeaderLeft>
            <FontAwesomeIcon icon={faCubes} style={{marginRight: '5px'}}/>
            <span>Latest Block</span>
          </HeaderLeft>
          <HeaderRight>
            <Link to="/blocks" className="header-btn">
              View All
            </Link>
          </HeaderRight>
        </Header>

        <TableContainer>
          {!!latestBlock && !!latestBlock.blocks ? (
            latestBlock.blocks.length > 0 ? (
              <DivTag>
                <div>
                  {latestBlock.blocks.map((tx, i) => (
                    <LatestBlockRow block={tx} key={i} iteration={i} toggleModal={toggleModal}/>
                  ))}
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

LatestBlock.propTypes = {
  t: PropTypes.func,
  blocksList: PropTypes.array,
  transactionsInfo: PropTypes.object,
  latestBlock: PropTypes.any,
  newestBlock: PropTypes.any,
  toggleModal: PropTypes.func,
};

export default renderEnhancer(LatestBlock);
