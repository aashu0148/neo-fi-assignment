import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./Components/Auth/Auth";
import Navbar from "Components/Navbar/Navbar";

import "styles/global.scss";

function App() {
  return (
    <div className="main-app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="/*"
            element={
              <div className="spinner-container">
                <h1>Page not found!</h1>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
