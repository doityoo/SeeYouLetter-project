import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import GlobalStyle from '../UI/GlobalStyle';
import googleLogo from './../assets/google-logo.png';
import kakaoLogo from './../assets/kakao-logo.png';
import Header from '../components/Header';

// import auth from '../services/auth'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authService } from './../services/firebase-config';

const Login = () => {
	const navigate = useNavigate();
	const emailRef = useRef();
	const pwRef = useRef();
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const [user, setUser] = useState({});
	const [validationMSG, setValidationMSG] = useState('');
	const [error, setError] = useState('');

	// ID,PW 유효성 검사(ref)
	const checkValidation = () => {
		const email = emailRef.current.value;
		const password = pwRef.current.value;
		let regEmail =
			/^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
		if (email.length === 0) {
			setValidationMSG('이메일을 입력해주세요');
			return false;
		}
		//regExp.test() 정규표현식이 맞는지 확인하고 boolean타입으로 판별
		if (regEmail.test(email) === false) {
			setValidationMSG('올바른 이메일 주소를 입력해주세요');
			return false;
		}
		if (password.length === 0) {
			setValidationMSG('비밀번호를 입력해주세요');
			return false;
		}
		// 위 if문에 해당이 안되면 true return해라
		return true;
	};

	const login = async (e) => {
		const email = emailRef.current.value;
		e.preventDefault();
		checkValidation(email);
		if (checkValidation(email) === false) {
			return;
		}
		try {
			const user = await signInWithEmailAndPassword(
				authService,
				loginEmail,
				loginPassword
			);
			console.log(user);
		} catch (err) {
			console.log(error.message);
		}
	};

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

	return (
		<>
			<GlobalStyle />
			<Wrapper>
				<Header />
				<Form onSubmit={login}>
					{/* 로그인 ID / PW 입력창 */}
					<Input
						ref={emailRef}
						placeholder='이메일'
						onChange={(e) => {
							setLoginEmail(e.target.value);
						}}
					/>
					<Input
						maxLength={16}
						type='password'
						ref={pwRef}
						placeholder='비밀번호'
						onChange={(e) => {
							setLoginPassword(e.target.value);
						}}
					/>
					<FlexLeft>
						<input type='checkbox' />
						<label>아이디 저장하기</label>
					</FlexLeft>
					<StyledText2>
						{error ? '아이디와 비밀번호가 맞지 않습니다' : ''}
					</StyledText2>
					<button type='submit'>Log in</button>
					<FlexBetween width>
						<StyledLink to='/signup'>회원가입</StyledLink>
						<StyledLink to='/findIdPw'>비밀번호 찾기</StyledLink>
					</FlexBetween>
					{/* 간편로그인 링크&로고 */}
					<StyledText1>SNS 계정으로 간편 로그인 / 회원가입</StyledText1>
					<FlexBetween>
						<div>
							{/* <a href={`${baseURL}/login/oauth2/authorize/kakao?redirect_uri=${clientURL}/oauth2/redirect`}> */}
							<Icon src={kakaoLogo} alt='kakaoLogin' />
							{/* </a> */}
						</div>
						<div>
							{/* <a href={`${baseURL}/login/oauth2/authorize/google?redirect_uri=${clientURL}/oauth2/redirect`}> */}
							<Icon src={googleLogo} alt='googleLogin' />
							{/* </a> */}
						</div>
					</FlexBetween>
				</Form>
				{/* {isModalOpen && <Modal num={0} />} */}
			</Wrapper>
		</>
	);
};

export default Login;

const Wrapper = styled.div`
	margin: 0 20px;
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
const Icon = styled.img`
	width: 50px;
	height: auto;
	object-fit: cover;
	cursor: pointer;
`;
const FlexBetween = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 20px 0 23px 0;
	width: ${(props) => (props.width ? '80%' : '35%')};
`;
const FlexLeft = styled.div`
	display: flex;
	align-items: start;
	width: 100%;
	margin-bottom: 20px;
	margin-right: 5px;
`;
const StyledLink = styled(Link)`
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
