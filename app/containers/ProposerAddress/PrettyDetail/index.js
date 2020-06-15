import React, {PureComponent} from 'react';
import {Row, Col} from 'reactstrap';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {
  TitleDiv,
  PrettyContainer,
  SummaryContainer,
} from './styles';

class PrettyDetail extends PureComponent {

  render() {
    const {proposerAddress} = this.props;

    return (
      <PrettyContainer>

        <SummaryContainer>

          <Row className='address-pretty-row' style={{margin: 0, display: 'flex', alignItems: 'center'}}>

            <Col xs="12" md="6" style={{padding: 0}}>

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
                  {proposerAddress.operator_address}
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
                  <TitleDiv>Token:</TitleDiv>
                </Col>
                <Col xs="8" style={{padding: 0}}>
                  {proposerAddress.tokens}
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
                  <TitleDiv>Moniker:</TitleDiv>
                </Col>
                <Col xs="8" style={{padding: 0}}>
                  {proposerAddress.description.moniker}
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
                  <TitleDiv>Jailed:</TitleDiv>
                </Col>
                <Col xs="8" style={{padding: 0}}>
                  {proposerAddress.jailed ? 'True' : 'False'}
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
  proposerAddress: PropTypes.object,
  transactions: PropTypes.array,
  history: PropTypes.object,
  loadData: PropTypes.func,
};

export default withRouter(PrettyDetail);
