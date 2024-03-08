import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "../components/Login/LoginPage";

function App() {
  return (
    <main className="box-border">
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </main>
  );
}

export default App;
