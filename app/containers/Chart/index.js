// Core
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './custom.css';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { transactionActions } from '../../bus/transactions/actions';
import { ChartContainer } from './styles';
import { ChartContainerItem, ChartItem } from '../ScanPage/style';

const moment = extendMoment(Moment);

const mapStateToProps = state => ({
  charTx: state.transactions.chartTx,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchTxCharts: transactionActions.fetchTxCharts,
    },
    dispatch
  ),
});

@connect(mapStateToProps, mapDispatchToProps)
class Chart extends PureComponent {
  constructor(props) {
    super(props);
  }

  getDayRange = () => {
    const from = moment()
      .subtract(1, 'days')
      .subtract(6, 'days');
    const to = moment().subtract(1, 'days');
    const range = moment.range(from, to);
    return Array.from(range.by('days')).map(m => m.format('DD-MM-YYYY'));
  };

  componentDidMount() {
    this.props.actions.fetchTxCharts();
  }

  render() {
    const {charTx} = this.props;
    const dateRange = this.getDayRange();

    const chartOptions = {
      colors: ['#7bcc3a'],
      title: {
        text: 'Transactions',
        style: {
          color: '#7bcc3a',
          fontWeight: 'bold',
        },
        align: 'left',
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        categories: dateRange,
      },
      yAxis: {
        title: '',
      },
      series: [
        {
          name: 'Txs',
          data: charTx.slice(0,7),
        },
      ],
      legend: {
        enabled: false,
      },
    };

    return (
      <ChartContainer>
        <ChartContainerItem>
          <ChartItem>
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
              containerProps={{className: 'chartTarget'}}
            />
          </ChartItem>
        </ChartContainerItem>
      </ChartContainer>
    );
  }
}

Chart.propTypes = {
  producers: PropTypes.array,
  history: PropTypes.any,
  latestTransactionHeight: PropTypes.any,
  totalTx: PropTypes.any,
  countTPS: PropTypes.any,
};

export default withRouter(Chart);
