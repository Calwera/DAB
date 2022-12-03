import React from "react";

const Alert = (props) => {
  return (
    <div className="alert">
      <h2 className="alert__header">{props.message}</h2>
      <button onClick={() => props.onDeleteHandler(props.id)}>Tak</button>
      <button onClick={() => props.onDeleteHandler(null)}>Nie</button>
    </div>
  );
};

export default Alert;
