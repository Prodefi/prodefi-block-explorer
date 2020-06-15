import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import NumberFormat from "react-number-format";

export function convertNumToWordFunc(number) {
  let SI_SYMBOL = ["", "K", "M", "B", "T"];
  let tier = Math.log10(number) / 3 | 0;
  if (tier === 0) {
    return number;
  } else if (tier > 4) {
    tier = 4;
  }
  let suffix = SI_SYMBOL[tier];
  let scale = Math.pow(10, tier * 3);
  let scaled = number / scale;
  if (scaled % 10 === 0) {
    return (
      <div>
        <NumberFormat value={scaled} displayType={'text'} thousandSeparator={true} prefix={''} />
        <span>{suffix}</span>
      </div>
    )
  }
  return (
    <div>
      <NumberFormat value={scaled.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={''}/>
      <span>{suffix}</span>
    </div>
  );
}

export default class PrettyNumber extends PureComponent {

  convertNumToWord = (number) => {
    let SI_SYMBOL = ["", "K", "M", "B", "T"];
    let tier = Math.log10(number) / 3 | 0;
    if (tier === 0) {
      return number;
    } else if (tier > 4) {
      tier = 4;
    }
    let suffix = SI_SYMBOL[tier];
    let scale = Math.pow(10, tier * 3);
    let scaled = number / scale;
    if (scaled % 10 === 0) {
      return scaled + suffix;
    }
    return scaled.toFixed(2) + suffix;
  };


  render() {
    const {num} = this.props;
    let result = this.convertNumToWord(num);

    return (
      <div>{result}</div>
    );
  }
}

PrettyNumber.propTypes = {
  num: PropTypes.number
};
