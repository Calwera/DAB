import React from "react";
import LoginForm from "./LoginForm";
import Card from "./UI/Card";

const LoginScreen = () => {
  return (
    <Card>
      <div className="general">
        <h1 className="general--title">DOMOWA APLIKACJA BUDŻETU</h1>
        <div className="general--board">
          <img
            src="/icons/dab_main.svg"
            alt="App Logo"
            className="general--appicon"
          />
          <LoginForm />
        </div>
      </div>
    </Card>
  );
};

export default LoginScreen;
