import express, { Request, Response } from 'express';
import emailSender from './emailSender';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sendEmail', (req: Request, res: Response) => {
	if (req.method === 'POST') {
		const { toEmail, text, name, reservationDate, subject } = req.body;
		console.log('서버 데이터 테스트(sendEmail): ', req.body);

		// 클라이언트에게 즉시 응답을 보냄
		res.status(200).json({ message: 'Email will be sent.' });
		// 이메일 작업을 스케줄링
		res.header('Content-Type', 'application/json');
		emailSender(toEmail, name, text, reservationDate, subject);
		return; // 여기서 함수 실행 종료
	} else {
		return res.status(405).json({ message: 'Method not allowed.' });
	}
});

const port = 8080;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
