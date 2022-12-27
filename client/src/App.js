import { Route, Routes } from "react-router-dom";
import "./app.css";
import React from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FindIDPW from "./pages/FindIDPW";
import LetterForm from "./pages/LetterForm";


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/findIdPw" element={<FindIDPW />} />
        <Route path="/letterForm" element={<LetterForm />} />
      </Routes>
    </div>
  );
}

export default App;