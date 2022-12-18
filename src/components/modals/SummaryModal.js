import React, { useRef, Fragment, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";

const SummaryModal = (props) => {
  const category = useRef();
  const dateFrom = useRef();
  const dateTo = useRef();
  let navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        navigate("/");
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const data = ref(database, "cost/");
      const conditions = {
        category: category.current.value,
        dateFrom: dateFrom.current.value,
        dateTo: dateTo.current.value,
      };

      await onValue(data, (snapshot) => {
        const dataSnapshot = snapshot.val();
        const array = Object.keys(dataSnapshot).map((key) => {
          return { ...dataSnapshot[key], id: key };
        });

        if (conditions.category === "Wszystko") {
          const totalAmount = array
            .filter(
              (item) =>
                item.date >= conditions.dateFrom &&
                item.date <= conditions.dateTo
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
      });
      navigate("/summary");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <div className="popup active">
        <div className="popup__header">
          <h2 className="popup__title">Podsumuj</h2>
          <Link to="/">
            <button className="popup__close-button">&times;</button>
          </Link>
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
          <label>Wprowadź zakres dat</label>
          <label>
            Od
            <input type="date" ref={dateFrom} required />
          </label>
          <label>
            Do
            <input type="date" ref={dateTo} required />
          </label>

          <button className="btn">Pokaż</button>
        </form>
      </div>
      <Link to="/">
        <div className="popup__overlay active"></div>
      </Link>
    </Fragment>
  );
};

export default SummaryModal;
