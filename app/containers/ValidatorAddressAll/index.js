// Core
import React, { PureComponent, Fragment } from 'react';

// Components
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import NavigationMenu from '../NavigationMenu';

import Footer from '../Footer';
import { selectLatestValidator } from '../../bus/transactions/selectors';
import { transactionActions } from '../../bus/transactions/actions';
import { Header, Main, DetailTab, PrettyContainer, SummaryContainer, TitleDiv, PreWrapper } from './style';

import { SvgSpinner } from '../ScanPage/svg';
import { Link } from '../TransactionsAll/style';

const mapStateToProps = createStructuredSelector({
  latestValidator: selectLatestValidator(),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchLatestValidator: transactionActions.fetchLatestValidators,
    },
    dispatch
  ),
});

@connect(mapStateToProps, mapDispatchToProps)
class ValidatorAddressAll extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isRaw: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.props.actions.fetchLatestValidator();
  };

  toggleAddressInfo = address => e => {
    const { history } = this.props;
    history.push(`/address/${address}`);
  };

  changeDataType = dataType => e => {
    const isRaw = dataType === 'Raw';
    this.setState({ isRaw });
  };

  render() {
    const { latestValidator } = this.props;
    const { isRaw } = this.state;

    const totalVoting =
      !!latestValidator && Object.entries(latestValidator).length !== 0
        ? latestValidator.result.validators.reduce((total, va) => total + parseInt(va.voting_power, 10), 0)
        : 0;

    return (
      <Fragment>
        <NavigationMenu />
        <Header>
          <div style={{ margin: '0 15px', background: 'rgb(255, 255, 255)' }}>
            <DetailTab
              onClick={this.changeDataType('Pretty')}
              color="#000"
              bg={!isRaw ? '#dedede' : '#fff'}
              style={{ minWidth: '120px' }}
            >
              Details
            </DetailTab>

            <DetailTab
              onClick={this.changeDataType('Raw')}
              color="#000"
              bg={!isRaw ? '#fff' : '#dedede'}
              style={{ minWidth: '120px' }}
            >
              Raw
            </DetailTab>
          </div>
        </Header>

        {!!latestValidator && Object.entries(latestValidator).length !== 0 ? (
          <Main>
            {isRaw ? (
              <PreWrapper>{JSON.stringify(latestValidator, null, 2)}</PreWrapper>
            ) : (
              <PrettyContainer>
                <SummaryContainer>
                  <Row
                    style={{
                      margin: 0,
                      background: '#fff',
                      color: '#000',
                    }}
                  >
                    <Col xs="12" sm="12" style={{ padding: 0 }}>
                      <Row
                        style={{
                          padding: '10px 20px',
                          borderBottom: 'solid .5px rgba(255, 255, 255, .5)',
                          margin: 0,
                          background: '#fff',
                          color: '#000',
                        }}
                      >
                        <Col xs="12" sm="6" style={{ padding: 0, fontWeight: 700 }}>
                          Block height:
                        </Col>

                        <Col xs="12" sm="6" style={{ padding: 0 }}>
                          <Badge color="secondary">{latestValidator.result.block_height}</Badge>
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
                        <Col xs="12" sm="6" style={{ padding: 0 }}>
                          <TitleDiv>Total address:</TitleDiv>
                        </Col>
                        <Col xs="12" sm="6" style={{ padding: 0 }}>
                          {latestValidator.result.validators.length}
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
                        <Col xs="12" sm="6" style={{ padding: 0 }}>
                          <TitleDiv>Total voting power:</TitleDiv>
                        </Col>
                        <Col xs="12" sm="6" style={{ padding: 0 }}>
                          {totalVoting}
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
                        <Col xs="12" sm="6" style={{ padding: 0 }}>
                          <TitleDiv>Validator address:</TitleDiv>
                        </Col>
                        <Col xs="12" sm="6" style={{ padding: 0 }}>
                          {latestValidator.result.validators.map((va, i) => (
                            <Link
                              key={i}
                              onClick={this.toggleAddressInfo(va.address)}
                              style={{ minWidth: '400px', width: '200px', textAlign: 'center' }}
                            >
                              <div>{va.address}</div>
                            </Link>
                          ))}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </SummaryContainer>
              </PrettyContainer>
            )}
          </Main>
        ) : (
          <SvgSpinner />
        )}
        <Footer />
      </Fragment>
    );
  }
}

ValidatorAddressAll.propTypes = {
  t: PropTypes.func,
  modalDataFetchingState: PropTypes.bool,
  actions: PropTypes.object,
  match: PropTypes.object,
  blockInfo: PropTypes.object,
  block: PropTypes.any,
  history: PropTypes.object,
  latestValidator: PropTypes.any,
};

export default ValidatorAddressAll;
