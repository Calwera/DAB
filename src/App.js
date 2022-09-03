import React from "react";
import "../css/style.css";
import MainPage from "./components/MainPage";
import LoginScreen from "./components/LoginScreen";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" exact element={<LoginScreen />} />
    </Routes>
  );
}

export default App;
