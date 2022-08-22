import React from "react";
import LoginForm from "./LoginForm";
const LoginScreen = () => {
  return (
    <div className="general">
      <h2 className="general--title">DOMOWA APLIKACJA BUDŻETU</h2>
      <div className="general--board">
        <img
          src="/icons/dab_main.svg"
          alt="App Logo"
          className="general--appicon"
        />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginScreen;
