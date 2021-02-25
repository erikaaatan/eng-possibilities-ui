import React from 'react';
import './InvestmentCategory.css'

class InvestmentCategory extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div className="investment">
                <div className="category">
                    <b>{this.props.category}</b>
                </div>
                
                <div className="arrows">
                    <div className="up"></div>
                    <div className="down"></div>
                </div>
                <div className="percent">
                    Test
                </div>
            </div>
        );
    }
}

export default InvestmentCategory;