import React from "react";

const SummaryDisplay = (props) => {
  const { dateTo, dateFrom, category, amount } = props.summaryArray;

  return (
    <section className="main-page__content-center-stats">
      <div className="main-page__content-center-stats-income-name">
        <div>Od</div>
        <div>Do</div>
        <div>Kategoria</div>
        <div>Kwota</div>
      </div>
      <div className="main-page__content-center-stats-income-name">
        <div>{dateFrom}</div>
        <div>{dateTo}</div>
        <div>{category}</div>
        <div>{amount}</div>
      </div>
    </section>
  );
};

export default SummaryDisplay;
