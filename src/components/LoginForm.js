import React from "react";

const LoginForm = () => {
  return (
    <form action="POST" className="general--form">
      <div className="general--form__first">
        <label htmlFor="log" className="general--form__login">
          Nazwa Uzytkownika
          <input
            type="text"
            id="log"
            className="general--form__log-input"
            required
            placeholder="NAZWA UŻYTKOWNIKA"
          />
        </label>

        <label htmlFor="password" className="general--form__password">
          Hasło
          <input
            type="password"
            id="password"
            className="general--form__passw-field"
            placeholder="HASŁO"
          />
        </label>
        <input type="submit" className="general--form__btn" value="Zaloguj" />
      </div>
    </form>
  );
};

export default LoginForm;
