import React from "react";
import "../../../css/style.css";

const Card = (props) => {
  return (
    <div className={`background-image props.className`}>{props.children}</div>
  );
};

export default Card;
