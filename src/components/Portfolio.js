import React from 'react';
import InvestmentCategory from './InvestmentCategory';
import './Portfolio.css'

class Portfolio extends React.Component {
    constructor() {
        super();
    }

    render() {
        const categories = ['Energy', 'Technology', 'Financial Services', 'Real Estate', 'Pharmaceutical', 'Airline', 'Gaming', 'Retail']
        const investments = []
        for (const [index, value] of categories.entries()) {
            investments.push(<InvestmentCategory category={value}/>)
          }
        return (
            <div className="portfolio">
                <div class="center">
                    <h5>My portfolio</h5>
                    <h1>$10,000</h1>
                    <div class="fraction-cards">
                        <div class="card">
                            <p class="descriptor">Used</p>
                            <p class="number">82%</p>
                        </div>
                        <div class="card">
                            <p class="descriptor">Remaining</p>
                            <p class="number">18%</p>
                        </div>
                    </div>
                </div>
                <div className="spacer">
                </div>
                <div className="test2">
                    {
                        investments
                    }
                </div>
                
            </div>
        );
    }
}

export default Portfolio;