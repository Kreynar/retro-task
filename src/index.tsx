import React from "react";
import ReactDOM from "react-dom";
import { Root } from "./Root/Root";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { SprintEvaluationsProvider } from "./SprintEvaluationsProvider";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <SprintEvaluationsProvider>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </SprintEvaluationsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
