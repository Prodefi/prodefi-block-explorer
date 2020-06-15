import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class StringMiddleTruncate extends PureComponent {

  render() {
    const {text} = this.props;
    let currentWidth = window.innerWidth;
    let first6Char = text.slice(0, 8);
    let last6Char = text.slice(text.length - 8);

    if (currentWidth < 1440 && currentWidth > 767) {
      first6Char = text.slice(0, 6);
      last6Char = text.slice(text.length - 6);
    }

    return (
      <div>{first6Char + '...' + last6Char}</div>
    );
  }
}

StringMiddleTruncate.propTypes = {
  text: PropTypes.string
};
