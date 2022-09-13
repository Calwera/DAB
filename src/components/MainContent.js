import React from "react";
import CostEntry from "./CostEntry";

const MainContent = (props) => {
  const deleteItem = (id) => {
    props.filterCostArray(id);
  };

  return (
    <li className="main-page__content-center">
      {props.costArray.map((item) => (
        <CostEntry cost={item} key={item.id} deleteHandler={deleteItem} />
      ))}
    </li>
  );
};

export default MainContent;
