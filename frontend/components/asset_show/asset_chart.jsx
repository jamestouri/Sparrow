import React from 'react';
import { LineChart, Line, YAxis, CartesianAxis } from 'recharts';
import { getExternalInfo } from '../../util/asset_api_util';

class AssetChart extends React.Component {
  constructor(props){
    super(props);
    this.state = { chartData: [], timeFrame: "1D" };
    this.times = ['1D', '1M', '3M', '6M', '1Y', '2Y'];
    this.update = this.update.bind(this);
  }

  componentDidMount(){
    getExternalInfo(`chart/${this.state.timeFrame}`, this.props.asset).then((data) => {
      let mappedData = data.map((datum) => {
        return {date: datum.date, close: datum.close };
      });
      this.setState({ chartData: mappedData });
    });
  }

  update(field) {

    this.setState({ timeFrame: field }, () => {
      getExternalInfo(`chart/${this.state.timeFrame}`, this.props.asset).then((data) => {
        let mappedData = data.map((datum) => {
          return {date: datum.date, close: datum.close };
        });
        this.setState({ chartData: mappedData });
      });
    });
  }

  render () {
    let timeButtons = this.times.map((frame) => {
      return <button key={frame} className={this.state.timeFrame === frame ? "selected-time-frame" : ""}
        onClick={() => this.update(frame)}>{frame}</button>;
    });
    return (
      <div className="the-chart">
        <LineChart width={676} height={196} data={this.state.chartData}>
          <Line type="linear" dataKey="close" stroke="#00FF00" dot={false} animationDuration={0}/>
          <YAxis domain={['auto', 'auto']} hide={true}/>
        </LineChart>
        <ul>
          {timeButtons}
        </ul>
      </div>
    );
  }
}

export default AssetChart;
