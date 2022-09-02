import React from "react";
import "../css/style.css";
import Card from "./components/UI/Card";
import LoginScreen from "./components/LoginScreen";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Card>
        <LoginScreen />
      </Card>
    </AuthProvider>
  );
}

export default App;
