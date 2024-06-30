import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "../redux/store.ts";

import RouteApp from "../routers/RouteApp.tsx";

function Providers() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <RouteApp />
      </PersistGate>
    </Provider>
  );
}

export default Providers;
