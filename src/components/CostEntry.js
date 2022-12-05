import React from "react";

const CostEntry = (props) => {
  const clickHandler = () => {
    props.deleteHandler(props.cost.id);
  };

  return (
    <li className="main-page__content-center-stats" onClick={clickHandler}>
      <div>{props.cost.price}</div>
      <div>{props.cost.category}</div>
      <div>{props.cost.date}</div>
      <div>{props.cost.description}</div>
      <div>{props.cost.user}</div>
    </li>
  );
};

export default CostEntry;
