import React from "react";
import "../css/style.css";
import MainPage from "./components/MainPage";
import LoginScreen from "./components/LoginScreen";
import PrivateRoute from "./components/PrivateRoute";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CostContextProvider } from "./contexts/CostContext";

function App() {
  return (
    <AuthProvider>
      <CostContextProvider>
        <Routes>
          <Route
            path="*"
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" exact element={<LoginScreen />} />
        </Routes>
      </CostContextProvider>
    </AuthProvider>
  );
}

export default App;
