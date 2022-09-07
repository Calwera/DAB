import React, { useState } from "react";
import useInput from "../hooks/use-input";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangedHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput((value) => value.trim() !== ""); //poprawic warunek

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangedHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput((value) => value.trim() !== "");

  const { login, currentUser } = useAuth();

  let formIsValid = false;

  if (enteredNameIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) return;
    try {
      await login(enteredName, enteredPassword);
      nameReset();
      passwordReset();
      navigate("/");
    } catch {
      setError("Failed to log in");
    }
  };

  const nameInputClasses = nameInputHasError
    ? "invalid"
    : "general--form__log-input";

  const passwordInputClasses = passwordInputHasError
    ? "invalid"
    : "general--form__passw-field ";

  return (
    <form onSubmit={formSubmitHandler} className="general--form">
      <div className="general--form__first">
        {error && <p>{error}</p>}
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
            className={passwordInputClasses}
            placeholder="HASŁO"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
          />
          {passwordInputHasError && <p>Password must not be empty</p>}
        </label>
        <button className="general--form__btn" type="submit">
          Zaloguj
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
