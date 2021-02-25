import React from "react";
import Portfolio from "../../components/Portfolio";
import Widget from "../../components/Widget";
import './Forecaster.css'

const ForecasterHome = () => {
  var titles = ['Investment Forecaster', 'Predicted Amount', 'Dollar Increase', 'Percent Increase']
  var descriptions = ['This page allows you to customize your investments and view the potential growth of $10,000 over a period of 10 years', '$15,128', '+ $5,128', '51.28%']
  var isnum = [false, true, true, true]
  var widgets = []
  for (var i = 0; i < titles.length; i++) {
    widgets.push(<Widget title={titles[i]} description={descriptions[i]} isNum={isnum[i]}/>)
  }
  return (
    <>
       <div>
            <div>
              <div class="portfolio-section">
                <Portfolio/>
              </div>
              <div class="not-portfolio-section">
                <div class="widgets-section">
                  {widgets}
                </div>
                <div class="graph-section">
                </div>
              </div>
            </div>
          </div>
    </>
  );
};

export default ForecasterHome;
