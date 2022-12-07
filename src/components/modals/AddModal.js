import React, { Fragment, useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const isEmpty = (value) => value.trim() === "";
const isPositive = (value) => value > 0;

const AddModal = (props) => {
  const { currentUser } = useAuth();
  const category = useRef();
  const price = useRef();
  const date = useRef();
  const description = useRef();
  let navigate = useNavigate();
  const [formInputValidity, setFormValidity] = useState({
    category: true,
    price: true,
  });

  const todayDate = new Date().toISOString().split("T")[0];

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

    const enteredPrice = price.current.value;
    const enteredCategory = category.current.value;
    const categoryIsValid = !isEmpty(enteredCategory);
    const priceIsValid = !isEmpty(enteredPrice) && isPositive(enteredPrice);

    setFormValidity({
      category: categoryIsValid,
      price: priceIsValid,
    });

    const formIsValid = categoryIsValid && priceIsValid;

    if (!formIsValid) {
      return;
    }

    const costEntry = {
      category: enteredCategory,
      price: enteredPrice,
      date: date.current.value,
      description: description.current.value,
      key: Math.random().toString(),
      user: currentUser.email,
    };

    props.addCost(costEntry);
    navigate("/cost");
  };

  const costValid = formInputValidity.cost
    ? "invalid"
    : "general--form__log-input";

  const categoryValid = formInputValidity.category
    ? "popup__form-select"
    : "invalid";

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
            <label htmlFor="category" className={categoryValid}>
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
            {!formInputValidity.category && <p>Wybierz jakąś kategorie</p>}
          </div>
          <div>
            <label htmlFor="value">Kwota</label>
            {!formInputValidity.price && <p>Podaj poprawną kwotę.</p>}
            <input
              type="number"
              step="0.01"
              id="value"
              placeholder="0"
              ref={price}
            />
          </div>
          <div>
            <label>
              Wprowadź date
              <input type="date" ref={date} defaultValue={todayDate} />
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
