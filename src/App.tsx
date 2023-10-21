import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
