import React, { useState, useContext } from "react";

const CostContext = React.createContext();

export const useCost = () => {
  return useContext(CostContext);
};

export function CostContextProvider({ children }) {
  const [cost, setCost] = useState("");

  const value = {
    cost: cost,
    setCost: setCost,
  };

  return <CostContext.Provider value={value}>{children}</CostContext.Provider>;
}
