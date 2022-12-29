import React from 'react';
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const pwRef = useRef();
  const [validationMSG, setValidationMSG] = useState("");


  useEffect(() => {
  },[])

  // ID,PW 유효성 검사(ref)
  const checkValidation = () => {
    const email = emailRef.current.value;
    const password = pwRef.current.value;
    let regEmail =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (email.length === 0) {
      setValidationMSG("이메일을 입력해주세요");
      return false;
    }
    //regExp.test() 정규표현식이 맞는지 확인하고 boolean타입으로 판별
    if (regEmail.test(email) === false) {
      setValidationMSG("올바른 이메일 주소를 입력해주세요");
      return false;
    }
    if (password.length === 0) {
      setValidationMSG("비밀번호를 입력해주세요");
      return false;
    }
    // 위 if문에 해당이 안되면 true return해라
    return true;
  };

  const loginSubmitHandler = async (e) => {
    const email = emailRef.current.value;
    // const password = pwRef.current.value;
    e.preventDefault();
    checkValidation(email);
    if (checkValidation(email) === false) {
      return;
    }
    // 토큰
    // const token = await login(email, password).catch((err) => {
    //   console.log(err.response.data.message);
    //   if (err.response.data.message === "MEMBER NOT FOUND") {
    //     setValidationMSG("이메일이 존재하지 않습니다.");
    //   }
    //   if (err.response.data.message === "LOGIN INFO IS INCORRECT") {
    //     setValidationMSG("비밀번호가 일치하지 않습니다.");
    //   }
    //   if (err.response.data.message === "EMAIL VALIDATION IS NEED") {
    //     setValidationMSG("인증이 필요합니다 이메일을 확인해주세요.");
    //   }
    // });
    // if (token) {
    //   setValidationMSG("");
    //   console.log(token);
    //   localStorage.setItem("token", token);
    //   setIsModalOpen(true);
    //   getProfile
    //   const userData = await getProfile();
    //   dispatch(userAction.setUser(userData));
    //   setTimeout(() => {
    //     dispatch(authActions.login());
    //     navigate("/letterForm");
    //   }, 1500);
    // }
  };


  return (
    <div>
      <form 
      onSubmit={loginSubmitHandler}
      >
        {/* 로그인 ID / PW 입력창 */}
        <div>
          <input 
          ref={emailRef} 
          placeholder="이메일" />
          <input
            maxLength={16}
            type="password"
            ref={pwRef}
            placeholder="비밀번호"
          />
        </div>
        {/* 간편로그인 링크&로고 */}
        {/* <div>
          <div>
            <a href="#!">
              <img src={a} alt="naverLogin" />
            </a>
          </div>
          <div>
            <a href={`${baseURL}/login/oauth2/authorize/kakao?redirect_uri=${clientURL}/oauth2/redirect`}>
              <img src={a} alt="kakaoLogin" />
            </a>
          </div>
          <div>
            <a href={`${baseURL}/login/oauth2/authorize/google?redirect_uri=${clientURL}/oauth2/redirect`}>
              <img src={a} alt="googleLogin" />
            </a>
          </div>
        </div> */}

        <div>
          <button>Log in</button>
        </div>
        <div>
          <Link to="/signup">
            <p>회원가입</p>
          </Link>
          <Link to="/find-password">
            <p>비밀번호 찾기</p>
          </Link>
        </div>
      </form>
      {/* {isModalOpen && <Modal num={0} />} */}
      
    </div>
  );
};

export default Login;