import React, {PureComponent} from 'react';
import {Row, Col, Badge} from 'reactstrap';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import {
  TitleDiv,
  PrettyContainer,
  SummaryContainer,
} from './styles';
import {Link} from '../../ScanPage/LatestBlock/LatestBlockRow/styles';
import {faCopy} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {CopyToClipboard} from "react-copy-to-clipboard";

class PrettyDetail extends PureComponent {

  render() {
    const {blockInfo} = this.props;

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
            <Col xs="12" md="6" style={{padding: 0}}>
              <Row
                style={{
                  padding: '10px 20px',
                  borderBottom: 'solid .5px rgba(255, 255, 255, .5)',
                  margin: 0,
                  background: '#fff',
                  color: '#000',
                }}
              >
                <Col xs="12" md="6" style={{padding: 0, fontWeight: 700}}>
                  Height:
                </Col>

                <Col xs="12" md="6" style={{padding: 0}}>
                  <Badge color="secondary">{blockInfo.block.header.height}</Badge>
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
                <Col xs="12" md="6" style={{padding: 0}}>
                  Block Hash:
                </Col>

                <Col xs="12" md="6" style={{padding: 0}}>
                  {blockInfo.block_meta.block_id.hash}
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
                <Col xs="12" md="6" style={{padding: 0}}>
                  <TitleDiv>Previous Height:</TitleDiv>
                </Col>

                <Col xs="12" md="6" style={{padding: 0}}>
                  <Link href={`/block/${parseInt(blockInfo.block.header.height - 1)}`}
                        style={{cursor: 'pointer', color: '#7bcc3a'}}>
                    {parseInt(blockInfo.block.header.height - 1)}
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
                <Col xs="12" md="6" style={{padding: 0}}>
                  <TitleDiv>Next Height:</TitleDiv>
                </Col>

                <Col xs="12" md="6" style={{padding: 0}}>
                  <Link href={`/block/${parseInt(blockInfo.block.header.height) + 1}`}
                        style={{cursor: 'pointer', color: '#7bcc3a'}}>
                    {parseInt(blockInfo.block.header.height) + 1}
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
                <Col xs="12" md="6" style={{padding: 0}}>
                  <TitleDiv>Total Txs:</TitleDiv>
                </Col>
                <Col xs="12" md="6" style={{padding: 0}}>
                  {blockInfo.block.header.num_txs}
                </Col>
              </Row>
            </Col>

            <Col xs="12" md="6" style={{padding: 0}}>
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
                  <Col xs="12" md="6" style={{padding: 0}}>
                    <TitleDiv>Proposer :</TitleDiv>
                  </Col>
                  <Col xs="12" md="6" style={{padding: 0}}>
                    <Link href={`/validator-profile/${blockInfo.block.header.proposer_address}/${blockInfo.block.header.height}`}
                          style={{cursor: 'pointer', color: '#7bcc3a'}}>
                      {blockInfo.block.header.proposer_address}
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
                  <Col xs="12" md="6" style={{padding: 0}}>
                    <TitleDiv>Time:</TitleDiv>
                  </Col>
                  <Col xs="12" md="6" style={{padding: 0}}>
                    {moment(blockInfo.block.header.time).format("YYYY-MM-DD HH:mm:ss")}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <Row
            style={{
              margin: 0,
              background: '#fff',
              color: '#000',
            }}
          >
            <Col xs="12" md="12" style={{padding: 0}}>
              <Row
                style={{
                  padding: '10px 20px',
                  borderBottom: 'solid .5px rgba(255, 255, 255, .5)',
                  margin: 0,
                  background: '#fff',
                  color: '#000',
                }}
              >
                <Col xs="12" md="3" style={{padding: 0}}>
                  Transactions Hash:
                </Col>

                <Col xs="12" md="9" className="fix-tablet" style={{padding: 0}}>
                  {blockInfo.block.data.txhashes ? (
                    blockInfo.block.data.txhashes.map((tx, i) => (
                      <div key={i}>
                        <div className="tx-list">
                          <Link href={`/transaction/${tx}`}
                                style={{color: 'rgb(123, 204, 58)', display: 'flex', alignItems: 'center'}}>
                            <div>{tx}</div>
                          </Link>

                          <CopyToClipboard text={tx}>
                            <FontAwesomeIcon icon={faCopy} style={{
                              cursor: 'pointer',
                              color: 'rgb(179, 179, 179)',
                              marginLeft: '5px'
                            }}/>
                          </CopyToClipboard>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{fontStyle: 'italic'}}>Empty</div>
                  )}
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
  blockInfo: PropTypes.object,
  transactions: PropTypes.array,
  history: PropTypes.object,
  loadData: PropTypes.func,
};

export default withRouter(PrettyDetail);
