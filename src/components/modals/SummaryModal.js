import React, { useRef } from "react";

const SummaryModal = (props) => {
  const category = useRef();
  const dateFrom = useRef();
  const dateTo = useRef();

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

      const conditions = {
        category: category.current.value,
        dateFrom: dateFrom.current.value,
        dateTo: dateTo.current.value,
      };

      const array = Object.keys(data)
        .map((key) => data[key])
        .reduce((acc, val) => [...acc, ...val]);

      if (conditions.category === "Wszystko") {
        const totalAmount = array
          .filter(
            (item) =>
              item.date >= conditions.dateFrom && item.date <= conditions.dateTo
          )
          .reduce((prev, curr) => prev + +curr.price, 0);
        const summary = { ...conditions, amount: totalAmount };
        props.onSummaryShow(summary);
      } else {
        const totalAmount = array
          .filter(
            (item) =>
              item.category === conditions.category &&
              item.date >= conditions.dateFrom &&
              item.date <= conditions.dateTo
          )
          .reduce((prev, curr) => prev + +curr.price, 0);
        const summary = { ...conditions, amount: totalAmount };
        props.onSummaryShow(summary);
      }
      props.closeSummaryModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="popup active">
      <div className="popup__header">
        <h2 className="popup__title">Podsumuj</h2>
        <button
          className="popup__close-button"
          onClick={props.closeSummaryModal}
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
            Wprowadź zakres dat
            <input type="date" ref={dateFrom} required />
            <input type="date" ref={dateTo} required />
          </label>
        </div>
        <button className="btn">Pokaż</button>
      </form>
    </div>
  );
};

export default SummaryModal;
