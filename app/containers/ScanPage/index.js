// Core
import React, {PureComponent, Fragment} from 'react';

// Components
import {Col, Row} from 'reactstrap';
import NavigationMenu from '../NavigationMenu';
import LatestTransaction from './LatestTransaction';
import LatestBlock from './LatestBlock';
import Footer from '../Footer';
import {ScanContainer, Spacing, TotalAndChar} from './style';
import Chart from '../Chart';
import TotalGroup from '../TotalGroup';

export default class ScanPage extends PureComponent {
  getData = () => {
    this.setState({currentAccountHistoryPage: 1});
  };

  render() {
    return (
      <Fragment>

        <NavigationMenu/>

        <TotalAndChar>
          <Row style={{margin: 0, display: 'flex'}}>
            <Col xs="12" sm="6" className="custom-padding-left">
              <TotalGroup/>
            </Col>

            <Col xs="12" sm="6" className="custom-padding-right">
              <Chart/>
            </Col>
          </Row>
        </TotalAndChar>

        <ScanContainer>
          <Row style={{margin: 0, display: 'flex'}}>
            <Col xs="12" sm="6" className="fix-bug-tablet">
              <LatestBlock/>
            </Col>

            <Col xs="12" sm="6" className="fix-bug-tablet">
              <LatestTransaction/>
            </Col>
          </Row>
        </ScanContainer>

        <Footer/>

      </Fragment>
    );
  }
}
