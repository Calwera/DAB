import React, { Fragment } from "react";

const AddModal = (props) => {
  return (
    <Fragment>
      <div className="popup active" id="add">
        <div className="popup__header">
          <h2 className="popup__title">Dodaj koszt</h2>
          <button className="popup__close-button" onClick={props.closeAddModal}>
            &times;
          </button>
        </div>
        <form className="popup__form">
          <div>
            <label htmlFor="category" className="popup__form-select">
              Kategoria kosztów
            </label>
            <select id="category">
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
              required
            />
          </div>
          <div>
            <label>
              Wprowadź date
              <input type="date" />
            </label>
          </div>
          <div>
            <label htmlFor="opis">Opis</label>
            <input type="text" id="opis" placeholder="zakupy" />
          </div>
          <button className="btn">Wyslij</button>
        </form>
      </div>
      <div className="popup__overlay"></div>
    </Fragment>
  );
};

export default AddModal;
