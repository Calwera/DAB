import React, { Fragment, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddModal = (props) => {
  const category = useRef();
  const price = useRef();
  const date = useRef();
  const description = useRef();
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

  const submitHandler = (event) => {
    event.preventDefault();
    const costEntry = {
      category: category.current.value,
      price: price.current.value,
      date: date.current.value,
      description: description.current.value,
      key: Math.random().toString(),
    };

    props.addCost(costEntry);
    navigate("/cost");
  };

  return (
    <Fragment>
      <div className="popup active" id="add">
        <div className="popup__header">
          <h2 className="popup__title">Dodaj koszt</h2>
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
      <Link to="/">
        <div className="popup__overlay active"></div>
      </Link>
    </Fragment>
  );
};

export default AddModal;
