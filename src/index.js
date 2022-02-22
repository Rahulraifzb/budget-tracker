import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ExpenseProvider } from "./context/context";
import { SpeechProvider } from '@speechly/react-client'

const theme = createTheme();

ReactDOM.render(
  <ExpenseProvider>
    <ThemeProvider theme={theme}>
      <SpeechProvider appId="85aea0ac-e04e-4c73-b2e7-b07a443222d6" language="my-app-language">
        <App />
      </SpeechProvider>
    </ThemeProvider>
  </ExpenseProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
