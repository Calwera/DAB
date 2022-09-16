import React, { useRef } from "react";

const ShowModal = (props) => {
  const category = useRef();
  const date = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://domowa-aplikacja-budzetu-44d26-default-rtdb.europe-west1.firebasedatabase.app/cost.json"
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Cannot fetch data");
      }

      const array = Object.keys(data)
        .map((key) => data[key])
        .reduce((acc, val) => [...acc, ...val]);
      const costArrayAndCondition = {
        cost: array,
        date: date.current.value,
        category: category.current.value,
      };

      props.onDisplaySavedCost(costArrayAndCondition);
      props.closeDisplayModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="popup active">
      <div className="popup__header">
        <h2 className="popup__title">Wyświetl zawartość</h2>
        <button
          className="popup__close-button"
          onClick={props.closeDisplayModal}
        >
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
            <option value="Wszystko">wszystko</option>
          </select>
        </div>
        <div>
          <label>
            Wprowadź date
            <input type="date" ref={date} />
          </label>
        </div>
        <button className="btn">Pokaż</button>
      </form>
    </div>
  );
};

export default ShowModal;
