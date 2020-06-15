import React, { PureComponent } from 'react';
import { Row, Col, Badge } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  TitleDiv,
  PrettyContainer,
  SummaryContainer,
} from './styles';
import { Link } from '../../ScanPage/LatestBlock/LatestBlockRow/styles';
import NumberFormat from "react-number-format";

const RegExp = /^\d+0{6}$/;

class PrettyDetail extends PureComponent {

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
    const {transactionInfo} = this.props; // receipt

    return (
      <PrettyContainer>
        <SummaryContainer>
          <Row
            style={{
              margin: 0,
              background: '#fff',
              color: '#000',
            }}
          >
            <Col xs="12" sm="6" style={{padding: 0}}>
              <Row
                style={{
                  padding: '10px 20px',
                  borderBottom: 'solid .5px rgba(255, 255, 255, .5)',
                  margin: 0,
                  background: '#fff',
                  color: '#000',
                }}
              >
                <Col xs="12" sm="6" style={{padding: 0, fontWeight: 700}}>
                  Height:
                </Col>

                <Col xs="12" sm="6" style={{padding: 0}}>
                  <Link href={`/block/${transactionInfo.height}`}>
                    <Badge style={{cursor: 'pointer'}} color="secondary">
                      {transactionInfo.height}
                    </Badge>
                  </Link>
                </Col>
              </Row>
              <Row
                style={{
                  padding: '10px 20px',
                  borderBottom: 'solid .5px rgba(255, 255, 255, .5)',
                  margin: 0,
                  background: '#fff',
                  color: '#000',
                }}
              >
                <Col xs="12" sm="6" style={{padding: 0}}>
                  <TitleDiv>Time:</TitleDiv>
                </Col>
                <Col xs="12" sm="6" style={{padding: 0}}>
                  {moment(transactionInfo.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                </Col>
              </Row>
              <Row
                style={{
                  padding: '10px 20px',
                  borderBottom: 'solid .5px rgba(255, 255, 255, .5)',
                  margin: 0,
                  background: '#fff',
                  color: '#000',
                }}
              >
                <Col xs="12" sm="6" style={{padding: 0}}>
                  <TitleDiv>Hash:</TitleDiv>
                </Col>
                <Col xs="12" sm="6" style={{padding: 0}}>
                  {transactionInfo.txhash}
                </Col>
              </Row>
              <Row
                style={{
                  padding: '10px 20px',
                  borderBottom: 'solid .5px rgba(255, 255, 255, .5)',
                  margin: 0,
                  background: '#fff',
                  color: '#000',
                }}
              >
                <Col xs="12" sm="6" style={{padding: 0}}>
                  <TitleDiv>Memo:</TitleDiv>
                </Col>
                <Col xs="12" sm="6" style={{padding: 0}}>
                  {transactionInfo.tx.value.memo !== '' ? transactionInfo.tx.value.memo : 'N/A'}
                </Col>
              </Row>
              <Row
                style={{
                  padding: '10px 20px',
                  borderBottom: 'solid .5px rgba(255, 255, 255, .5)',
                  margin: 0,
                  background: '#fff',
                  color: '#000',
                }}
              >
                <Col xs="12" sm="6" style={{padding: 0}}>
                  <TitleDiv>Time:</TitleDiv>
                </Col>
                <Col xs="12" sm="6" style={{padding: 0}}>
                  {moment(transactionInfo.timestamp).format('MM-DD-YYYY HH:mm:ss')}
                </Col>
              </Row>
            </Col>

            <Col xs="12" sm="6" style={{padding: 0}}>
              <Row
                style={{
                  padding: '10px 20px',
                  borderBottom: 'solid .5px rgba(255, 255, 255, .5)',
                  margin: 0,
                  background: '#fff',
                  color: '#000',
                }}
              >
                <Col xs="12" style={{padding: 0, fontWeight: 700}}>
                  Additional Information
                </Col>
              </Row>

              {transactionInfo.tx.value.msg[0].type === 'cosmos-sdk/MsgSend' ? (
                <div>
                  <Row
                    style={{
                      padding: '10px 20px',
                      borderBottom: 'solid .5px rgba(255, 255, 255, .5)',
                      margin: 0,
                      background: '#fff',
                    }}
                  >
                    <Col xs="12" sm="6" style={{padding: 0}}>
                      <TitleDiv>From:</TitleDiv>
                    </Col>
                    <Col xs="12" sm="6" style={{padding: 0, color: 'rgb(123, 204, 58)'}}>
                      <Link href={`/address/${transactionInfo.tx.value.msg[0].value.from_address}`}
                            style={{color: 'rgb(123, 204, 58)'}}>
                        {transactionInfo.tx.value.msg[0].value.from_address}
                      </Link>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      padding: '10px 20px',
                      borderBottom: 'solid .5px rgba(255, 255, 255, .5)',
                      margin: 0,
                      background: '#fff',
                      color: '#000',
                    }}
                  >
                    <Col xs="12" sm="6" style={{padding: 0}}>
                      <TitleDiv>To:</TitleDiv>
                    </Col>
                    <Col xs="12" sm="6" style={{padding: 0}}>
                      <Link
                        href={`/address/${transactionInfo.tx.value.msg[0].value.to_address}`}
                        style={{color: 'rgb(123, 204, 58)'}}>
                        {transactionInfo.tx.value.msg[0].value.to_address}
                      </Link>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      padding: '10px 20px',
                      borderBottom: 'solid .5px rgba(255, 255, 255, .5)',
                      margin: 0,
                      background: '#fff',
                      color: '#000',
                    }}
                  >
                    <Col xs="12" sm="6" style={{padding: 0}}>
                      <TitleDiv>Amount:</TitleDiv>
                    </Col>
                    <Col xs="12" sm="6" style={{padding: 0}}>
                        <NumberFormat
                          value={this.formatAmount(transactionInfo.tx.value.msg[0].value.amount[0].amount)}
                          displayType={'text'}
                          thousandSeparator={true}
                          suffix={' ' + transactionInfo.tx.value.msg[0].value.amount[0].denom.toUpperCase()}
                        />
                    </Col>
                  </Row>
                  <Row
                    style={{
                      padding: '10px 20px',
                      borderBottom: 'solid .5px rgba(255, 255, 255, .5)',
                      margin: 0,
                      background: '#fff',
                      color: '#000',
                    }}
                  >
                    <Col xs="12" sm="6" style={{padding: 0}}>
                      <TitleDiv>Fee:</TitleDiv>
                    </Col>
                    <Col xs="12" sm="6" style={{padding: 0}}>
                      {transactionInfo.tx.value.fee.amount.length > 0
                        ? (
                          <NumberFormat
                            value={this.formatAmount(transactionInfo.tx.value.fee.amount[0].amount)}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={' ' + transactionInfo.tx.value.fee.amount[0].denom.toUpperCase()}
                          />
                        )
                        : 0
                      }
                    </Col>
                  </Row>
                </div>
              ) : transactionInfo.tx.value.msg[0].type === 'crosschain/AddTransaction' ? (
                <div>
                  <Row
                    style={{
                      padding: '10px 20px',
                      borderBottom: 'solid .5px rgba(255, 255, 255, .5)',
                      margin: 0,
                      background: '#fff',
                      color: '#000',
                    }}
                  >
                    <Col xs="12" sm="6" style={{padding: 0}}>
                      <TitleDiv>Hash:</TitleDiv>
                    </Col>
                    <Col xs="12" sm="6" style={{padding: 0}}>
                      {transactionInfo.tx.value.msg[0].value.transaction.hash}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      padding: '10px 20px',
                      borderBottom: 'solid .5px rgba(255, 255, 255, .5)',
                      margin: 0,
                      background: '#fff',
                      color: '#000',
                    }}
                  >
                    <Col xs="12" sm="6" style={{padding: 0}}>
                      <TitleDiv>
                        {transactionInfo.tx.value.msg[0].value.transaction.type.charAt(0).toUpperCase() +
                        transactionInfo.tx.value.msg[0].value.transaction.type.slice(1)}
                      </TitleDiv>
                    </Col>
                    <Col xs="12" sm="6" style={{padding: 0}}>
                      {transactionInfo.tx.value.msg[0].value.address === '0x0' ? (
                        <span style={{marginLeft: '3px', color: '#7bcc3a'}}>Ethereum</span>
                      ) : (
                        <span style={{marginLeft: '3px', color: '#7bcc3a'}}>DEFI</span>
                      )}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      padding: '10px 20px',
                      borderBottom: 'solid .5px rgba(255, 255, 255, .5)',
                      margin: 0,
                      background: '#fff',
                      color: '#000',
                    }}
                  >
                    <Col xs="12" sm="6" style={{padding: 0}}>
                      <TitleDiv>From:</TitleDiv>
                    </Col>
                    <Col xs="12" sm="6" style={{padding: 0}}>
                      {transactionInfo.tx.value.msg[0].value.transaction.from_address}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      padding: '10px 20px',
                      borderBottom: 'solid .5px rgba(255, 255, 255, .5)',
                      margin: 0,
                      background: '#fff',
                      color: '#000',
                    }}
                  >
                    <Col xs="12" sm="6" style={{padding: 0}}>
                      <TitleDiv>To:</TitleDiv>
                    </Col>
                    <Col xs="12" sm="6" style={{padding: 0}}>
                      {transactionInfo.tx.value.msg[0].value.transaction.to_address}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      padding: '10px 20px',
                      borderBottom: 'solid .5px rgba(255, 255, 255, .5)',
                      margin: 0,
                      background: '#fff',
                      color: '#000',
                    }}
                  >
                    <Col xs="12" sm="6" style={{padding: 0}}>
                      <TitleDiv>Amount:</TitleDiv>
                    </Col>
                    <Col xs="12" sm="6" style={{padding: 0}}>
                      {transactionInfo.tx.value.msg[0].value.transaction.value}
                    </Col>
                  </Row>
                </div>
              ) : (
                <div>
                  <Row
                    style={{
                      padding: '10px 20px',
                      borderBottom: 'solid .5px rgba(255, 255, 255, .5)',
                      margin: 0,
                      background: '#fff',
                      color: '#000',
                    }}
                  >
                    <Col xs="12" sm="6" style={{padding: 0}}>
                      <TitleDiv>Delegator:</TitleDiv>
                    </Col>
                    <Col xs="12" sm="6" style={{padding: 0}}>
                      <Link
                        href={`/address/${transactionInfo.tx.value.msg[0].value.delegator_address}`}
                        style={{color: 'rgb(123, 204, 58)'}}>
                        {transactionInfo.tx.value.msg[0].value.delegator_address}
                      </Link>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      padding: '10px 20px',
                      borderBottom: 'solid .5px rgba(255, 255, 255, .5)',
                      margin: 0,
                      background: '#fff',
                      color: '#000',
                    }}
                  >
                    <Col xs="12" sm="6" style={{padding: 0}}>
                      <TitleDiv>Validator:</TitleDiv>
                    </Col>
                    <Col xs="12" sm="6" style={{padding: 0}}>
                      <Link
                        href={`/validator-profile/${transactionInfo.tx.value.msg[0].value.validator_address}`}
                        style={{color: 'rgb(123, 204, 58)'}}>
                        {transactionInfo.tx.value.msg[0].value.validator_address}
                      </Link>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      padding: '10px 20px',
                      borderBottom: 'solid .5px rgba(255, 255, 255, .5)',
                      margin: 0,
                      background: '#fff',
                      color: '#000',
                    }}
                  >
                    <Col xs="12" sm="6" style={{padding: 0}}>
                      <TitleDiv>Amount:</TitleDiv>
                    </Col>
                    <Col xs="12" sm="6" style={{padding: 0}}>

                        <NumberFormat
                          value={this.formatAmount(transactionInfo.tx.value.msg[0].value.value.amount)}
                          displayType={'text'}
                          thousandSeparator={true}
                          suffix={' ' + transactionInfo.tx.value.msg[0].value.value.denom.toUpperCase()}
                        />
                      

                    </Col>
                  </Row>
                </div>
              )}

              <Row
                style={{
                  padding: '10px 20px',
                  borderBottom: 'solid .5px rgba(255, 255, 255, .5)',
                  margin: 0,
                  background: '#fff',
                  color: '#000',
                }}
              >
                <Col xs="12" sm="6" style={{padding: 0}}>
                  <TitleDiv>Gas:</TitleDiv>
                </Col>
                <Col xs="12" sm="6" style={{padding: 0}}>
                  {transactionInfo.gas_used}
                </Col>
              </Row>
            </Col>
          </Row>
        </SummaryContainer>
      </PrettyContainer>
    );
  }
}

PrettyDetail.propTypes = {
  transactionInfo: PropTypes.object,
  actions: PropTypes.array,
  history: PropTypes.object,
};

export default withRouter(PrettyDetail);
