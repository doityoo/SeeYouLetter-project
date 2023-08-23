import React from 'react';
import { Fragment, useRef, useState, useEffect, HTMLAttributes } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { authActions } from './../reducers/authSlice';

import styled from 'styled-components';
import Image from 'next/image';
import GlobalStyle from './../components/UI/GlobalStyle';
import Header from './../components/Header';

import {
  signInWithEmailAndPassword,
  UserCredential,
  User,
} from 'firebase/auth';
import { authService } from './../services/firebase-config';

interface sliceAuthTypes {
  auth: {
    isAuthenticated: false;
    isUserEmail: '';
  };
}

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  // const [validationMSG, setValidationMSG] = useState('');
  const [error, setError] = useState('');

  const isLogin = useSelector(
    (state: sliceAuthTypes) => state.auth.isAuthenticated,
  );

  useEffect(() => {
    if (isLogin) {
      router.push('/letterForm');
    } else {
      router.push('/');
    }
  }, [isLogin, router]);

  // ID,PW 유효성 검사(ref)
  const checkValidation = (
    email: string | undefined,
    password: string | number | undefined,
  ) => {
    // const email = emailRef.current?.value;
    // const password = pwRef.current?.value;
    const regEmail =
      /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (typeof email === 'undefined' || email === '') {
      setError('이메일을 입력해주세요');
      return false;
    }
    //regExp.test() 정규표현식이 맞는지 확인하고 boolean타입으로 판별
    if (regEmail.test(email) === false) {
      setError('올바른 이메일 주소를 입력해주세요');
      return false;
    }
    if (typeof password === 'undefined' || password === '') {
      setError('비밀번호를 입력해주세요');
      return false;
    }
    // 위 if문에 해당이 안되면 true return해라
    return true;
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    const email = emailRef.current?.value;
    const password = pwRef.current?.value;
    e.preventDefault();
    checkValidation(email, password);
    if (checkValidation(email, password) === false) {
      return;
    }
    try {
      const user: UserCredential = await signInWithEmailAndPassword(
        authService,
        loginEmail,
        loginPassword,
      );

      const userObj: User | null = user.user;
      if (!userObj) {
        // currentUser가 null인 경우에 대한 처리
        // 예를 들어, 에러 처리를 하거나 로그인 페이지로 이동할 수 있습니다.
        return;
      }
      const token: string = await userObj.getIdToken();
      localStorage.setItem('key', token);
      const isTokened = localStorage.getItem('key');
      if (isTokened) {
        dispatch(authActions.login());
        router.push('/letterForm');
        const getUserData: string | null = authService.currentUser!.email;
        dispatch(authActions.userEmail(getUserData));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <Head>
        <title>See You Letter</title>
        <meta name="description" content="로그인 페이지입니다." />
      </Head>
      <GlobalStyle />
      <Wrapper>
        <Header />
        <Form onSubmit={loginHandler}>
          {/* 로그인 ID / PW 입력창 */}
          <Input
            ref={emailRef}
            type="email"
            placeholder="이메일"
            onChange={(e) => {
              setLoginEmail(e.target.value);
            }}
          />
          <Input
            maxLength={16}
            type="password"
            ref={pwRef}
            placeholder="비밀번호"
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
          />
          <StyledText2>{error ? error : ''}</StyledText2>
          <button type="submit">Log in</button>
          <FlexBetween width="1">
            <StyledLink href="/signup">회원가입</StyledLink>
          </FlexBetween>
          {/* 간편로그인 링크&로고 */}
          <StyledText1>SNS 계정으로 간편 로그인 / 회원가입</StyledText1>
          <FlexBetween>
            <Link href={'/'}>
              <Image
                src="/kakao-logo.png"
                alt="Kakao Logo"
                width={40}
                height={40}
              />
            </Link>
            {/* <a href={`${baseURL}/login/oauth2/authorize/kakao?redirect_uri=${clientURL}/oauth2/redirect`}> */}
            {/* </a> */}
            <Link href={'/'}>
              <Image
                src="/google-logo.png"
                alt="Google Logo"
                width={40}
                height={40}
              />
            </Link>
            {/* <a href={`${baseURL}/login/oauth2/authorize/google?redirect_uri=${clientURL}/oauth2/redirect`}> */}
            {/* </a> */}
          </FlexBetween>
        </Form>
        {/* {isModalOpen && <Modal num={0} />} */}
      </Wrapper>
    </Fragment>
  );
};

// export const getStaticProps = async () => {};

export default Login;

type FlexBetweenProps = HTMLAttributes<HTMLDivElement> & {
  width?: string;
};

const Wrapper = styled.div`
  margin: 0 auto;
  width: 400px;
  padding: 0 20px;
  min-height: 100vh;
  background-color: #eeeae9;
`;
const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  button {
    font-size: 1.3rem;
  }
`;
const Input = styled.input`
  margin-bottom: 15px;
  width: 100%;
  height: 50px;
`;
const FlexBetween = styled.div<FlexBetweenProps>`
  display: flex;
  justify-content: ${(props) => (props.width ? 'center' : 'space-between')};
  margin: 20px 0 23px 0;
  width: ${(props) => (props.width ? '80%' : '35%')};
`;
const StyledLink = styled.a`
  text-decoration: none;
  &:hover,
  &:visited,
  &:focus,
  &:active {
    text-decoration: underline;
    color: black;
  }
`;
const StyledText1 = styled.p`
  color: #686868;
`;
const StyledText2 = styled.p`
  color: red;
  height: 15px;
  margin-bottom: 15px;
`;
