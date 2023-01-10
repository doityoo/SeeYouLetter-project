import React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';
import GlobalStyle from '../UI/GlobalStyle';
import googleLogo from './../assets/google-logo.png';
import kakaoLogo from './../assets/kakao-logo.png';

import Header from '../components/Header';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { authService } from '../services/firebase-config';

const Signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rePassword, setRePassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => { 
		createUserWithEmailAndPassword(authService, email, password);
	},[])

	return (
		<>
			<GlobalStyle />
			<MainContents>
				<Header />
				<Form>
					<Input
						// ref={emailRef}
						value={email}
            onChange={(e) => setEmail(e.target.value)}
						placeholder='이메일'
					/>
					<Input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						maxLength={16}
						type='password'
						// ref={pwRef}
						placeholder='비밀번호'
					/>
					<Input
						value={rePassword}
						onChange={(e) => setRePassword(e.target.value)}
						maxLength={16}
						type='password'
						// ref={pwRef}
						placeholder='비밀번호 확인'
					/>
					<button>Sign up</button>
					<FlexBetween>
						<div>
							<Icon src={kakaoLogo} alt='kakaoLogin' />
						</div>
						<div>
							<Icon src={googleLogo} alt='googleLogin' />
						</div>
					</FlexBetween>
				</Form>
			</MainContents>
		</>
	);
};

export default Signup;

const MainContents = styled.div`
	margin: 0 20px;
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
	width: ${(props) => (props.width ? '80%' : '35%')};
`;
