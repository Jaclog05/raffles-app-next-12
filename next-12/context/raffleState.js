'use client'

import { createContext, useContext, useState } from "react";

const Context = createContext();

export function ThemeProvider({ children }) {

  const [raffleInfo, setRaffleInfo] = useState({
    rafflesArray: []
  });

  return (
    <Context.Provider value={[raffleInfo, setRaffleInfo]}>
        {children}
    </Context.Provider>
  );
}

export function useThemeContext() {
  return useContext(Context);
}