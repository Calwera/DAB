import React from "react";

const CostEntry = (props) => {
  return (
    <div>
      {props.cost.category} {props.cost.price}
    </div>
  );
};

export default CostEntry;
