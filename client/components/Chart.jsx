import React, { Component } from 'react';
import echarts from 'echarts';
import elementResizeEvent from 'element-resize-event';

class Chart extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    style: { height: 300 },
    showLoading: false,
    bindEvents: {}
  }
  componentDidMount() {
    let chartObj = this.renderEChart();
    for (let event in this.props.bindEvents) {
      if (typeof event === 'string' && typeof bindEvents[event] === 'function') {
        chartObj.on(event, (params) => {
          bindEvents[event](params, chartObj);
        });
      }
    }
    elementResizeEvent(this.refs.chart, () => {
      chartObj.resize();
    });
  }
  componentDidUpdate() {
    this.renderEChart();
  }
  componentWillUnmount() {
    echarts.dispose(this.refs.chart);
  }
  renderEChart = () => {
    let chartObj =
            echarts.getInstanceByDom(this.refs.chart) ||
            echarts.init(this.refs.chart, this.props.theme);
    if (this.props.showLoading) {
      chartObj.showLoading();
    }
    chartObj.setOption(this.props.options);
    chartObj.hideLoading();
    return chartObj;
  }
  render() {
    return (
      <div ref="chart" className={this.props.className} style={this.props.style}></div>
    );
  }
}

Chart.PropTypes = {
  options: React.PropTypes.object.isRequired,
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  theme: React.PropTypes.string,
  showLoading: React.PropTypes.bool,
  bindEvents: React.PropTypes.object
};
