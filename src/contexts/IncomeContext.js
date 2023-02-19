import React, { useState, useContext } from "react";

const IncomeContext = React.createContext();

export const useIncome = () => {
  return useContext(IncomeContext);
};

export function IncomeContextProvider({ children }) {
  const [income, setIncome] = useState("");

  const value = {
    income,
    setIncome,
  };

  return (
    <IncomeContext.Provider value={value}>{children}</IncomeContext.Provider>
  );
}
