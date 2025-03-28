import { createTheme } from "@mui/material/styles";

// Світла тема
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#8e4585" },
    background: { default: "#f5f5f5", paper: "#fff" },
    text: { primary: "#000" },
  },
});

// Темна тема
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#bd78b2" },
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#fff" },
  },
});

export { lightTheme, darkTheme };
