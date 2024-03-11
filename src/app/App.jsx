import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "../components/Login/LoginPage";
import MainPage from "../components/Home/MainPage";

function App() {
  return (
    <main className="box-border">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<MainPage />} />
      </Routes>
    </main>
  );
}

export default App;
