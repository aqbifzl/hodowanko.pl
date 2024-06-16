import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ActivityTracker } from "./ActivityTracker";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(<React.StrictMode>
  <BrowserRouter>
    <ActivityTracker>
      <App />
    </ActivityTracker>
  </BrowserRouter>
</React.StrictMode>);
