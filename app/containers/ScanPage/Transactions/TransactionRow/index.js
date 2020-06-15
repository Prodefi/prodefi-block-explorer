// Core
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Utils
import { stringHandler } from '../../../../utils/stringHandler';

// Styles
import { Link, ItemContainer, TextSpan } from './styles';

class TransactionRow extends PureComponent {
  toggleAccountInfoModal = e => {
    const { history } = this.props;

    history.push(`/account/${e.target.textContent}`);
  };

  toggleBlockInfoModal = () => {
    const { history } = this.props;

    history.push(`/block/${this.props.transaction.c1}`);
  };

  toggleTransactionInfoModal = () => {
    const { history } = this.props;

    history.push(`/transaction/${this.props.transaction.c0}`);
  };

  render() {
    const {
      transaction: { c0, c1, c2, c3, c4, c5, c6 },
      iteration,
    } = this.props;

    return (
      <ItemContainer iteration={iteration}>
        <TextSpan style={{ maxWidth: '75px' }}>
          <Link onClick={this.toggleTransactionInfoModal}>{c0}</Link>
        </TextSpan>
        <TextSpan>
          <Link onClick={this.toggleBlockInfoModal}>{c1}</Link>
        </TextSpan>
        <TextSpan>{c2}</TextSpan>
        <TextSpan>{stringHandler(c3, this.toggleAccountInfoModal)}</TextSpan>
        <TextSpan style={{ maxWidth: '300px' }}>{stringHandler(c4, this.toggleAccountInfoModal)}</TextSpan>
        <TextSpan style={{ maxWidth: '300px' }}>{stringHandler(c5, this.toggleAccountInfoModal)}</TextSpan>
        <TextSpan>{c6}</TextSpan>
      </ItemContainer>
    );
  }
}

TransactionRow.propTypes = {
  transaction: PropTypes.object,
  toggleModal: PropTypes.func,
  iteration: PropTypes.number,
  history: PropTypes.object,
};

export default withRouter(TransactionRow);
