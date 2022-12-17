import React from "react";
import { useNavigate } from "react-router-dom";

const SummaryDisplay = (props) => {
  const { dateTo, dateFrom, category, amount } = props.summaryArray;
  const navigate = useNavigate();

  const quitHandler = () => {
    props.deleteSummary();
    navigate("/");
  };
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
      <button className="button-big confirm" onClick={quitHandler}>
        Wyjdz
      </button>
    </section>
  );
};

export default SummaryDisplay;
