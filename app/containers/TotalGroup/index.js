// Core
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import './custom.css';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Tooltip, Badge } from 'reactstrap';
import moment from 'moment';
import { Total, TotalContainer, TotalItem } from './styles';
import { SvgSpinner } from "../ScanPage/svg";
import StringMiddleTruncate from "../../components/StringMiddleTruncate";
import { createStructuredSelector } from "reselect";
import { selectLatestBlockInfoSocket, selectStakingValidator, selectTotalAddress } from "../../bus/modal/selectors";

const mapStateToProps = createStructuredSelector({
  latestBlockInfoSocket: selectLatestBlockInfoSocket(),
  stakingValidator: selectStakingValidator(),
  totalAddress: selectTotalAddress(),
});

@connect(mapStateToProps)
class TotalGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {isTooltipOpen: false};
  }

  toggle = () => {
    this.setState({
      isTooltipOpen: !this.state.isTooltipOpen,
    });
  };

  render() {
    const {latestBlockInfoSocket, stakingValidator, totalAddress} = this.props;
    const {isTooltipOpen} = this.state;

    const totalAddressShow = totalAddress ? totalAddress : 0;

    return (
      !!latestBlockInfoSocket && Object.entries(latestBlockInfoSocket).length !== 0 ? (
        <TotalContainer>
          <Total>

            <Row>

              <Col xs="12" sm="6" className="no-padding">
                <TotalItem className="item-top-left">
                  <div className="total-item-title">Latest Block</div>

                  <div>{latestBlockInfoSocket.height}</div>
                  <div>{moment(latestBlockInfoSocket.time).fromNow()}</div>

                </TotalItem>
              </Col>

              <Col xs="12" sm="6" className="no-padding">
                <TotalItem className="item-top-right">
                  <div className="total-item-title">Staking Validators</div>

                  {!!stakingValidator && Object.entries(stakingValidator).length !== 0 ? (
                    <div>
                      <div>
                        <Link to="/staking">
                        <span style={{textDecoration: 'underline', color: 'blue'}} href="#" id="TooltipExample">
                          <Badge color="success">{`${stakingValidator.result.length} Validators`}</Badge>
                        </span>
                        </Link>
                      </div>
                      <Tooltip
                        className="custom-tooltip"
                        placement="right"
                        isOpen={isTooltipOpen}
                        target="TooltipExample"
                        toggle={this.toggle}
                      >
                        {stakingValidator.result.map((sta, i) => (
                          <StringMiddleTruncate key={i} text={sta.operator_address}/>
                        ))}
                      </Tooltip>
                    </div>
                  ) : (
                    <div>
                      <div>
                        <Link to="/staking">
                        <span style={{textDecoration: 'underline', color: 'blue'}} href="#" id="TooltipExample">
                          <Badge color="success">0 Validators</Badge>
                        </span>
                        </Link>
                      </div>
                      <Tooltip
                        className="custom-tooltip"
                        placement="right"
                        isOpen={isTooltipOpen}
                        target="TooltipExample"
                        toggle={this.toggle}
                      >
                        <SvgSpinner/>
                      </Tooltip>
                    </div>
                  )}
                </TotalItem>
              </Col>

            </Row>

            <Row>
              <Col xs="12" sm="6" className="no-padding">
                <TotalItem className="item-bottom-left">
                  <div className="total-item-title">Total Addresses</div>
                  {totalAddressShow}
                </TotalItem>
              </Col>

              <Col xs="12" sm="6" className="no-padding">
                <TotalItem className="item-bottom-right">
                  <div className="total-item-title">Total Transactions</div>
                  <div>{latestBlockInfoSocket.txs}</div>
                </TotalItem>
              </Col>
            </Row>

          </Total>
        </TotalContainer>
      ) : (
        <TotalContainer>
          <Total>

            <Row>

              <Col xs="12" sm="6" className="no-padding">
                <TotalItem className="item-top-left">
                  <div className="total-item-title">Latest Block</div>

                  <div>0</div>
                  <div>{moment().fromNow()}</div>

                </TotalItem>
              </Col>
              <Col xs="12" sm="6" className="no-padding">
                <TotalItem className="item-top-right">
                  <div className="total-item-title">Staking Validators</div>
                  <div>
                    <div>
                      <Link to="/staking">
                        <span style={{textDecoration: 'underline', color: 'blue'}} href="#" id="TooltipExample">
                          <Badge color="success">0 Validators</Badge>
                        </span>
                      </Link>
                    </div>
                    <Tooltip
                      className="custom-tooltip"
                      placement="right"
                      isOpen={isTooltipOpen}
                      target="TooltipExample"
                      toggle={this.toggle}
                    >
                      <SvgSpinner/>
                    </Tooltip>
                  </div>

                </TotalItem>
              </Col>

            </Row>

            <Row>

              <Col xs="12" sm="6" className="no-padding">
                <TotalItem className="item-bottom-left">
                  <div className="total-item-title">Total Addresses</div>
                  0
                </TotalItem>
              </Col>
              <Col xs="12" sm="6" className="no-padding">
                <TotalItem className="item-bottom-right">
                  <div className="total-item-title">All Transactions</div>
                  <div>0</div>
                </TotalItem>
              </Col>

            </Row>

          </Total>
        </TotalContainer>
      )
    );
  }
}

TotalGroup.propTypes = {
  producers: PropTypes.array,
  history: PropTypes.any,
  latestTransactionHeight: PropTypes.any,
  totalTx: PropTypes.any,
  countTPS: PropTypes.any,
};

export default withRouter(TotalGroup);
