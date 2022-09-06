import React from "react";
import "../css/style.css";
import MainPage from "./components/MainPage";
import LoginScreen from "./components/LoginScreen";
import PrivateRoute from "./components/PrivateRoute";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route path="/login" exact element={<LoginScreen />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
