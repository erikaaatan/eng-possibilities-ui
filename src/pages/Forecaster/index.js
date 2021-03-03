import React from "react";
import Portfolio from "../../components/Portfolio";
import Widget from "../../components/Widget";
import './Forecaster.scss'
import "react-vis/dist/style.css";
import {makeWidthFlexible, makeHeightFlexible, XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, Crosshair} from 'react-vis';

class ForecasterHome extends React.Component {
  constructor(props) {
      super();
      this.state = {
        crosshairValues: [],
        predictedAmount: 10000,
        DATA: [
          [
            {x: 0, y:10000}
          ],
        ]
      }
      this.getDollarInc = this.getDollarInc.bind(this)
      this.getPercentInc = this.getPercentInc.bind(this)
      this.updateData = this.updateData.bind(this)
  }

  getDollarInc() {
    return +((this.state.predictedAmount - 10000).toFixed(2));
  }

  getPercentInc() {
    return +((((this.state.predictedAmount / 10000) - 1) * 100).toFixed(2));
  }

  updateData(response) {
    var values = JSON.parse(response.request.response)['response']
    var newData = []
    for (var i = 0; i < values.length; i++) {
      console.log("pushing")
      newData.push({x: i, y: +(values[i].toFixed(2))})
    }
    this.setState({
      DATA: [
        newData
      ],
      predictedAmount: newData[newData.length-1].y
    })
  }

  render() {
    const options = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    };

    const FlexibleXYPlot = makeHeightFlexible(makeWidthFlexible(XYPlot))
    var titles = ['Investment Forecaster', 'Predicted Amount', 'Dollar Increase', 'Percent Increase']
    var descriptions = [
      'This page allows you to customize your investments and view the potential growth of $10,000 over a period of 10 years',
      '$' + this.state.predictedAmount.toLocaleString("en", options),
      '+ $' + this.getDollarInc().toLocaleString("en", options),
      '' + this.getPercentInc() + '%'
    ]
    var isnum = [false, true, true, true]
    var widgets = []
    for (var i = 0; i < titles.length; i++) {
      widgets.push(<Widget title={titles[i]} description={descriptions[i]} isNum={isnum[i]}/>)
    }
    return (
      <>
         <div className="body">

                <div class="portfolio-section">
                  <Portfolio updateData={this.updateData} setBelowMinimum={this.setBelowMinimum}/>
                </div>
                <div class="not-portfolio-section">
                  <div class="widgets-section">
                    {widgets}
                  </div>
                  <div class="graph-section">
                    <FlexibleXYPlot
                    margin={{left: 70, right: 50, top: 10, bottom: 50}}
                    onMouseLeave={() => this.setState({crosshairValues: []})}
                    >
                      <HorizontalGridLines />
                      <LineSeries
                        onNearestX={(value, {index}) =>
                      this.setState({crosshairValues: this.state.DATA.map(d => d[index])})}
                        data={this.state.DATA[0]}
                        color="#6D9A7D"/>
                        <Crosshair values={this.state.crosshairValues}/>
                      <XAxis xDomain={[0, 11]}/>
                      <YAxis yDomain={[0, 50000]}/>
                    </FlexibleXYPlot>
                  </div>
                </div>
              
            </div>
      </>
    );
  }
}

export default ForecasterHome;
