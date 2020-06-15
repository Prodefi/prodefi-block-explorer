// Core
import React, { Fragment, PureComponent } from 'react';
// Components
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NavigationMenu from '../NavigationMenu';

import Footer from '../Footer';
import {
  ActiveValidator,
  ActiveValidatorBtn,
  HeaderBlock,
  HeaderPage,
  HeaderTable,
  InputContainer,
  ItemContainer,
  Link,
  OmniSearchInput,
  PageTitle,
  SearchButton,
  TableContainer,
  TableHeader,
  TableTag,
  TextSpan,
  TransactionsContainer,
  ValidatorNameGroup
} from './style';
import { SvgSpinner } from '../ScanPage/svg';
import { Col, Row } from "reactstrap";
import { faClock, faCoins, faCubes, faSortDown, faSortUp, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertNumToWordFunc } from "../../components/PrettyNumber";
import {
  selectLatestBlockInfoSocket,
  selectLatestStakingValidatorInfo,
  selectStakingValidatorUptimeInfo,
  selectStakingValidatorUptimeInfoFilter
} from "../../bus/modal/selectors";
import { modalActions } from "../../bus/modal/actions";
import NumberFormat from 'react-number-format';
import moment from "moment";

const RegExp = /^\d+0{6}$/;
const mapStateToProps = createStructuredSelector({
  stakingValidatorUptimeInfo: selectStakingValidatorUptimeInfo(),
  latestStakingValidatorInfo: selectLatestStakingValidatorInfo(),
  stakingValidatorUptimeInfoFilter: selectStakingValidatorUptimeInfoFilter(),
  latestBlockInfoSocket: selectLatestBlockInfoSocket(),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchStakingValidatorUptimeInfoFilter: modalActions.fetchStakingValidatorUptimeInfoFilter,
    },
    dispatch
  ),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ValidatorAll extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      inputSearch: '',
      isActive: true,
      isSearching: false,
      isSort: false,
      sortType: '',
      sortField: '',
    };
  }

  componentDidMount() {
    // this.getData();
  }

  onFieldChange = e => {
    if (e.target.value === '') {
      this.setState({isSearching: false});
    }
    this.setState({[e.target.name]: e.target.value})
  };

  omniSearch = () => {
    const {inputSearch} = this.state;

    if (inputSearch !== '') {
      this.setState({isSearching: true});
      this.props.actions.fetchStakingValidatorUptimeInfoFilter(this.props.stakingValidatorUptimeInfo, inputSearch);
    }
  };

  handleKey = e => {
    const keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      this.omniSearch();
    }
  };

  handleSort = (sortField) => e => {
    if (this.state.sortType === '' || this.state.sortType === 'ASC') {
      this.setState({isSort: true, sortType: 'DESC', sortField});
    } else {
      this.setState({isSort: true, sortType: 'ASC', sortField});
    }
  };

  activeValidator = active => e => {
    this.setState({isActive: active});
  };

  calStakedShare = (val, totalTokens) => {
    const stakedTokens = parseFloat(val.tokens);
    return ((stakedTokens) / totalTokens) * 100;
  };

  calCumShare = (val, totalTokens) => {
    const delegatedTokens = parseFloat(val.delegator_shares);
    return ((delegatedTokens) / totalTokens) * 100;
  };

  calFistCumDotShare = (val, totalTokens) => {
    const stakedTokens = parseFloat(val.tokens);
    // const delegatedTokens = parseFloat(val.delegator_shares);
    return ((stakedTokens) / totalTokens) * 100;
  };

  calNotFistCumDotShare = (finalResult, totalTokens, index) => {
    const result = finalResult.result.slice(0, index + 1).reduce((total, to) => {
      return total + this.calFistCumDotShare(to, totalTokens);
    }, 0);

    return result >= 100 ? '100.0' : result.toFixed(1);
  };

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
    const {latestStakingValidatorInfo, latestBlockInfoSocket, stakingValidatorUptimeInfo, stakingValidatorUptimeInfoFilter} = this.props;
    const {inputSearch, isActive, isSearching, isSort, sortType, sortField} = this.state;

    let totalTokens = 0;
    let height = 0;

    let activeValidator = 0;
    let inactiveValidator = 0;
    let bondedToken = 0;
    let allToken = 0;

    let validatorBlockTimne = 0;

    let finalResult = isSearching ? stakingValidatorUptimeInfoFilter : stakingValidatorUptimeInfo;

    if (!!finalResult && !!finalResult.result && Object.entries(finalResult.result).length !== 0) {

      if (isSort && sortType === 'ASC') {

        switch (sortField) {
          case 'validator': {
            finalResult.result = finalResult.result.sort((a, b) => (a.description.moniker > b.description.moniker) ? 1 : ((b.description.moniker > a.description.moniker) ? -1 : 0));
            break;
          }
          case 'commission': {
            finalResult.result = finalResult.result.sort((a, b) => ((parseFloat(a.commission.commission_rates.rate) * 100).toFixed(0) > (parseFloat(b.commission.commission_rates.rate) * 100).toFixed(0)) ? 1 : (((parseFloat(a.commission.commission_rates.rate) * 100).toFixed(0) > (parseFloat(b.commission.commission_rates.rate) * 100).toFixed(0)) ? -1 : 0));
            break;
          }
          case 'uptime': {
            finalResult.result = finalResult.result.sort((a, b) => (a.uptime > b.uptime) ? 1 : ((b.uptime > a.uptime) ? -1 : 0));
            break;
          }
          case 'voting': {
            finalResult.result = finalResult.result.sort((a, b) => (parseFloat(a.tokens) > parseFloat(b.tokens)) ? 1 : ((parseFloat(a.tokens) > parseFloat(b.tokens)) ? -1 : 0));
            break;
          }
        }

      } else if (isSort && sortType === 'DESC') {

        switch (sortField) {
          case 'validator': {
            finalResult.result = finalResult.result.sort((a, b) => (a.description.moniker > b.description.moniker) ? -1 : ((b.description.moniker > a.description.moniker) ? 1 : 0));
            break;
          }
          case 'commission': {
            finalResult.result = finalResult.result.sort((a, b) => ((parseFloat(a.commission.commission_rates.rate) * 100).toFixed(0) > (parseFloat(b.commission.commission_rates.rate) * 100).toFixed(0)) ? -1 : (((parseFloat(a.commission.commission_rates.rate) * 100).toFixed(0) > (parseFloat(b.commission.commission_rates.rate) * 100).toFixed(0)) ? 1 : 0));
            break;
          }
          case 'uptime': {
            finalResult.result = finalResult.result.sort((a, b) => (a.uptime > b.uptime) ? -1 : ((b.uptime > a.uptime) ? 1 : 0));
            break;
          }
          case 'voting': {
            finalResult.result = finalResult.result.sort((a, b) => (parseFloat(a.tokens) > parseFloat(b.tokens)) ? -1 : ((parseFloat(a.tokens) > parseFloat(b.tokens)) ? 1 : 0));
            break;
          }
        }
      } else {
        finalResult.result = finalResult.result.sort((a, b) => parseInt(b.tokens, 10) - parseInt(a.tokens, 10));
      }

      localStorage.setItem('finalResult', JSON.stringify(finalResult.result));

      totalTokens =
        isActive ? finalResult.result.slice(0, 100).reduce((total, to) => {
          if (!to.jailed) {
            return total + parseInt(to.tokens, 10);
          }
        }, 0) : finalResult.result.reduce((total, to) => total + parseInt(to.tokens, 10), 0);
    }

    if (!!latestStakingValidatorInfo && Object.entries(latestStakingValidatorInfo).length !== 0) {
      activeValidator = latestStakingValidatorInfo.activeValidator;
      inactiveValidator = latestStakingValidatorInfo.inactiveValidator;
      bondedToken = latestStakingValidatorInfo.bondedToken;
      allToken = latestStakingValidatorInfo.allToken;
      height = latestStakingValidatorInfo.height;
    }

    if (!!latestBlockInfoSocket && Object.entries(latestBlockInfoSocket).length !== 0) {
      validatorBlockTimne = latestBlockInfoSocket.validatorBlockTime;
    }

    return (
      <Fragment>

        <NavigationMenu/>

        <TransactionsContainer>

          <PageTitle>Validators</PageTitle>

          <HeaderPage>

            <Row>

              <Col xs="12" sm="6" xl="3" className="fix-responsive">
                <HeaderBlock>
                  <div>
                    <FontAwesomeIcon icon={faCubes} style={{cursor: 'pointer', marginRight: '5px'}}/>
                    <span>Height</span>
                  </div>
                  <div>
                    <NumberFormat value={height} displayType={'text'} thousandSeparator={true} prefix={''}/>
                  </div>
                </HeaderBlock>
              </Col>

              <Col xs="12" sm="6" xl="3" className="fix-responsive">
                <HeaderBlock>
                  <div>
                    <FontAwesomeIcon icon={faUsers} style={{cursor: 'pointer', marginRight: '5px'}}/>
                    <span>Validators</span>
                  </div>
                  <div>{`${activeValidator} / ${activeValidator + inactiveValidator}`}</div>
                </HeaderBlock>
              </Col>

              <Col xs="12" sm="6" xl="3" className="fix-responsive">
                <HeaderBlock>
                  <div>
                    <FontAwesomeIcon icon={faCoins} style={{cursor: 'pointer', marginRight: '5px'}}/>
                    <span>Bonded Tokens</span>
                  </div>
                  <div style={{display: 'flex'}}>

                    <NumberFormat
                      value={this.formatAmount(bondedToken)}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' PDT'}/>

                    <span style={{margin: '0 5px'}}>/</span>

                    <NumberFormat
                      value={this.formatAmount(allToken)}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' PDT'}/>

                  </div>
                </HeaderBlock>
              </Col>

              <Col xs="12" sm="6" xl="3" className="fix-responsive">
                <HeaderBlock>
                  <div>
                    <FontAwesomeIcon icon={faClock} style={{cursor: 'pointer', marginRight: '5px'}}/>
                    <span>Block Time</span>
                  </div>
                  <div>{`${validatorBlockTimne.toFixed(2)} s`}</div>
                </HeaderBlock>
              </Col>

            </Row>

          </HeaderPage>

          <TableContainer>

            <TableHeader>

              <InputContainer>
                <OmniSearchInput
                  value={inputSearch}
                  type="text"
                  placeholder="Search validator"
                  name="inputSearch"
                  onChange={this.onFieldChange}
                  onKeyUp={this.handleKey}
                />
                <SearchButton onClick={this.omniSearch} color="secondary">
                  <FontAwesomeIcon color="#777777" icon="search" style={{cursor: 'pointer'}}/>
                </SearchButton>
              </InputContainer>

              <ActiveValidator>
                <ActiveValidatorBtn color={isActive ? '#fff' : '#000'}
                                    bg={isActive ? '#000' : '#fff'}
                                    onClick={this.activeValidator(true)}>
                  ACTIVE
                </ActiveValidatorBtn>
                <ActiveValidatorBtn color={isActive ? '#000' : '#fff'}
                                    bg={isActive ? '#fff' : '#000'}
                                    onClick={this.activeValidator(false)}>
                  INACTIVE
                </ActiveValidatorBtn>
              </ActiveValidator>

            </TableHeader>

            <TableTag>

              <HeaderTable>
                <tr>
                  <th style={{minWidth: '50px', width: '50px', maxWidth: '50px', textAlign: 'center'}}>Rank</th>
                  <th style={{minWidth: '100px', width: '100px', maxWidth: '100px', textAlign: 'center'}}
                      onClick={this.handleSort('validator')}>
                    <div style={{cursor: 'pointer'}}>
                      <span>Validator</span>
                      <span>
                        {isSort && sortType === 'ASC' && sortField === 'validator' ? (
                          <FontAwesomeIcon icon={faSortUp} style={{cursor: 'pointer', marginLeft: '5px'}}/>
                        ) : (isSort && sortType === 'DESC' && sortField === 'validator' ? (
                          <FontAwesomeIcon icon={faSortDown} style={{cursor: 'pointer', marginLeft: '5px'}}/>
                        ) : (
                          <span>
                            <FontAwesomeIcon icon={faSortUp} style={{cursor: 'pointer', marginLeft: '5px'}}/>
                            <FontAwesomeIcon icon={faSortDown} style={{cursor: 'pointer', marginLeft: '-9px'}}/>
                          </span>
                        ))}
                      </span>
                    </div>
                  </th>
                  <th style={{minWidth: '150px', width: '150px', maxWidth: '150px', textAlign: 'center'}}
                      onClick={this.handleSort('voting')}>
                    <div style={{cursor: 'pointer', textAlign: 'center'}}>
                      <span>Voting Power</span>
                      <span>
                        {isSort && sortType === 'ASC' && sortField === 'voting' ? (
                          <FontAwesomeIcon icon={faSortUp} style={{cursor: 'pointer', marginLeft: '5px'}}/>
                        ) : (isSort && sortType === 'DESC' && sortField === 'voting' ? (
                          <FontAwesomeIcon icon={faSortDown} style={{cursor: 'pointer', marginLeft: '5px'}}/>
                        ) : (
                          <span>
                            <FontAwesomeIcon icon={faSortUp} style={{cursor: 'pointer', marginLeft: '5px'}}/>
                            <FontAwesomeIcon icon={faSortDown} style={{cursor: 'pointer', marginLeft: '-9px'}}/>
                          </span>
                        ))}
                      </span>
                    </div>
                  </th>
                  <th style={{minWidth: '150px', width: '150px', maxWidth: '150px', textAlign: 'center'}}>Cum. Share
                    (%)
                  </th>
                  <th style={{minWidth: '100px', width: '100px', maxWidth: '100px', textAlign: 'center'}}
                      onClick={this.handleSort('commission')}>
                    <div style={{cursor: 'pointer'}}>
                      <span>Commission</span>
                      <span>
                        {isSort && sortType === 'ASC' && sortField === 'commission' ? (
                          <FontAwesomeIcon icon={faSortUp} style={{cursor: 'pointer', marginLeft: '5px'}}/>
                        ) : (isSort && sortType === 'DESC' && sortField === 'commission' ? (
                          <FontAwesomeIcon icon={faSortDown} style={{cursor: 'pointer', marginLeft: '5px'}}/>
                        ) : (
                          <span>
                            <FontAwesomeIcon icon={faSortUp} style={{cursor: 'pointer', marginLeft: '5px'}}/>
                            <FontAwesomeIcon icon={faSortDown} style={{cursor: 'pointer', marginLeft: '-9px'}}/>
                          </span>
                        ))}
                      </span>
                    </div>
                  </th>
                  <th style={{minWidth: '200px', width: '100px', maxWidth: '200px', textAlign: 'center'}}
                      onClick={this.handleSort('uptime')}>
                    <div style={{cursor: 'pointer'}}>
                      <span>Uptime</span>
                      <span>
                        {isSort && sortType === 'ASC' && sortField === 'uptime' ? (
                          <FontAwesomeIcon icon={faSortUp} style={{cursor: 'pointer', marginLeft: '5px'}}/>
                        ) : (isSort && sortType === 'DESC' && sortField === 'uptime' ? (
                          <FontAwesomeIcon icon={faSortDown} style={{cursor: 'pointer', marginLeft: '5px'}}/>
                        ) : (
                          <span>
                            <FontAwesomeIcon icon={faSortUp} style={{cursor: 'pointer', marginLeft: '5px'}}/>
                            <FontAwesomeIcon icon={faSortDown} style={{cursor: 'pointer', marginLeft: '-9px'}}/>
                          </span>
                        ))}
                      </span>
                      <div style={{fontSize: '12px'}}>
                        {`(since ${!!finalResult && finalResult.startUptime ? moment(finalResult.startUptime).format("YYYY-MM-DD HH:mm:ss") : moment().format("YYYY-MM-DD HH:mm:ss")})`}
                      </div>
                    </div>
                  </th>
                </tr>
              </HeaderTable>

              <tbody>

              {isActive ? (

                !!finalResult && Object.entries(finalResult).length !== 0 ? (

                  finalResult.result.length > 0 ? (
                    finalResult.result.slice(0, 100).map((val, i) => {
                      if (!val.jailed) {
                        return <ItemContainer key={i}>
                          <TextSpan style={{
                            minWidth: '50px',
                            width: '50px',
                            maxWidth: '50px',
                            textAlign: 'center'
                          }}>{i + 1}</TextSpan>

                          <TextSpan style={{minWidth: '100px', width: '100px', maxWidth: '100px', textAlign: 'center'}}>
                            <ValidatorNameGroup>
                              <Link href={`/validator-profile/${val.operator_address}/latest`}
                                    style={{justifyContent: 'center'}}>
                                <div>{val.description.moniker}</div>
                              </Link>
                            </ValidatorNameGroup>
                          </TextSpan>

                          <TextSpan style={{minWidth: '150px', width: '150px', maxWidth: '150px', textAlign: 'center'}}>
                            <div>
                              <NumberFormat value={this.formatAmount(val.tokens)}
                                            decimalScale={1}
                                            fixedDecimalScale={true}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' PDT'}
                              />
                              <div>{`${(this.calStakedShare(val, totalTokens)).toFixed(1)} %`}</div>
                            </div>
                          </TextSpan>

                          <TextSpan style={{minWidth: '150px', width: '150px', maxWidth: '150px', textAlign: 'center'}}>
                            {`${(this.calCumShare(val, totalTokens)).toFixed(1)} %`}
                          </TextSpan>

                          <TextSpan style={{minWidth: '100px', width: '100px', textAlign: 'center'}}>
                            {(parseFloat(val.commission.commission_rates.rate) * 100).toFixed(0)} %
                          </TextSpan>

                          <TextSpan style={{minWidth: '200px', width: '200px'}}>
                            {`${!!stakingValidatorUptimeInfo.uptime ? stakingValidatorUptimeInfo.uptime : 100} %`}
                          </TextSpan>

                        </ItemContainer>
                      }
                    })
                  ) : (<tr>
                    <td colSpan='100%' style={{textAlign: 'center', padding: '10px', fontStyle: 'italic'}}>
                      No data found.
                    </td>
                  </tr>)
                ) : (<ItemContainer>
                  <td colSpan='100%' style={{textAlign: 'center', padding: '10px', fontStyle: 'italic'}}>
                    <SvgSpinner/>
                  </td>
                </ItemContainer>)
              ) : (
                !!finalResult && Object.entries(finalResult).length !== 0 ? (
                    finalResult.result.length > 0 ? (
                      finalResult.length > 100 ? (
                        finalResult.result.slice(100, finalResult.length).map((val, j) => (
                          <ItemContainer key={j}>
                            <TextSpan style={{minWidth: '50px', width: '50px', textAlign: 'center'}}>{j + 1}</TextSpan>

                            <TextSpan style={{minWidth: '100px', width: '100px', maxWidth: '100px', textAlign: 'center'}}>
                              <ValidatorNameGroup>
                                <Link href={`/validator-profile/${val.operator_address}/latest`}
                                      style={{justifyContent: 'center'}}>
                                  <div>{val.description.moniker}</div>
                                </Link>
                              </ValidatorNameGroup>
                            </TextSpan>

                            <TextSpan style={{minWidth: '150px', width: '150px', maxWidth: '150px', textAlign: 'center'}}>
                              <div>
                                {convertNumToWordFunc(val.tokens)}
                                <div>{`${(this.calStakedShare(val, totalTokens)).toFixed(1)} %`}</div>
                              </div>
                            </TextSpan>

                            <TextSpan style={{minWidth: '150px', width: '150px', maxWidth: '150px', textAlign: 'center'}}>
                              {`${(this.calCumShare(val, totalTokens)).toFixed(1)} %`}
                            </TextSpan>

                            <TextSpan style={{minWidth: '100px', width: '100px', textAlign: 'center'}}>
                              {parseFloat(val.commission.commission_rates.rate).toFixed(1)}%
                            </TextSpan>

                            <TextSpan style={{minWidth: '200px', width: '200px'}}>
                              {`${!!stakingValidatorUptimeInfo.uptime ? stakingValidatorUptimeInfo.uptime : 100} %`}
                            </TextSpan>

                          </ItemContainer>))
                      ) : (<tr>
                        <td colSpan='100%' style={{textAlign: 'center', padding: '10px', fontStyle: 'italic'}}>
                          No data found.
                        </td>
                      </tr>)) : (<tr>
                      <td colSpan='100%' style={{textAlign: 'center', padding: '10px', fontStyle: 'italic'}}>
                        No data found.
                      </td>
                    </tr>))
                  : (<ItemContainer>
                    <td colSpan='100%' style={{textAlign: 'center', padding: '10px', fontStyle: 'italic'}}>
                      <SvgSpinner/>
                    </td>
                  </ItemContainer>)
              )}

              </tbody>

            </TableTag>

          </TableContainer>

        </TransactionsContainer>

        <Footer/>

      </Fragment>
    );
  }
}
