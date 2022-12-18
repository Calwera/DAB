import React, { useRef, Fragment, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";

const ShowModal = (props) => {
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
      let costArrayAndCondition = {
        dateFrom: dateFrom.current.value,
        dateTo: dateTo.current.value,
        category: category.current.value,
      };

      await onValue(data, (snapshot) => {
        const dataSnapshot = snapshot.val();
        const array = Object.keys(dataSnapshot).map((key) => {
          return { ...dataSnapshot[key], id: key };
        });

        costArrayAndCondition.cost = array;
        props.onDisplaySavedCost(costArrayAndCondition);
      });
      navigate("/cost");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <div className="popup active">
        <div className="popup__header">
          <h2 className="popup__title">Wyświetl zawartość</h2>
          <Link to="/">
            <button className="popup__close-button">&times;</button>
          </Link>
        </div>
        <form className="popup__form" onSubmit={submitHandler}>
          <div>
            <label htmlFor="category" className="popup__form-select">
              Kategoria wydatków
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
            OD <input type="date" ref={dateFrom} required />
          </label>
          <label>
            Do <input type="date" ref={dateTo} required />
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

export default ShowModal;
