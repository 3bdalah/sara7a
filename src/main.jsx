import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import TokenContextProvider from "./Context/UserContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./Redux/Store";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TokenContextProvider>
          <App />
        </TokenContextProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
