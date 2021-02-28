import React from 'react';
import InvestmentCategory from './InvestmentCategory';
import './Portfolio.scss'
import {investments} from '../data'
import axios from 'axios'

class Portfolio extends React.Component {
    constructor() {
        super();
        this.state = {
            used: investments.reduce(function (acc, obj) { return acc + obj.minimum; }, 0),
            amounts: {}
        }
        investments.forEach(investment => {this.state.amounts[investment.category] = investment.minimum})
        this.useMore = this.useMore.bind(this);
        this.useLess = this.useLess.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        console.log(this.state.amounts)
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
            console.log("inside useless")

            this.setState( state => {
                console.log("USED " + state.used)
                var updatedUsed = state.used - 1
                console.log("UPDATED USED " + updatedUsed)
                // var newAmounts = new Map([state.amounts])
                var newAmounts = state.amounts
            
                newAmounts[category] = state.amounts[category] - 1

                console.log(newAmounts)
    
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
            console.log(response)
        })

    }


    render() {
        var invs = []
        investments.forEach((inv) => {
            invs.push(<InvestmentCategory category={inv.category} minimum={inv.minimum} useMore={this.useMore} useLess={this.useLess} percentage={this.state.amounts[inv.category]}/>)
        })
        console.log("rendering")
        
        return (
            <div className="portfolio">
                <div class="center">
                    <h5>My portfolio</h5>
                    <h1>$10,000</h1>
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
                <div className="spacer">
                </div>
                <div>
                    {
                        invs
                    }
                </div>
                <button className="enter" onClick={this.sendRequest}>
                    Get estimate
                </button>
            </div>
        );
    }
}

export default Portfolio;