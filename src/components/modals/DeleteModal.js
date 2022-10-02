import { doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../../firebase";
import React, { Fragment } from "react";

const DeleteModal = (props) => {
  const costRef = doc(db, "cost", "-NC1s804Bce6i52vqeQ0");
  console.log(costRef);
  const deleteHandler = async () => {
    console.log("dzialam");
    const mes = await updateDoc(costRef, {
      category: deleteField(),
    });
    console.log(mes);
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
