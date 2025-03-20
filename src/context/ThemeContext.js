"use client";
import React, { createContext, useState, useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "@/styles/theme";

export const ThemeContext = createContext();

export function ThemeProviderWrapper({ children }) {
  const [themeMode, setThemeMode] = useState("light");

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () => (themeMode === "light" ? lightTheme : darkTheme),
    [themeMode]
  );

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
