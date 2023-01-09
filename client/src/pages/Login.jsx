import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import GlobalStyle from '../UI/GlobalStyle';
import logo from './../assets/seeYouLetter-logo.png';
import googleLogo from './../assets/google-logo.png';
import kakaoLogo from './../assets/kakao-logo.png';
import bar from './../assets/hamburgerBar.png';

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
`;
const MainLogo = styled(Icon)`
	width: auto;
	height: 20px;
	object-fit: cover;
`;
const FlexBetween = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 43px 0 23px 0;
`;
const FlexLeft = styled.div`
	display: flex;
	align-items: start;
	width: 100%;
	margin-bottom: 60px;
	input {
		margin-right: 5px;
	}
`;

const Login = ({ auth }) => {
	const navigate = useNavigate();
	const emailRef = useRef();
	const pwRef = useRef();
	const [validationMSG, setValidationMSG] = useState('');

	useEffect(() => {}, []);

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
		<>
			<GlobalStyle />
			<MainContents>
				<FlexBetween>
					<MainLogo src={logo} alt='logo' />
					<MainLogo src={bar} alt='hamburgerIcon' />
				</FlexBetween>
				<Form onSubmit={loginSubmitHandler}>
					{/* 로그인 ID / PW 입력창 */}
					<Input ref={emailRef} placeholder='이메일' />
					<Input
						maxLength={16}
						type='password'
						ref={pwRef}
						placeholder='비밀번호'
					/>
					<FlexLeft>
						<input type='checkbox' checkbox />
						<label>아이디 저장하기</label>
					</FlexLeft>
					<button>Log in</button>
					<FlexBetween>
						<Link to='/signup'>
							<p>회원가입</p>
						</Link>
						<Link to='/findIdPw'>
							<p>비밀번호 찾기</p>
						</Link>
					</FlexBetween>
					{/* 간편로그인 링크&로고 */}
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
			</MainContents>
		</>
	);
};

export default Login;
