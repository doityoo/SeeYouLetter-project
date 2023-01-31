import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FindIdPw from "./pages/FindIdPw";
import LetterForm from "./pages/LetterForm";

function App() {
  const isLogin = useSelector((state) => state.auth.isAuthenticated)
  console.log(isLogin)

  return (
    <div className="App">
      <Routes>
        {!isLogin && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/findIdPw" element={<FindIdPw />} />
            <Route path="*" element={<Login />} />
          </>
        )}
        {isLogin && (
          <>
            <Route path="/letterForm" element={<LetterForm />} />
            <Route path="*" element={<LetterForm />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;