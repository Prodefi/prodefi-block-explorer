import React, { PureComponent } from 'react';
import { Row, Col, Tooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
  Total,
  PrettyContainer,
  SummaryContainer,
  ValidatorProfileLogo,
  FirstRow,
  ValidatorProfileRank,
  ValidatorProfileAddressGroup,
  ValidatorProfileStatus,
  FirstRow2,
  TableContainer,
  HeaderTable,
  TableTag,
  ValidatorProfileDetail,
  ValidatorProfileDetailItem,
  ValidatorProfileDetailItemLabel,
  ValidatorProfileDetailItemValue,
  ValidatorProfileThirdTitle,
  ValidatorProfileThirdBody,
  ValidatorProfileThirdBodyChart,
  ValidatorProfileThirdBodyDetail,
  Self,
  ValidatorSetGroup,
  ValidatorSetItem, ValidatorProfileDelegators, ValidatorProfileDelegatorBody,
  CustomPaging, ItemContainer, Link, TextSpan,
} from './styles';
import { createStructuredSelector } from "reselect";
import {
  selectDelegators, selectProposerBlocks,
  selectValidatorSet,
} from "../../../bus/modal/selectors";
import { connect } from "react-redux";
import fakeValidatorAvatar from '../../../assets/images/fake_validator_avatar.png';
import { faCheck, faSortDown, faSortUp, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrettyNumber, { convertNumToWordFunc } from "../../../components/PrettyNumber";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { bindActionCreators } from "redux";
import { blockActions } from "../../../bus/blocks/actions";
import { selectLatestBlocks } from "../../../bus/blocks/selectors";
import { SvgSpinner } from "../../ScanPage/svg";
import { transactionActions } from "../../../bus/transactions/actions";
import { selectStakingValidator } from "../../../bus/transactions/selectors";
import { modalActions } from "../../../bus/modal/actions";
import moment from "moment";
import Pagination from "react-js-pagination";
import NumberFormat from "react-number-format";

const RegExp = /^\d+0{6}$/;
const mapStateToProps = createStructuredSelector({
  stakingValidator: selectStakingValidator(),
  latestBlocks: selectLatestBlocks(),
  delegators: selectDelegators(),
  proposedBlocks: selectProposerBlocks(),
  validatorSet: selectValidatorSet(),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchLatestBlocks: blockActions.fetchLatestBlocks,
      fetchStakingValidator: transactionActions.fetchStaking,
      fetchDelegators: modalActions.fetchDelegators,
      fetchProposedBlocks: modalActions.fetchProposedBlocks,
      fetchValidatorSet: modalActions.fetchValidatorSet
    },
    dispatch
  ),
});

@connect(mapStateToProps, mapDispatchToProps)
class PrettyDetail extends PureComponent {
  state = {
    page: 1,
    perPage: 10,
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      perPage: 10,
    };
  }

  componentDidMount() {
    this.props.actions.fetchLatestBlocks().then(() => {
      this.props.actions.fetchValidatorSet(this.props.latestBlocks.block.header.height, this.props.stakingValidatorAddressInfo.result.consensus_pubkey);
    });
    this.props.actions.fetchStakingValidator();
    this.props.actions.fetchDelegators(this.props.stakingValidatorAddressInfo.result.operator_address);
    this.props.actions.fetchProposedBlocks(this.state.page, this.state.perPage, this.props.stakingValidatorAddressInfo.result.consensus_pubkey);
  }

  toggle = (target) => {
    this.setState({[target]: !this.state[target]});
  };

  handlePageChange(page) {
    page = page >= 10000 ? 10000 : page;
    this.setState({page}, () => {
      this.props.actions.fetchProposedBlocks(this.state.page, this.state.perPage, this.props.stakingValidatorAddressInfo.result.consensus_pubkey);
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
    const {stakingValidator, stakingValidatorAddressInfo, latestBlocks, delegators, proposedBlocks, validatorSet} = this.props;

    let chartOptions = null;
    let rank = -1;
    let uptime = 0;
    let totalValidators = [];
    let selfPercent = -1;
    let finalResult = [];
    let isValidatorSet = false;
    let totalTokens = 0;

    if (!!stakingValidator && !!stakingValidator.result && Object.entries(stakingValidator.result).length !== 0
      && !!stakingValidatorAddressInfo && Object.entries(stakingValidatorAddressInfo).length !== 0) {

      totalValidators = stakingValidator.result.sort((a, b) => (parseFloat(a.tokens) > parseFloat(b.tokens)) ? 1 : ((parseFloat(a.tokens) > parseFloat(b.tokens)) ? -1 : 0));

      for (let i = 0; i < totalValidators.length; i++) {
        if (totalValidators[i].description.moniker === stakingValidatorAddressInfo.result.description.moniker) {
          rank = i;
          break;
        }
      }

      if (rank <= 100 && !stakingValidatorAddressInfo.result.jailed && stakingValidatorAddressInfo.result.status === 2) {
        totalTokens = stakingValidator.result.slice(0, 100).reduce((total, to) => {
          if (!to.jailed) {
            return total + parseInt(to.tokens, 10);
          }
        }, 0)
      } else {
        totalTokens = stakingValidator.result.reduce((total, to) => total + parseInt(to.tokens, 10), 0);
      }

      finalResult = JSON.parse(localStorage.getItem('finalResult'));

      if (!!finalResult && finalResult.length > 0) {
        for (let i = 0; i < finalResult.length; i++) {
          if (finalResult[i].description.moniker === stakingValidatorAddressInfo.result.description.moniker) {
            uptime = finalResult[i].uptime;
            break;
          }
        }
      }

      selfPercent = parseFloat(stakingValidatorAddressInfo.result.tokens) * 100 / parseFloat(stakingValidatorAddressInfo.result.delegator_shares);

      chartOptions = {
        colors: ['#7bcc3a', '#969696'],
        chart: {
          type: 'pie',
          height: 200,
          margin: [0, 0, 0, 0]
        },
        title: {
          text: ''
        },
        plotOptions: {
          pie: {
            center: ['10%', '50%'],
            shadow: false,
            size: 150
          }
        },
        tooltip: {
          formatter() {
            return `<b>${this.point.name}</b>: ${this.y}%`;
          }
        },
        legend: {
          enabled: false,
        },
        series: [{
          name: '',
          data: [
            ['Self', selfPercent],
            ['Other', 100 - selfPercent],
          ],
          showInLegend: true,
          dataLabels: {
            enabled: false
          }
        }],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 400
              },
              chartOptions: {
                plotOptions: {
                  pie: {
                    center: ['20%', '40%'],
                    shadow: false,
                    size: 129
                  }
                },
                legend: {
                  x: -110,
                  y: -20
                },
              }
            },
            {
              condition: {
                maxWidth: 350
              },
              chartOptions: {
                plotOptions: {
                  pie: {
                    center: ['25%', '40%'],
                    shadow: false,
                    size: 129
                  }
                },
                legend: {
                  x: -80,
                  y: -20
                },
              }
            },
            {
              condition: {
                maxWidth: 330
              }, chartOptions: {
                plotOptions: {
                  pie: {
                    center: ['28%', '40%'],
                    shadow: false,
                    size: 129
                  }
                },
                legend: {
                  x: -50,
                  y: -20
                },
              }
            },
            {
              condition: {
                maxWidth: 300
              }, chartOptions: {
                plotOptions: {
                  pie: {
                    center: ['30%', '40%'],
                    shadow: false,
                    size: 129
                  }
                },
                legend: {
                  // x: -100,
                  // y: 0
                },
              }
            },
          ]
        },
        credits: {
          enabled: false
        },
      }
    }

    if (!!validatorSet && Object.entries(validatorSet).length !== 0) {

      for (let i = 0; i < validatorSet.result.length; i++) {
        if (!validatorSet.result[i].isValidator) {
          isValidatorSet = true;
          break;
        }
      }
    }

    return (
      <PrettyContainer>

        <SummaryContainer>

          <Row className='address-pretty-row' style={{display: 'flex', padding: '20px 15px'}}>

            <Col xs="8" md="6" style={{padding: 0}}>
              <FirstRow>

                <ValidatorProfileRank>
                  <span>{rank + 1}</span>
                </ValidatorProfileRank>

                <ValidatorProfileAddressGroup>
                  <h2 className='validator-name'>{stakingValidatorAddressInfo.result.description.moniker}</h2>
                  <h2 className='validator-operator'>Operator Address</h2>
                  <div>{stakingValidatorAddressInfo.result.operator_address}</div>
                </ValidatorProfileAddressGroup>

              </FirstRow>
            </Col>

            <Col xs="4" md="6" style={{padding: 0}}>

              <FirstRow2>
                {rank <= 100 && !stakingValidatorAddressInfo.result.jailed && stakingValidatorAddressInfo.result.status === 2 ? (

                  <ValidatorProfileStatus bg={'#7bcc3a'}>
                    <FontAwesomeIcon icon={faCheck} style={{fontSize: '14px', marginRight: '5px'}}/>
                    <span>Active</span>
                  </ValidatorProfileStatus>

                ) : (
                  <ValidatorProfileStatus bg={'#ff2745'}>
                    <FontAwesomeIcon icon={faTimes} style={{fontSize: '14px', marginRight: '5px'}}/>
                    <span>Jailed</span>
                  </ValidatorProfileStatus>
                )}

              </FirstRow2>

            </Col>

          </Row>

          <Row className='address-pretty-row' style={{display: 'flex'}}>

            <Col xs="12" md="6" style={{padding: 0}}>

              <ValidatorProfileDetail>

                <ValidatorProfileDetailItem style={{marginTop: '10px'}}>

                  <ValidatorProfileDetailItemLabel>Website</ValidatorProfileDetailItemLabel>

                  <ValidatorProfileDetailItemValue
                    className={stakingValidatorAddressInfo.result.description.website !== '' ? '' : 'empty'}>
                    {stakingValidatorAddressInfo.result.description.website !== '' ? stakingValidatorAddressInfo.result.description.website : 'Empty'}
                  </ValidatorProfileDetailItemValue>

                </ValidatorProfileDetailItem>

                <ValidatorProfileDetailItem>

                  <ValidatorProfileDetailItemLabel>Commission</ValidatorProfileDetailItemLabel>

                  <ValidatorProfileDetailItemValue>
                    {(parseFloat(stakingValidatorAddressInfo.result.commission.commission_rates.rate) * 100).toFixed(0)}%
                  </ValidatorProfileDetailItemValue>

                </ValidatorProfileDetailItem>

                <ValidatorProfileDetailItem>

                  <ValidatorProfileDetailItemLabel>Uptime</ValidatorProfileDetailItemLabel>

                  <ValidatorProfileDetailItemValue>{`${uptime}%`}</ValidatorProfileDetailItemValue>

                </ValidatorProfileDetailItem>

                <ValidatorProfileDetailItem>

                  <ValidatorProfileDetailItemLabel>Voting power</ValidatorProfileDetailItemLabel>

                  <ValidatorProfileDetailItemValue>

                    {`${(((parseFloat(stakingValidatorAddressInfo.result.delegator_shares)) / totalTokens) * 100).toFixed(1)} % `}
                    (<NumberFormat
                    value={this.formatAmount(parseFloat(stakingValidatorAddressInfo.result.delegator_shares))}
                    decimalScale={1}
                    fixedDecimalScale={true}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={' PDT'}/>)

                  </ValidatorProfileDetailItemValue>

                </ValidatorProfileDetailItem>

                <ValidatorProfileDetailItem>

                  <ValidatorProfileDetailItemLabel>Details</ValidatorProfileDetailItemLabel>

                  <ValidatorProfileDetailItemValue
                    className={stakingValidatorAddressInfo.result.description.details !== '' ? '' : 'empty'}>
                    {stakingValidatorAddressInfo.result.description.details !== '' ? stakingValidatorAddressInfo.result.description.details : 'Empty'}
                  </ValidatorProfileDetailItemValue>

                </ValidatorProfileDetailItem>

              </ValidatorProfileDetail>

            </Col>

          </Row>

          <Row className='address-pretty-row' style={{display: 'flex'}}>

            <Col xs="12" sm="12" md="12" lg="6" style={{padding: 0}}>

              <ValidatorProfileThirdTitle>Delegated</ValidatorProfileThirdTitle>

              <ValidatorProfileThirdBody>

                <ValidatorProfileThirdBodyChart>

                  {!!chartOptions ? (
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={chartOptions}
                      containerProps={{className: 'chartTarget'}}
                    />
                  ) : (<SvgSpinner/>)}


                </ValidatorProfileThirdBodyChart>

                {!!stakingValidatorAddressInfo && Object.entries(stakingValidatorAddressInfo).length !== 0 ? (
                  <ValidatorProfileThirdBodyDetail>

                    <Total>
                      <div>Total:</div>
                      <div>
                        <NumberFormat
                          value={this.formatAmount(parseFloat(stakingValidatorAddressInfo.result.delegator_shares))}
                          displayType={'text'}
                          thousandSeparator={true}
                          suffix={' PDT'}/>
                      </div>
                    </Total>

                    <Self>
                      <div style={{display: 'flex', marginRight: '20px'}}>
                        <div style={{
                          width: '2px',
                          height: '100%',
                          marginRight: '5px',
                          background: '#7bcc3a'
                        }}/>
                        <div className='left-side'>
                          <div>Self</div>
                          <div>{`${selfPercent}%`}</div>
                          <div>
                            <NumberFormat
                              value={this.formatAmount(parseFloat(stakingValidatorAddressInfo.result.delegator_shares))}
                              displayType={'text'}
                              thousandSeparator={true}
                              suffix={' PDT'}/>
                          </div>
                        </div>
                      </div>

                      <div style={{display: 'flex'}}>
                        <div style={{
                          width: '2px',
                          height: '100%',
                          marginRight: '5px',
                          background: '#757980'
                        }}/>
                        <div className='right-side'>
                          <div>Other</div>
                          <div>{`${100 - selfPercent}%`}</div>
                          <div>
                            <NumberFormat
                              value={this.formatAmount(parseFloat(stakingValidatorAddressInfo.result.delegator_shares) - parseFloat(stakingValidatorAddressInfo.result.tokens))}
                              displayType={'text'}
                              thousandSeparator={true}
                              suffix={' PDT'}/>
                          </div>
                        </div>
                      </div>

                    </Self>

                  </ValidatorProfileThirdBodyDetail>
                ) : (<SvgSpinner/>)}


              </ValidatorProfileThirdBody>

            </Col>

            <Col xs="12" sm="12" md="12" lg="6" style={{padding: 0}}>
              <ValidatorProfileThirdTitle>Blocks Validated</ValidatorProfileThirdTitle>

              <ValidatorSetGroup>
                {!!validatorSet && Object.entries(validatorSet).length !== 0 ? (
                  validatorSet.result.map((item, index) =>

                    <ValidatorSetItem key={index}
                                      id={`validatorSetItem${item.block_height}`}
                                      bg={item.isValidator ? '#b997ff' : '#ff2745'}
                                      href={`/block/${item.block_height}`}>
                      <Tooltip
                        className="custom-tooltip"
                        placement="bottom"
                        isOpen={this.state[`validatorSetItem${item.block_height}`]}
                        target={`validatorSetItem${item.block_height}`}
                        toggle={() => this.toggle(`validatorSetItem${item.block_height}`)}>
                        {item.block_height}
                      </Tooltip>
                    </ValidatorSetItem>
                  )
                ) : ('')}

              </ValidatorSetGroup>

              {isValidatorSet ? <div style={{marginTop: '40px', display: 'flex'}}>
                <ValidatorProfileThirdTitle>Missed Block: </ValidatorProfileThirdTitle>
                <div style={{
                  width: '13px',
                  height: '25px',
                  background: '#ff2745',
                  marginLeft: '5px'
                }}/>
              </div> : (<div/>)}

            </Col>

          </Row>

          <Row className='address-pretty-row' style={{display: 'flex'}}>

            <Col xs="12" md="12" style={{padding: 0}}>

              <ValidatorProfileThirdTitle>Delegators <span style={{fontWeight: 500}}>(Count: {
                !!delegators && Object.entries(delegators).length !== 0 ? (delegators.result.length) : (0)
              })</span></ValidatorProfileThirdTitle>

              <ValidatorProfileDelegators>

                <TableContainer>

                  <TableTag>

                    <HeaderTable>
                      <tr>
                        <th style={{
                          minWidth: '250px',
                          width: '250px',
                          maxWidth: '250px',
                          textAlign: 'center'
                        }}>
                          Delegator Address
                        </th>
                        <th style={{minWidth: '200px', width: '200px', maxWidth: '200px', textAlign: 'center'}}>Amount
                        </th>
                        <th style={{
                          minWidth: '200px',
                          width: '200px',
                          maxWidth: '200px',
                          textAlign: 'center'
                        }}>
                          Share (%)
                        </th>
                      </tr>
                    </HeaderTable>

                    <tbody>
                    {!!delegators && Object.entries(delegators).length !== 0 ? (

                      delegators.result.map((de, index) => (
                        <ValidatorProfileDelegatorBody key={index}>
                          <td style={{maxWidth: '250px', minWidth: '250px'}}>
                            <Link href={`/address/${de.delegator_address}`}>
                              {de.delegator_address}
                            </Link>
                          </td>
                          <td style={{maxWidth: '200px', minWidth: '200px', textAlign: 'center'}}>
                            <NumberFormat
                              value={this.formatAmount(de.balance)}
                              displayType={'text'}
                              thousandSeparator={true}
                              suffix={' PDT'}/>
                          </td>
                          <td style={{maxWidth: '200px', minWidth: '200px', textAlign: 'center'}}>
                            {parseFloat(de.shares) * 100 / parseFloat(stakingValidatorAddressInfo.result.delegator_shares)}%
                          </td>
                        </ValidatorProfileDelegatorBody>
                      ))
                    ) : (
                      <tr>
                        <td><SvgSpinner/></td>
                      </tr>
                    )}
                    </tbody>

                  </TableTag>

                </TableContainer>

              </ValidatorProfileDelegators>

            </Col>

          </Row>

          <Row className='address-pretty-row' style={{display: 'flex'}}>

            <Col xs="12" md="12" style={{padding: 0}}>

              <ValidatorProfileThirdTitle>Proposed Blocks <span style={{fontWeight: 500}}>(Count: {
                !!proposedBlocks && Object.entries(proposedBlocks).length !== 0 ? (proposedBlocks.total) : (0)
              })</span></ValidatorProfileThirdTitle>

              <TableContainer>

                <TableTag>
                  <HeaderTable>
                    <tr>
                      <th style={{minWidth: '100px', width: '100px', textAlign: 'center'}}>Height</th>
                      <th style={{minWidth: '300px', maxWidth: '300px', textAlign: 'center'}}>Block Hash</th>
                      <th style={{minWidth: '100px', width: '100px', textAlign: 'center'}}>Total TXS</th>
                      <th style={{minWidth: '100px', width: '100px', textAlign: 'center'}}>Time</th>
                    </tr>
                  </HeaderTable>
                  <tbody>
                  {!!proposedBlocks && !!proposedBlocks.blocks && proposedBlocks.blocks.length > 0 ? (
                    proposedBlocks.blocks.map((proposedBlockItem, i) => (
                      <ItemContainer key={i}>
                        <TextSpan style={{minWidth: '100px', width: '100px', textAlign: 'center'}}>
                          <a href={`/block/${proposedBlockItem.block.header.height}`}
                             style={{cursor: 'pointer', color: '#7bcc3a'}}>
                            {proposedBlockItem.block.header.height}
                          </a>
                        </TextSpan>

                        <TextSpan style={{minWidth: '300px', maxWidth: '300px'}}>
                          {proposedBlockItem.block_meta.block_id.hash}
                        </TextSpan>

                        <TextSpan style={{minWidth: '100px', width: '100px'}}>
                          {proposedBlockItem.block.header.num_txs}
                        </TextSpan>

                        <TextSpan style={{minWidth: '100px', width: '100px'}}>
                          {moment(proposedBlockItem.block.header.time).format('YYYY-MM-DD HH:mm:ss')}
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
                  totalItemsCount={!!proposedBlocks && proposedBlocks.total ? (proposedBlocks.total >= 100000 ? 100000 : proposedBlocks.total) : 0}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange.bind(this)}
                />
              </CustomPaging>

            </Col>

          </Row>

        </SummaryContainer>

      </PrettyContainer>
    );
  }
}

PrettyDetail.propTypes = {
  stakingValidatorAddressInfo: PropTypes.object,
  stakingValidatorUptimeInfo: PropTypes.object,
  transactions: PropTypes.array,
  history: PropTypes.object,
  loadData: PropTypes.func,
};

export default withRouter(PrettyDetail);
