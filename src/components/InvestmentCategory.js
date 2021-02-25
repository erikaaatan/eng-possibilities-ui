import React from 'react';
import './InvestmentCategory.css'

class InvestmentCategory extends React.Component {
    constructor(props) {
        super();
        this.minimum = props.minimum
        this.state = {
            percentage: this.minimum
        }
        this.increasePercent = this.increasePercent.bind(this);
        this.decreasePercent = this.decreasePercent.bind(this);
    }

    increasePercent() {
        if (this.state.percentage < 100) {
            this.setState(state => ({
                percentage: state.percentage + 1
            }));
            this.props.useMore()
        }
    }

    decreasePercent() {
        if (this.state.percentage > 0) {
            this.setState(state => ({
                percentage: state.percentage - 1
            }));
            this.props.useLess()
        }
        
    }

    render() {
        return (
            <div className="investment">
                <div className="category">
                    <b>{this.props.category}</b>
                </div>
                
                <div className="arrows">
                    <div className="up" onClick={this.increasePercent}></div>
                    <div className="down" onClick={this.decreasePercent}></div>
                </div>
                <div className="percent">
                    {this.state.percentage}.00 %
                </div>
            </div>
        );
    }
}

export default InvestmentCategory;