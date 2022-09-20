import React from "react";

const SummaryDisplay = (props) => {
  const { dateTo, dateFrom, category, amount } = props.summaryArray;

  return (
    <section className="summary">
      <div className="summary__label">
        <div>Kwota</div>
        <div>Od</div>
        <div>Do</div>
        <div>Kategoria</div>
      </div>
      <div className="summary__values">
        <div>{amount}</div>
        <div>{dateFrom}</div>
        <div>{dateTo}</div>
        <div>{category}</div>
      </div>
    </section>
  );
};

export default SummaryDisplay;
