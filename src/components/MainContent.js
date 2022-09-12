import React from "react";
import CostEntry from "./CostEntry";

const MainContent = (props) => {
  return (
    <div className="main-page__content-center-stats">
      {/* <div className="main-page__content-center-stats-income">
        <div className="main-page__content-center-stats-income-name">
          Dochody
        </div>
        <div className="main-page__content-center-stats-income-number">
          8032
          <button className="popup__close-button">+</button>
        </div>
      </div>

      <div className="main-page__content-center-stats-outcome">
        <div className="main-page__content-center-stats-outcome-name">
          Koszty
        </div>
        <div className="main-page__content-center-stats-outcome-number">
          5012
          <button className="popup__close-button">+</button>
        </div>
      </div>

      <div className="main-page__content-center-stats-total">
        <div className="main-page__content-center-stats-total-name">
          Dochód/Strata
        </div>
        <div className="main-page__content-center-stats-total-number">
          3020
          <button className="popup__close-button">+</button>
        </div>
      </div> */}
      {props.costAdded.map((item) => (
        <CostEntry cost={item} />
      ))}
    </div>
  );
};

export default MainContent;
