import React from "react";

const CostEntry = (props) => {
  const clickHandler = () => {
    props.deleteHandler(props.cost.id);
  };
  return (
    <ul className="main-page__content-center-stats" onClick={clickHandler}>
      <div>{props.cost.category}</div>
      <div>{props.cost.price}</div>
      <div>{props.cost.date}</div>
      <div>{props.cost.description}</div>
    </ul>
  );
};

export default CostEntry;
