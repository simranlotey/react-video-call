import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SocketContext } from "./context/Context";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/reset.css';

ReactDOM.render(
  <React.StrictMode>
    <SocketContext>
      <App />
    </SocketContext>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
