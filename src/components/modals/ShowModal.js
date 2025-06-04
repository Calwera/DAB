import React, { useRef, Fragment, useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";

const ShowModal = (props) => {
  const category = useRef();
  const dateFrom = useRef();
  const dateTo = useRef();
  const navigate = useNavigate();
  const [modalType, setModalType] = useState("Wydatek");

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
  }, [navigate]);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const dataPath = modalType === "Wydatek" ? "cost/" : "income/";
      const dataRef = ref(database, dataPath);
      const result = {
        dateFrom: dateFrom.current.value,
        dateTo: dateTo.current.value,
        category: category.current.value,
      };

      const snapshot = await get(dataRef);
      const dataSnapshot = snapshot.val();
      const array = dataSnapshot
        ? Object.keys(dataSnapshot).map((key) => ({
            ...dataSnapshot[key],
            id: key,
          }))
        : [];
      console.log("showmodal: ", array);
      if (modalType === "Wydatek") {
        result.cost = array;
      } else {
        result.income = array;
      }

      props.onDisplaySavedCost(result);
      navigate("/cost");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <div className="popup active">
        <div className="popup__header">
          <h2 className="popup__title">
            Wyświetl zawartość
            <select id="cat" onChange={(e) => setModalType(e.target.value)}>
              <option value="Wydatek">Wydatek</option>
              <option value="Przychod">Przychód</option>
            </select>
          </h2>
          <Link to="/">
            <button className="popup__close-button">&times;</button>
          </Link>
        </div>
        <form className="popup__form" onSubmit={submitHandler}>
          <div>
            <label htmlFor="category" className="popup__form-select">
              Kategoria {modalType === "Wydatek" ? "wydatków" : "przychodów"}
            </label>
            {modalType === "Wydatek" && (
              <select id="category" ref={category}>
                <option value="">Kategorie</option>
                <option value="Jedzenie">Jedzenie</option>
                <option value="Rachunki">Rachunki</option>
                <option value="Zakupy">Zakupy</option>
                <option value="Raty">Raty</option>
                <option value="Inne">Inne</option>
                <option value="Wszystko">wszystko</option>
              </select>
            )}
            {modalType === "Przychod" && (
              <select id="category" ref={category}>
                <option value="Pensja">Pensja</option>
                <option value="Inne">Inne</option>
                <option value="Sprzedaz">Sprzedaz</option>
                <option value="Wszystko">wszystko</option>
              </select>
            )}
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
