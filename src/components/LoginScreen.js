import React from "react";
import LoginForm from "./LoginForm";
import Card from "./UI/Card";
import { AuthProvider } from "../contexts/AuthContext";
const LoginScreen = () => {
  return (
    <Card>
      <AuthProvider>
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
      </AuthProvider>
    </Card>
  );
};

export default LoginScreen;
