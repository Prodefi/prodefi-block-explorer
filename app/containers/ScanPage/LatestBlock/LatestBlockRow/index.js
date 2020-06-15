// Core
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import moment from 'moment';

// Utils
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCube, faBars} from '@fortawesome/free-solid-svg-icons';
import {Badge, Col, Row} from 'reactstrap';

// Styles
import {Link, ItemContainer, TextSpan} from './styles';
import StringMiddleTruncate from "../../../../components/StringMiddleTruncate";

class LatestBlockRow extends PureComponent {

  render() {
    const {block, iteration} = this.props;

    return (
      <ItemContainer iteration={iteration}>
        <Row>

          <Col xs="12" sm="12" md="12" lg="4" className="custom-mobile">

            <TextSpan className="text-span-icon">
              <FontAwesomeIcon icon={faCube} style={{cursor: 'pointer', marginRight: '5px'}}/>
              <Link href={`/block/${block.block.header.height}`}>
                <span style={{color: '#7bcc3a'}}>
                  <Badge color="success">{block.block.header.height}</Badge>
                </span>
              </Link>
            </TextSpan>
            <TextSpan style={{color: '#717171'}}>{moment(block.block.header.time).format("YYYY-MM-DD HH:mm:ss")}</TextSpan>

          </Col>

          <Col xs="12" sm="12" md="12" lg="6">

            <TextSpan className="text-span-icon">
              <div style={{marginRight: '5px'}}>Block Hash:</div>
              <Link style={{color: '#7bcc3a'}} href={`/block/${block.block.header.height}`}>
                <StringMiddleTruncate text={block.block_meta.block_id.hash}/>
              </Link>
            </TextSpan>

            <TextSpan className="text-span-icon">
              <div style={{marginRight: '5px'}}>Proposer Address:</div>
              <Link style={{color: '#7bcc3a'}} href={`/validator-profile/${block.block.header.proposer_address}/${block.block.header.height}`}>
                <StringMiddleTruncate text={block.block.header.proposer_address}/>
              </Link>
            </TextSpan>
          </Col>

          <Col xs="12" sm="12" md="12" lg="2" style={{marginLeft: 'auto'}}>

            <TextSpan className="custom-total">
              <span style={{color: '#77838f', marginRight: '5px'}}>Total tx: </span>
              <span style={{color: '#77838f'}}>{block.block.header.num_txs}</span>
            </TextSpan>

          </Col>
        </Row>
      </ItemContainer>
    );
  }
}

LatestBlockRow.propTypes = {
  block: PropTypes.object,
  toggleModal: PropTypes.func,
  iteration: PropTypes.number,
  history: PropTypes.object,
};

export default withRouter(LatestBlockRow);
