import React from "react";
import { Route, Routes } from "react-router-dom";


import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FindIdPw from "./pages/FindIdPw";
import LetterForm from "./pages/LetterForm";


function App({ auth }) {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login auth={auth} />} />
        <Route path="/signup" element={<Signup auth={auth} />} />
        <Route path="/findIdPw" element={<FindIdPw auth={auth} />} />
        <Route path="/letterForm" element={<LetterForm />} />
      </Routes>
    </div>
  );
}

export default App;