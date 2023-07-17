import App from "./App";
import React from "react";
import { Provider } from 'react-redux';
import ReactDOM from "react-dom/client";
import store from "../see-you-letter/store/configureStore";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);