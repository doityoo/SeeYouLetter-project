import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../see-you-letter/pages/Login";
import Signup from "../see-you-letter/pages/signup/Signup";
import FindIdPw from "../see-you-letter/pages/FindIdPw";
import LetterForm from "../see-you-letter/pages/letterForm/LetterForm";
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  const isLogin = useSelector((state) => state.auth.isAuthenticated)
  console.log(isLogin)

  const callApi = async () => {
    axios.get("/").then(() => { console.log("res data!") });
  };

  useEffect(() => {
    callApi();
  }, []);

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