import React from "react";
import useInput from "../hooks/use-input";

const LoginForm = () => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangedHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput((value) => value.trim() !== ""); //poprawic warunek

  let formIsValid = false;

  if (enteredNameIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) return;
    console.log(enteredName);
    nameReset();
  };

  const nameInputClasses = nameInputHasError
    ? " invalid"
    : "general--form__log-input";

  return (
    <form onSubmit={formSubmitHandler} className="general--form">
      <div className="general--form__first">
        <label htmlFor="log" className="general--form__login">
          Nazwa Uzytkownika
        </label>

        <input
          type="text"
          id="log"
          className={nameInputClasses}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
          placeholder="NAZWA UŻYTKOWNIKA"
        />
        {nameInputHasError && <p>Name must not be empty</p>}
        <label htmlFor="password" className="general--form__password">
          Hasło
          <input
            type="password"
            id="password"
            className="general--form__passw-field"
            placeholder="HASŁO"
          />
        </label>
        <button className="general--form__btn">Zaloguj</button>
      </div>
    </form>
  );
};

export default LoginForm;
