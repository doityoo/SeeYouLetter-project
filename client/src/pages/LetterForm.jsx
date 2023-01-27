import { useState } from 'react';
import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import GlobalStyle from '../UI/GlobalStyle';
import TextEditor from '../components/TextEditor';

import { database } from '../services/firebase-config';
import { addDoc, collection } from 'firebase/firestore';

// 날짜 출력 라이브러리(Dayjs)
import 'dayjs/locale/ko'; // 한국어 가져오기
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.locale('ko');

const LetterForm = () => {
	const textBody = useSelector((state) => state.textBody.context);
	const [menu, setMenu] = useState([true, false, false]);
	const [email, setEmail] = useState('');

	const currentDate = dayjs(new Date()).format('YYYY년 MM월 DD일');

	const submitHandler = () => {
		console.log("submit");
	};

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		const colAdd = collection(database, 'send_email');
	// 		try {
	// 			addDoc(colAdd, {
	// 				from: 'honesty407@gmail.com',
	// 				message: {
	// 				},
	// 				template: {
	// 					data: {
	// 						sendDate: '${currentDate}',
	// 						userName: 'willy',
	// 						header: `
	// 							이 편지는 See you letters에서 ${value}이 ${hello}에 보낸 편지입니다.
	// 						`,
	// 						body: `${textBody}`
	// 					},
	// 					name: 'sendEmail',
	// 				},
	// 				to: 'yitsky@naver.com',
	// 			});
	// 			console.log("Send email!")
	// 		} catch {
	// 			console.log('Not send email!');
	// 		}
	// 	}, 3000);
	// }, []);

	return (
		<Wrapper>
			<GlobalStyle />
			<Header />
			<StyledText1>
				<StyledDate>{currentDate}</StyledDate>
				<p>나에게, 또는 누군가에게</p>
				<p>편지를 남겨보세요</p>
			</StyledText1>
			<TextEditor />
			<p>✉️ 수신인</p>
			<EmailInput
				type='email'
				placeholder='이메일을 입력하세요'
				onChange={(e) => {
					setEmail(e.target.value);
				}}
			/>
			<ToMeCheckBox>
				<Checkbox type='checkbox' />
				<label>나에게 보내기</label>
			</ToMeCheckBox>
			<p>📬 발송일</p>
			<ButtonWrap>
				<PeriodButton
					onClick={() => {
						setMenu([true, false, false]);
					}}
				>
					1년 뒤
				</PeriodButton>
				<PeriodButton
					onClick={() => {
						setMenu([false, true, false]);
					}}
				>
					6개월 뒤
				</PeriodButton>
				<PeriodButton
					onClick={() => {
						setMenu([false, false, true]);
					}}
				>
					3개월 뒤
				</PeriodButton>
			</ButtonWrap>
			<SendButton onClick={submitHandler}>보내기</SendButton>
		</Wrapper>
	);
};

export default LetterForm;

const Wrapper = styled.div`
	margin: 0 20px;
`;
const StyledText1 = styled.h2`
	font-weight: 300;
	color: black;
`;
const StyledDate = styled.p`
	font-weight: 500;
`;
const ToMeCheckBox = styled.div`
	display: flex;
	margin-bottom: 20px;
`;
const Checkbox = styled.input`
	margin-right: 5px;
`;
const EmailInput = styled.input`
	width: 100%;
	font-size: 16px;
	padding: 1rem;
	margin: 10px 0;
`;
const PeriodButton = styled.button`
	margin-bottom: 10px;
	height: 50px;
	border: 1px solid orange;
	background-color: transparent;
	color: black;
	&:active {
		background-color: orange;
	}
`;
const ButtonWrap = styled.div`
	margin-top: 10px;
`;
const SendButton = styled.button`
	margin: 20px 0;
	height: 60px;
	font-size: 1.2rem;
`;
