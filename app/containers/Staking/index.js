// Core
import React, {PureComponent, Fragment} from 'react';

// Components
import {createStructuredSelector} from 'reselect';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Row, Col, Badge} from 'reactstrap';
import PropTypes from 'prop-types';
import NavigationMenu from '../NavigationMenu';

import Footer from '../Footer';
import {selectStakingValidator} from '../../bus/transactions/selectors';
import {transactionActions} from '../../bus/transactions/actions';
import {Header, Main, DetailTab, PrettyContainer, SummaryContainer, TitleDiv, PreWrapper} from './style';

import {SvgSpinner} from '../ScanPage/svg';
import {Link} from '../TransactionsAll/style';
import {PageTitle} from '../BlockDetail/styles';

const mapStateToProps = createStructuredSelector({
  stakingValidator: selectStakingValidator(),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchStakingValidator: transactionActions.fetchStaking,
    },
    dispatch
  ),
});

@connect(mapStateToProps, mapDispatchToProps)
class Staking extends PureComponent {
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
    this.props.actions.fetchStakingValidator();
  };

  toggleStakingValidatorAddressInfo = address => e => {
    const {history} = this.props;
    history.push(`/validator-profile/${address}`);
  };

  changeDataType = dataType => e => {
    const isRaw = dataType === 'Raw';
    this.setState({isRaw});
  };

  render() {
    const {stakingValidator} = this.props;
    const {isRaw} = this.state;

    const totalTokens =
      !!stakingValidator && Object.entries(stakingValidator).length !== 0
        ? stakingValidator.result.reduce((total, to) => total + parseInt(to.tokens, 10), 0)
        : 0;

    return (
      <Fragment>
        <NavigationMenu/>
        <PageTitle>Validators</PageTitle>
        <Header>
          <div className="fix-mobile">
            <DetailTab
              onClick={this.changeDataType('Pretty')}
              color="#000"
              bg={!isRaw ? '#dedede' : '#fff'}
              style={{minWidth: '120px'}}
            >
              Details
            </DetailTab>

            <DetailTab
              onClick={this.changeDataType('Raw')}
              color="#000"
              bg={!isRaw ? '#fff' : '#dedede'}
              style={{minWidth: '120px'}}
            >
              Raw
            </DetailTab>
          </div>
        </Header>

        {!!stakingValidator && Object.entries(stakingValidator).length !== 0 ? (
          <Main>
            {isRaw ? (
              <PreWrapper>{JSON.stringify(stakingValidator, null, 2)}</PreWrapper>
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
                    <Col xs="12" sm="12" style={{padding: 0}}>
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
                          <Badge color="secondary">{stakingValidator.height}</Badge>
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
                          <TitleDiv>Total address:</TitleDiv>
                        </Col>
                        <Col xs="12" sm="6" style={{padding: 0}}>
                          {stakingValidator.result.length}
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
                          <TitleDiv>Total tokens:</TitleDiv>
                        </Col>
                        <Col xs="12" sm="6" style={{padding: 0}}>
                          {totalTokens}
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
                          <TitleDiv>Validator address:</TitleDiv>
                        </Col>
                        <Col xs="12" sm="6" style={{padding: 0}}>
                          {stakingValidator.result.map((sta, i) => (
                            <Link
                              key={i}
                              href={`/validator-profile/${sta.operator_address}/latest`}
                              style={{minWidth: '400px', width: '200px', textAlign: 'center'}}
                            >
                              <div>{sta.operator_address}</div>
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
          <Main>
            <SvgSpinner/>
          </Main>
        )}
        <Footer/>
      </Fragment>
    );
  }
}

Staking.propTypes = {
  t: PropTypes.func,
  modalDataFetchingState: PropTypes.bool,
  actions: PropTypes.object,
  stakingValidator: PropTypes.object,
  match: PropTypes.any,
  history: PropTypes.any,
};

export default Staking;
