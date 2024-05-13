import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { VideoCallProvider } from "./context/Context";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";
import "./index.css";

const root = document.getElementById("root");
const rootElement = createRoot(root);

rootElement.render(
  <React.StrictMode>
    <VideoCallProvider>
      <App />
    </VideoCallProvider>
  </React.StrictMode>
);
