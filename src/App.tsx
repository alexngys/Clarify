import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import ClarityConvert from "./pages/ClarityConvert";
import SolidtyConvert from "./pages/SolidtyConvert";
import ClarityBreakdown from "./pages/ClarityBreakdown";
import ClarityAudit from "./pages/ClarityAudit";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/ClarityBreakdown/:clarityAddress"
          element={<ClarityBreakdown />}
        />

        <Route path="/" element={<Home />} />
        <Route
          path="/ClarityConvert/:clarityAddress"
          element={<ClarityConvert />}
        />
        <Route
          path="/SolidtyConvert/:clarityAddress"
          element={<SolidtyConvert />}
        />
        <Route path="/ClarityAudit" element={<ClarityAudit />} />
      </Routes>
    </div>
  );
}

export default App;
