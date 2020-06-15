import React, { PureComponent } from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
  TitleDiv,
  PrettyContainer,
  SummaryContainer,
} from './styles';
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
    const {addressInfo} = this.props;

    let balanceDetail = 0;

    if (addressInfo.result.value.coins.length > 0) {
      balanceDetail = addressInfo.result.value.coins.map((coin) => {
        return(
          <div>
            <NumberFormat
              value={this.formatAmount(coin.amount)}
              displayType={'text'}
              thousandSeparator={true}
              suffix={' ' + coin.denom.toUpperCase() }
            />
          </div>
        );
      });
    }

    return (
      <PrettyContainer>

        <SummaryContainer>

          <Row className='address-pretty-row' style={{margin: 0, display: 'flex'}}>

            <Col xs="12" md="6" style={{padding: 0}}>

              <Row className='address-pretty-row'
                   style={{
                     padding: '10px 20px',
                     borderBottom: 'solid .5px rgba(255, 255, 255, .3)',
                     margin: 0,

                   }}
              >
                <Col xs="4" style={{padding: 0}}>
                  <TitleDiv>Type:</TitleDiv>
                </Col>
                <Col xs="8" style={{padding: 0}}>
                  {addressInfo.result.type}
                </Col>
              </Row>
              <Row className='address-pretty-row'
                   style={{
                     padding: '10px 20px',
                     borderBottom: 'solid .5px rgba(255, 255, 255, .3)',
                     margin: 0,
                   }}
              >
                <Col xs="4" style={{padding: 0}}>
                  <TitleDiv>Height:</TitleDiv>
                </Col>
                <Col xs="8" style={{padding: 0}}>
                  {addressInfo.height}
                </Col>
              </Row>
              <Row className='address-pretty-row'
                   style={{
                     padding: '10px 20px',
                     borderBottom: 'solid .5px rgba(255, 255, 255, .3)',
                     margin: 0,
                   }}
              >
                <Col xs="4" style={{padding: 0}}>
                  <TitleDiv>Address:</TitleDiv>
                </Col>
                <Col xs="8" style={{padding: 0}}>
                  {addressInfo.result.value.address}
                </Col>
              </Row>

            </Col>

            <Col xs="12" md="6" style={{padding: 0}}>

              <Row className='address-pretty-row'
                   style={{
                     padding: '10px 20px',
                     borderBottom: 'solid .5px rgba(255, 255, 255, .3)',
                     margin: 0,
                   }}
              >
                <Col xs="4" style={{padding: 0}}>
                  <TitleDiv>Balance:</TitleDiv>
                </Col>
                <Col xs="8" style={{padding: 0}}>
                  {balanceDetail}
                </Col>
              </Row>
              <Row className='address-pretty-row'
                   style={{
                     padding: '10px 20px',
                     borderBottom: 'solid .5px rgba(255, 255, 255, .3)',
                     margin: 0,
                   }}
              >
                <Col xs="4" style={{padding: 0}}>
                  <TitleDiv>Account Number:</TitleDiv>
                </Col>
                <Col xs="8" style={{padding: 0}}>
                  {addressInfo.result.value.account_number}
                </Col>
              </Row>
              <Row className='address-pretty-row'
                   style={{
                     padding: '10px 20px',
                     borderBottom: 'solid .5px rgba(255, 255, 255, .3)',
                     margin: 0,
                   }}
              >
                <Col xs="4" style={{padding: 0}}>
                  <TitleDiv>Sequence:</TitleDiv>
                </Col>
                <Col xs="8" style={{padding: 0}}>
                  {addressInfo.result.value.sequence}
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
  addressInfo: PropTypes.object,
  transactions: PropTypes.array,
  history: PropTypes.object,
  loadData: PropTypes.func,
};

export default withRouter(PrettyDetail);
