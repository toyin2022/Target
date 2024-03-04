import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./stateManager/index.ts";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/sonner";

import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container as Element);

// const root = ReactDOM.createRoot(document.getElementById("root")!);

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

root.render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster className="bg-slate-800 " richColors />
      </PersistGate>
    </Provider>
  </>
);
