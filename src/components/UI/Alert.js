import React, { Fragment, useEffect } from "react";

const Alert = (props) => {
  console.log(props.message);
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        props.onDeleteHandler(null);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <Fragment>
      <div className="alert">
        <h2 className="alert__header">{props.message}</h2>
        <div className="alert__container">
          {props.id !== null && (
            <button
              className="alert__confirm"
              onClick={() => props.onDeleteHandler(props.id)}
            >
              Tak
            </button>
          )}
          {props.id !== null && (
            <button
              className="alert__cancel"
              onClick={() => props.onDeleteHandler(null)}
            >
              Nie
            </button>
          )}
          {props.id === 1 && (
            <button
              className="alert__confirm"
              onClick={() => props.onDeleteHandler(null)}
            >
              Ok
            </button>
          )}
        </div>
      </div>
      <div
        onClick={() => props.onDeleteHandler(null)}
        className="popup__overlay active"
      ></div>
    </Fragment>
  );
};

export default Alert;
