import { ref, onValue } from "firebase/database";
import { database } from "../../firebase";
import React, { Fragment } from "react";

const DeleteModal = (props) => {
  const deleteHandler = () => {
    const data = ref(database, "cost/");
    onValue(data, (snapshot) => {
      const data2 = snapshot.val();
      console.log(data2);
    });
    props.closeDeleteModal();
  };

  return (
    <Fragment>
      <div className="popup active" id="add">
        <div className="popup__header">
          <h2 className="popup__title">Usuń</h2>
          <button
            className="popup__close-button"
            onClick={props.closeDeleteModal}
          >
            &times;
          </button>
        </div>
        <button className="btn" onClick={deleteHandler}>
          Usuń
        </button>
      </div>
      <div
        className="popup__overlay active"
        onClick={props.closeDeleteModal}
      ></div>
    </Fragment>
  );
};

export default DeleteModal;
