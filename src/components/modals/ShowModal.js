import React, { useRef, Fragment } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase";

const ShowModal = (props) => {
  const category = useRef();
  const dateFrom = useRef();
  const dateTo = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const data = ref(database, "cost/");
      let costArrayAndCondition = {
        dateFrom: dateFrom.current.value,
        dateTo: dateTo.current.value,
        category: category.current.value,
      };

      await onValue(data, (snapshot) => {
        const data2 = snapshot.val();
        const array = Object.keys(data2).map((key) => {
          return { ...data2[key], id: key };
        });
        costArrayAndCondition.cost = array;
        props.onDisplaySavedCost(costArrayAndCondition);
      });

      props.closeDisplayModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
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
              Wprowadź zakres dat
              <input type="date" ref={dateFrom} required />
              <input type="date" ref={dateTo} required />
            </label>
          </div>
          <button className="btn">Pokaż</button>
        </form>
      </div>
      <div
        className="popup__overlay active"
        onClick={props.closeDisplayModal}
      ></div>
    </Fragment>
  );
};

export default ShowModal;
