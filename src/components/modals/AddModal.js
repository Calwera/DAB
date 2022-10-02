import React, { Fragment, useRef } from "react";

const AddModal = (props) => {
  const category = useRef();
  const price = useRef();
  const date = useRef();
  const description = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const costEntry = {
      category: category.current.value,
      price: price.current.value,
      date: date.current.value,
      description: description.current.value,
      id: Math.random().toString(),
    };

    props.addCost(costEntry);
    props.closeAddModal();
  };

  return (
    <Fragment>
      <div className="popup active" id="add">
        <div className="popup__header">
          <h2 className="popup__title">Dodaj koszt</h2>
          <button className="popup__close-button" onClick={props.closeAddModal}>
            &times;
          </button>
        </div>
        <form className="popup__form" onSubmit={submitHandler}>
          <div>
            <label htmlFor="category" className="popup__form-select">
              Kategoria kosztów
            </label>
            <select id="category" ref={category}>
              <option value="">Kategorie</option>
              <option value="Jedzenie">Jedzenie</option>
              <option value="Rachunki">Rachunki</option>
              <option value="Zakupy">Zakupy</option>
              <option value="Raty">Raty</option>
              <option value="Inne">Inne</option>
            </select>
          </div>
          <div>
            <label htmlFor="value">Kwota</label>
            <input
              type="number"
              step="0.01"
              id="value"
              placeholder="0"
              ref={price}
              required
            />
          </div>
          <div>
            <label>
              Wprowadź date
              <input type="date" ref={date} />
            </label>
          </div>
          <div>
            <label htmlFor="opis">Opis</label>
            <input
              type="text"
              id="opis"
              placeholder="zakupy"
              ref={description}
            />
          </div>
          <button className="btn">Zapisz</button>
        </form>
      </div>
      <div
        className="popup__overlay active"
        onClick={props.closeAddModal}
      ></div>
    </Fragment>
  );
};

export default AddModal;
