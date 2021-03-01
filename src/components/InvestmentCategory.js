import React from 'react';
import './InvestmentCategory.scss'

class InvestmentCategory extends React.Component {
    constructor(props) {
        super();
        this.minimum = props.minimum
        this.state = {
            belowMinimum: false 
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentdidupdate")

        if (prevProps.percentage != this.props.percentage) {
            console.log("hI")
            if (this.props.percentage < this.minimum) {
                if (!this.state.belowMinimum) {
                    this.setState({
                        belowMinimum: true
                    })
                    this.props.setBelowMinimum(1)
                }
            }
            else {
                if (this.state.belowMinimum) {
                    this.setState({
                        belowMinimum: false
                    })
                    this.props.setBelowMinimum(-1)
                }
            }
        }
    }

    render() {
        return (
            <div className="investment">
                <div className="category">
                    <b>{this.props.category}</b>
                    {this.state.belowMinimum ? 
                    <span className="tool" data-icon="❗"><span className="tooltiptext">Minimum: {this.minimum}%</span></span> : <span></span>
                    }
                    
                </div>
                <div className="percent" id={this.state.belowMinimum ? "red" : "black"}>
                    {this.props.percentage}.00 %
                </div>
                <div className="arrows">
                    <div className="up" onClick={() => this.props.useMore(this.props.category)}></div>
                    <div className="down" onClick={() => this.props.useLess(this.props.category)}></div>
                </div>
            </div>
        );
    }
}

export default InvestmentCategory;