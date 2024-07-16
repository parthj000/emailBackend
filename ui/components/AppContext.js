import React, { createContext, useState } from "react";

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [Kapa, setKapa] = useState("vcvkcmvmkcvkcmvk");

  return (
    <MyContext.Provider value={{ Kapa, setKapa }}>
      {children}
    </MyContext.Provider>
  );
};
