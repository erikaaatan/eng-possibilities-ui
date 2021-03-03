import React from 'react';
import InvestmentCategory from './InvestmentCategory';
import './Portfolio.scss'
import {investments} from '../data'
import axios from 'axios'

class Portfolio extends React.Component {
    constructor(props) {
        super();
        this.state = {
            used: investments.reduce(function (acc, obj) { return acc + obj.minimum; }, 0),
            amounts: {},
            belowMinimumCount: 0
        }
        investments.forEach(investment => {this.state.amounts[investment.category] = investment.minimum})
        this.useMore = this.useMore.bind(this);
        this.useLess = this.useLess.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.setBelowMinimum = this.setBelowMinimum.bind(this);
    }

    setBelowMinimum(delta) {
        console.log(delta)
        this.setState({
            belowMinimumCount: this.state.belowMinimumCount+ delta
        })
      }

    useMore(category) {
        if (this.state.amounts[category] < 100 && this.state.used < 100) {
            this.setState( state => {
                var updatedUsed = state.used + 1
                console.log(state.amounts)
                var newAmounts = state.amounts
                newAmounts[category] = state.amounts[category] + 1

                return {
                    used: updatedUsed,
                    amounts: newAmounts
                }
            })
        }
    }

    useLess(category) {
        if (this.state.amounts[category] > 0 && this.state.used > 0) {

            this.setState( state => {
                var updatedUsed = state.used - 1
                var newAmounts = state.amounts

                newAmounts[category] = state.amounts[category] - 1

                return {
                    used: updatedUsed,
                    amounts: newAmounts
                }
            })
        }
    }

    sendRequest() {
        let url = "http://localhost:8080/api/v1/forecast"
        console.log("inside sendRequest")
        var mapping = {}
        investments.forEach(element => {
            console.log("PERCENTAGE " + this.state.amounts[element.category])
            mapping[element.category] = this.state.amounts[element.category]
        });
        console.log(mapping)
        axios.post(url, {"request":mapping}, {"Origin": "http://localhost:3000"}).then((response) => {
            this.props.updateData(response)
        })

    }


    render() {
        var invs = []
        investments.forEach((inv) => {
            invs.push(<InvestmentCategory setBelowMinimum={this.setBelowMinimum} category={inv.category} minimum={inv.minimum} useMore={this.useMore} useLess={this.useLess} percentage={this.state.amounts[inv.category]}/>)
        })

        return (

            <div className="portfolio">
                <div className="center">
                    <div className="topText">
                      <h6 className="portfolioTitle">My portfolio</h6>
                      <h1 className="value">$10,000</h1>
                    </div>
                    <div class="fraction-cards">
                        <div class="card">
                            {console.log("inside rendering, " + this.state.used)}
                            <p class="descriptor">Used</p>
                            <p class="number">{this.state.used}%</p>
                        </div>
                        <div class="card">
                            <p class="descriptor">Remaining</p>
                            <p class="number">{100-this.state.used}%</p>
                        </div>
                    </div>
                </div>
                
                <div className="investments">
                    {
                        invs
                    }
                </div>
                <div className="button">
                    <span onClick={this.state.belowMinimumCount > 0 ? null : this.sendRequest} class="enter" id={this.state.belowMinimumCount > 0 ? "disabled" : ""}>Update</span>
                </div>
          </div>

        );
    }
}

export default Portfolio;
