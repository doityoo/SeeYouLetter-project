import React from 'react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from './../../reducers/authSlice';

import styled from 'styled-components';
import GlobalStyle from '../../components/UI/GlobalStyle';
import googleLogo from './../assets/google-logo.png';
import kakaoLogo from './../assets/kakao-logo.png';
import Header from './../../components/Header';

// import auth from '../services/auth'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authService } from '../../services/firebase-config';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const emailRef = useRef();
	const pwRef = useRef();
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	// const [validationMSG, setValidationMSG] = useState('');
	const [error, setError] = useState('');

	// ID,PW 유효성 검사(ref)
	const checkValidation = () => {
		const email = emailRef.current.value;
		const password = pwRef.current.value;
		let regEmail =
			/^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
		if (email.length === 0) {
			setError('이메일을 입력해주세요');
			return false;
		}
		//regExp.test() 정규표현식이 맞는지 확인하고 boolean타입으로 판별
		if (regEmail.test(email) === false) {
			setError('올바른 이메일 주소를 입력해주세요');
			return false;
		}
		if (password.length === 0) {
			setError('비밀번호를 입력해주세요');
			return false;
		}
		// 위 if문에 해당이 안되면 true return해라
		return true;
	};

	const login = async (e) => {
		const email = emailRef.current.value;
		const password = pwRef.current.value;
		e.preventDefault();
		checkValidation(email, password);
		if (checkValidation(email, password) === false) {
			return;
		}
		try {
			const user = await signInWithEmailAndPassword(
				authService,
				loginEmail,
				loginPassword
			);
			const token = user.user.accessToken;
			localStorage.setItem('key', token);
			const isTokened = localStorage.getItem('key');
			if (isTokened) {
				dispatch(authActions.login());
				navigate('/letterForm');
				const getUserData = authService.currentUser.email;
				dispatch(authActions.userEmail(getUserData));
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<GlobalStyle />
			<Wrapper>
				<Header />
				<Form onSubmit={login}>
					{/* 로그인 ID / PW 입력창 */}
					<Input
						ref={emailRef}
						type='email'
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
					<StyledText2>{error ? error : ''}</StyledText2>
					<button type='submit'>Log in</button>
					<FlexBetween width>
						<StyledLink to='/signup'>회원가입</StyledLink>
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
	margin: 0 auto;
	width: 400px;
	padding: 0 20px;
	min-height: 100vh;
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
	justify-content: ${(props) => (props.width ? 'center' : 'space-between')};
	margin: 20px 0 23px 0;
	width: ${(props) => (props.width ? '80%' : '35%')};
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
