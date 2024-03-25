import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "./config/authConfig";

import App from "./app/App";
import "./index.css";

const msalInstance = new PublicClientApplication(msalConfig);

if (
  !msalInstance.getActiveAccount() &&
  msalInstance.getAllAccounts().length > 0
) {
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    console.log("login success");

    const { account } = event.payload;
    msalInstance.setActiveAccount(account);
  }
});

const router = createBrowserRouter([
  {
    path: "*",
    element: <App instance={msalInstance} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
