import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useMsal, MsalProvider, useIsAuthenticated } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import { loginRequest } from "../config/authConfig";

import LoginPage from "../components/Login/LoginPage";
import MainPage from "../components/Home/MainPage";
import ScheduleDetails from "../components/Schedule/ScheduleDetails";

function Pages() {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      instance
        .ssoSilent({
          ...loginRequest,
          loginHint: "",
        })
        .then((response) => {
          instance.setActiveAccount(response.account);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  async function handleRedirect() {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: "create",
      })
      .catch((error) => console.log(error));
  }

  return (
    <main className="box-border overflow-hidden font-sans">
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              onClickOutlookLogin={handleRedirect}
              handleLoginStatus={setIsLogin}
            />
          }
        />
        <Route
          path="/calendar"
          element={<MainPage />}
          // msalInstance={instance}
        />
        <Route
          path="/events/:eventId/editing"
          element={<ScheduleDetails key="editEvents" />}
        ></Route>
        <Route
          path="/events/confilcts/:eventId/editing"
          element={<ScheduleDetails key="conflictEvents" />}
        ></Route>
        <Route
          path="/events/new"
          element={<ScheduleDetails isNewEvent />}
        ></Route>
      </Routes>
    </main>
  );
}

function App({ instance }: { instance: IPublicClientApplication }) {
  return (
    <MsalProvider instance={instance}>
      <Pages />
    </MsalProvider>
  );
}

export default App;
