import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import GlobalStyle from '../../components/UI/GlobalStyle';
import TextEditor from '../../components/TextEditor';

// 날짜 출력 라이브러리(Dayjs)
import 'dayjs/locale/ko'; // 한국어 가져오기
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.locale('ko');

interface sliceEmailTypes {
	auth: { isUserEmail: string; isAuthenticated: false };
}

interface PeriodData {
	id: number;
	period: string;
}

const LetterForm = () => {
	const userEmail = useSelector(
		(state: sliceEmailTypes) => state.auth.isUserEmail
	);
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [errMSG, setErrMSG] = useState<string>('');
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const [period, setPeriod] = useState<number | undefined>(0);
	const [reservationDate, setReservationDate] = useState<Date | string>('');
	const [textBody, setTextBody] = useState<string>(''); // textBody 상태 추가

	useEffect(() => {
		console.log('예약날짜 테스트(1)', reservationDate);
	}, [reservationDate]);

	// textEditor 오늘 잘짜 표시 변수
	const currentDate = dayjs(new Date()).format('YYYY년 MM월 DD일');

	// 예약기간 DB
	let periodData: PeriodData[] = [
		{
			id: 0,
			period: '3개월 뒤',
		},
		{
			id: 1,
			period: '6개월 뒤',
		},
		{
			id: 2,
			period: '1년 뒤',
		},
		{
			id: 3,
			period: '5분 후(테스트용)',
		},
	];

	// email 유효성 검사
	function strCheck(str: string, type: string) {
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
		// submit 전 user가 수신자로 작성하 email형식 유효성 검사
		if (strCheck(email, 'email') === false) {
			setErrMSG('이메일 형식이 올바르지 않습니다.');
			return false;
		}

		const curDate = new Date();
		if (period === 0) {
			let threeMonth = new Date(curDate);
			threeMonth.setMonth(curDate.getMonth() + 3);
			await setReservationDate(threeMonth);
		} else if (period === 1) {
			let sixMonth = new Date(curDate);
			sixMonth.setMonth(curDate.getMonth() + 6);
			await setReservationDate(sixMonth);
		} else if (period === 2) {
			let oneYear = new Date(curDate);
			oneYear.setMonth(curDate.getMonth() + 12);
			await setReservationDate(oneYear);
		} else if (period === 3) {
			// 기간 테스트 코드
			let now = await new Date(curDate.getTime() + 5 * 60000);
			await setReservationDate(now.toISOString());
		}

		try {
			// 여기에서 예약된 날짜를 설정하고 서버로 전송
			const emailData = await {
				toEmail: email,
				text: textBody,
				name: name,
				reservationDate: reservationDate,
			};
			console.log('예약날짜(타입)(2): ', reservationDate);
			const token = await localStorage.getItem('key');
			if (!token) {
				console.error('User is not authenticated.');
				return;
			}

			// 서버에 토큰과 이메일 데이터를 전송합니다.
			const response = await axios.post('/api/sendEmail', emailData, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.status === 200) {
				console.log('Email scheduled successfully!');
			} else {
				console.error('Error scheduling email:', response.statusText);
			}
		} catch (error) {
			console.error('Error scheduling email:', error);
		} finally {
			console.log(reservationDate);
			// await window.location.reload();
		}
	};

	const handleChecked = (e: any) => {
		if (e.target.checked) {
			setIsChecked(e.target.checked);
			setEmail(userEmail);
		} else {
			setIsChecked(false);
			setEmail('');
		}
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
			<TextEditor
				textBody={textBody}
				setTextBody={(text) => setTextBody(text)}
			/>
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
				value={email}
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
				{periodData.map((item) => (
					<PeriodButton
						key={item.id}
						onClick={() => {
							setPeriod(item.id);
						}}
						color='true'
					>
						{item.period}
					</PeriodButton>
				))}
			</ButtonWrap>
			<SendButton onClick={submitHandler}>보내기</SendButton>
		</Wrapper>
	);
};

export default LetterForm;

const Wrapper = styled.div`
	margin: 0 auto;
	width: 400px;
	padding: 0 20px;
	min-height: 100vh;
	background-color: #eeeae9;
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
	&:focus {
		background-color: ${(props) => (props.color ? 'orange' : 'none')};
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
