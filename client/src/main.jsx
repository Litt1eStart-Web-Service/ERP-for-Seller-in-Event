import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App.jsx";
import "./index.css";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: ["Prompt", "sans-serif"].join(","),
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
