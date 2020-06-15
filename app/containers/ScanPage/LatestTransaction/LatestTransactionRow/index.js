// Core
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

// Utils
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faBars } from '@fortawesome/free-solid-svg-icons';

// Styles
import { Row, Col } from 'reactstrap';
import { Link, ItemContainer, TextSpan } from './styles';
import StringMiddleTruncate from "../../../../components/StringMiddleTruncate";
import PrettyNumber from "../../../../components/PrettyNumber";

const RegExp = /^\d+0{6}$/;

class LatestTransactionRow extends PureComponent {

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
    const {block, iteration} = this.props;
    return (
      <ItemContainer iteration={iteration}>
        <Row>

          <Col xs="12" sm="12" md="6" xl="4" className='custom-mobile'>
            <TextSpan className="text-span-icon">
              <FontAwesomeIcon icon={faBars} style={{cursor: 'pointer', marginRight: '5px'}}/>
              <Link href={`/transaction/${block.txhash}`} className="link-long-address">
                <StringMiddleTruncate text={block.txhash}/>
              </Link>
            </TextSpan>
            <TextSpan style={{color: '#717171'}}>{moment(block.timestamp).format("YYYY-MM-DD HH:mm:ss")}</TextSpan>
          </Col>

          <Col xs="12" sm="12" md="6" xl="5">
            {block.tx.value.msg[0].type === 'cosmos-sdk/MsgSend' ? (
              <div className="delegator-address">
                <div>
                  <span style={{color: '#000'}}>From</span>
                  <Link href={`/address/${block.tx.value.msg[0].value.from_address}`}>
                    <StringMiddleTruncate text={block.tx.value.msg[0].value.from_address}/>
                  </Link>
                </div>

                <div>
                  <span style={{color: '#000'}}>To</span>
                  <Link href={`/address/${block.tx.value.msg[0].value.to_address}`}>
                    <StringMiddleTruncate text={block.tx.value.msg[0].value.to_address}/>
                  </Link>
                </div>
              </div>
            ) : block.tx.value.msg[0].type === 'cosmos-sdk/MsgCreateValidator' ? (
              <div className="delegator-address">
                <div>
                  <span style={{color: '#000', minWidth: '66px'}}>Delegator</span>
                  <Link href={`/address/${block.tx.value.msg[0].value.delegator_address}`}>
                    <StringMiddleTruncate text={block.tx.value.msg[0].value.delegator_address}/>
                  </Link>
                </div>

                <div>
                  <span style={{color: '#000', minWidth: '66px'}}>Validator</span>
                  <Link href={`/validator-profile/${block.tx.value.msg[0].value.validator_address}`}>
                    <StringMiddleTruncate text={block.tx.value.msg[0].value.validator_address}/>
                  </Link>
                </div>
              </div>
            ) : block.tx.value.msg[0].type === 'crosschain/AddTransaction' ? (
              <div className="delegator-address">
                <div>
                  {'Liquidity Pool ' + block.tx.value.msg[0].value.transaction.type.charAt(0).toUpperCase() + block.tx.value.msg[0].value.transaction.type.slice(1)}
                </div>

                <div>
                  Asset {block.tx.value.msg[0].value.address === '0x0' ? (
                  <span style={{marginLeft: '3px', color: '#7bcc3a'}}>Ethereum</span>) : (
                  <span style={{marginLeft: '3px', color: '#7bcc3a'}}>DEFI</span>)}
                </div>
              </div>
            ) : (
              <div>Empty</div>
            )}
          </Col>

          <Col xs="12" sm="12" md="12" xl="3">
            {block.tx.value.msg[0].type === 'cosmos-sdk/MsgSend' ? (
              <div className="custom-value-tx">
                <span style={{color: '#77838f', marginRight: '3px'}}>
                    <PrettyNumber num={this.formatAmount(block.tx.value.msg[0].value.amount[0].amount)}/>
                </span>
                <span style={{color: '#77838f'}}>{block.tx.value.msg[0].value.amount[0].denom.toUpperCase()}</span>
              </div>
            ) : block.tx.value.msg[0].type === 'cosmos-sdk/MsgCreateValidator' ? (
              <div className="custom-value-tx">
                <span style={{color: '#77838f', marginRight: '3px'}}>

                    <PrettyNumber num={this.formatAmount(block.tx.value.msg[0].value.value.amount)}/>

                </span>
                <span style={{color: '#77838f'}}>{block.tx.value.msg[0].value.value.denom.toUpperCase()}</span>
              </div>
            ) : block.tx.value.msg[0].type === 'crosschain/AddTransaction' ? (
              <div className="custom-value-tx">
                <span style={{color: '#77838f', marginRight: '3px'}}>
                    <PrettyNumber num={this.formatAmount(block.tx.value.msg[0].value.transaction.value)}/>

                </span>
                <span style={{color: '#77838f'}}>{block.tx.value.msg[0].value.transaction.denom.toUpperCase()}</span>
              </div>
            ) : (
              <div>Empty</div>
            )}
          </Col>

        </Row>
      </ItemContainer>
    );
  }
}

LatestTransactionRow.propTypes = {
  block: PropTypes.object,
  toggleModal: PropTypes.func,
  iteration: PropTypes.number,
  history: PropTypes.object,
};

export default withRouter(LatestTransactionRow);
