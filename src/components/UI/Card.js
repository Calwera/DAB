import React from "react";

const Card = (props) => {
  return (
    <div className={`background-image props.className`}>{props.children}</div>
  );
};

export default Card;
