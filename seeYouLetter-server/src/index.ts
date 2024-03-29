import express, { Request, Response } from 'express';
import emailSender from './emailSender';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sendEmail', async (req: Request, res: Response) => {
	if (req.method === 'POST') {
		const { toEmail, text, name, reservationDate, subject } = req.body;
		console.log('서버 데이터 테스트(sendEmail): ', req.body);

		// 클라이언트에게 즉시 응답을 보냄
		try {
			await emailSender(toEmail, name, text, reservationDate, subject);
			res.status(200).json({ message: '이메일이 전송될 예정입니다.' });
		} catch (error) {
			res.status(500).json({ message: '이메일 전송 중 오류가 발생했습니다.' });
		}
	} else {
		return res.status(405).json({ message: 'Method not allowed.' });
	}
});

const port = 8080;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
