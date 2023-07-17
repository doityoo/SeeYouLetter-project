import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import GlobalStyle from '../../../src/UI/GlobalStyle';
import googleLogo from './../assets/google-logo.png';
import kakaoLogo from './../assets/kakao-logo.png';

import Header from '../../../src/components/Header';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { authService } from '../../../src/services/firebase-config';

const Signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [checkPassword, setCheckPassword] = useState('');
	// const [loading, setLoading] = useState(false);
	const [errMessage, setErrMessage] = useState('');

	const passwordRef = useRef();
	const emailRef = useRef();
	const checkPasswordRef = useRef();
	const navigate = useNavigate();

	const register = async (e) => {
		e.preventDefault();
		const passwordEdit = passwordRef.current.value;
		const emailEdit = emailRef.current.value;
		const confirmPasswordEdit = checkPasswordRef.current.value;
		function strCheck(str, type) {
			const REGEX = {
				EMAIL: /\S+@\S+\.\S+/,
				PWD_RULE: /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/,
			};
			if (type === 'email') {
				return REGEX.EMAIL.test(str);
			} else if (type === 'pwd') {
				return REGEX.PWD_RULE.test(str);
			} else {
				return false;
			}
		}
		if (strCheck(emailEdit, 'email') === false) {
			setErrMessage('이메일 형식이 올바르지 않습니다.');
			return false;
		} else if (passwordEdit !== confirmPasswordEdit) {
			setErrMessage('비밀번호가 일치하지 않습니다.');
			return false;
		} else if (
			strCheck(passwordEdit, 'pwd') === false &&
			passwordEdit.length !== 0 &&
			confirmPasswordEdit.length !== 0
		) {
			setErrMessage('비밀번호는 8~16자 영문+숫자+특수문자로 입력해주세요');
			return false;
		}
		try {
			const user = await createUserWithEmailAndPassword(
				authService,
				email,
				password
			);
			console.log(user);
			navigate('/');
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<>
			<GlobalStyle />
			<Wrapper>
				<Header />
				<Form>
					<Input
						ref={emailRef}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='이메일'
					/>
					<Input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						maxLength={16}
						type='password'
						ref={passwordRef}
						placeholder='비밀번호'
					/>
					<Input
						value={checkPassword}
						onChange={(e) => setCheckPassword(e.target.value)}
						maxLength={16}
						type='password'
						ref={checkPasswordRef}
						placeholder='비밀번호 확인'
					/>
					{errMessage ? <ErrorMSG>{errMessage}</ErrorMSG> : ''}
					<button onClick={register}>Sign up</button>
					<FlexBetween>
						<div>
							<Icon src={kakaoLogo} alt='kakaoLogin' />
						</div>
						<div>
							<Icon src={googleLogo} alt='googleLogin' />
						</div>
					</FlexBetween>
				</Form>
			</Wrapper>
		</>
	);
};

export default Signup;

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
		cursor: pointer;
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
	width: 35%;
`;
const ErrorMSG = styled.div`
	color: #b91d1d;
	font-size: 0.9rem;
	margin-bottom: 10px;
`;
