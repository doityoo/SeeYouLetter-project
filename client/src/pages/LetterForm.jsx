import React from 'react';
import styled from 'styled-components';
import GlobalStyle from '../UI/GlobalStyle';
import Header from '../components/Header';
import TextEditor from '../components/TextEditor';
import { useState } from 'react';
// 날짜 출력 라이브러리(Dayjs)
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko'; // 한국어 가져오기
dayjs.extend(relativeTime);
dayjs.locale('ko');

const LetterForm = () => {
	const [menu, setMenu] = useState([true, false, false]);

	return (
		<Wrapper>
			<GlobalStyle />
			<Header />
			<StyledText1>
				<StyledDate>{dayjs(new Date()).format('YYYY년 MM월 DD일')}</StyledDate>
				<p>나에게, 또는 누군가에게</p>
				<p>편지를 남겨보세요</p>
			</StyledText1>
			<TextEditor />
			<p>✉️ 수신인</p>
			<EmailInput type='email' placeholder='이메일을 입력하세요' />
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
			<SendButton>보내기</SendButton>
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
