import express, { Request, Response } from 'express';
import emailSender from './emailSender';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json()); // Body 데이터 파싱을 위한 미들웨어 추가

// type Data = {
// 	name: string;
// 	age: number;
// 	url: string;
// };

app.post('/sendEmail', (req: Request, res: Response) => {
	if (req.method === 'POST') {
		const { toEmail, text, name, reservationDate, subject } = req.body;
		console.log('서버 데이터 테스트(sendEmail): ', req.body);
		res.status(200).json({ request: req.body }); // req body 잘등어오는지 테스트 코드

		try {
			// 여기에서 예약된 날짜 로직을 추가
			// 예약된 날짜가 도달하면 이메일을 보내도록 설정
			const delay = reservationDate.getTime() - Date.now();
			if (delay > 0) {
				new Promise((resolve) => setTimeout(resolve, delay));

				emailSender(toEmail, name, text, reservationDate, subject);
				res.status(200).json({ message: 'Email sent.' });
			}
		} catch (error) {
			console.error('Error processing email:', error);
			res.status(500).json({ message: 'Error processing email.' });
		}
	} else {
		res.status(405).json({ message: 'Method not allowed.' });
	}
	// res.status(200).json({ message: 'success' });
});

const port = 8080;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
