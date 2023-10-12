import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import TokenContextProvider from "./Context/UserContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TokenContextProvider>
      <App />
    </TokenContextProvider>
  </React.StrictMode>
);
