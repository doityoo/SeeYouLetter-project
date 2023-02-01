import { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import GlobalStyle from '../UI/GlobalStyle';
import TextEditor from '../components/TextEditor';
import { useSelector } from 'react-redux';

import { database } from '../services/firebase-config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

// 날짜 출력 라이브러리(Dayjs)
import 'dayjs/locale/ko'; // 한국어 가져오기
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.locale('ko');

const LetterForm = () => {
	const textBody = useSelector((state) => state.textBody.context);
	const userEmail = useSelector((state) => state.auth.isUserEmail);
	const [menu, setMenu] = useState([true, false, false]);
	const [email, setEmail] = useState('');
	const [errMSG, setErrMSG] = useState('');
	const [name, setName] = useState('');
	const [isChecked, setisChecked] = useState(false);

	const currentDate = dayjs(new Date()).format('YYYY년 MM월 DD일');
	const currentDateEng = dayjs(new Date()).format('YYYY. MM. DD.');

	function strCheck(str, type) {
		const REGEX = {
			EMAIL: /\S+@\S+\.\S+/,
		};
		if (type === 'email') {
			return REGEX.EMAIL.test(str);
		} else {
			return false;
		}
	}

	const submitHandler = async () => {
		if (strCheck(email, 'email') === false) {
			setErrMSG('이메일 형식이 올바르지 않습니다.');
			return false;
		}
		const colAdd = collection(database, 'send_email');
		try {
			await addDoc(colAdd, {
				delivery: {
					startTime: serverTimestamp(),
				},
				from: 'honesty407@gmail.com',
				message: {},
				template: {
					data: {
						sendDate: `${currentDateEng}`,
						userName: `${name}`,
						body: `${textBody}`,
					},
					name: 'sendEmail',
				},
				to: `${email}`,
			});
			console.log('Send email!');
		} catch {
			console.log('Not send email!');
		}
		await window.location.reload();
	};

	const handleChecked = (e) => {
		setisChecked(e.target.checked);
		setEmail(userEmail);
	};

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
			<p>✍🏻 발신자 이름</p>
			<Input
				type='text'
				placeholder='보내는 사람의 이름을 입력하세요'
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>
			<p>✉️ 수신인</p>
			<Input
				type='email'
				placeholder='이메일을 입력하세요'
				value={isChecked? email : ""}
				onChange={(e) => {
					setEmail(e.target.value);
				}}
			/>
			{errMSG ? <ErrorMSG>{errMSG}</ErrorMSG> : ''}
			<ToMeCheckBox>
				<Checkbox
					type='checkbox'
					checked={isChecked}
					onChange={handleChecked}
				/>
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
const Input = styled.input`
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
const ErrorMSG = styled.div`
	color: #b91d1d;
	font-size: 0.9rem;
	margin-bottom: 10px;
`;
