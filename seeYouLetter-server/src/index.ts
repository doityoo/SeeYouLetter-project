import express, { Request, Response } from 'express';
import emailSender from './emailSender';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// s3에서 get 요청 응답 여부 테스트
app.get('/letterForm', (req: Request, res: Response) => {
	try {
		console.log(res.json('server hello'));
		res.status(200).json('get response');
	} catch (err) {
		res.status(500).json('get response error');
	}
});

app.post('/sendEmail', (req: Request, res: Response) => {
	if (req.method === 'POST') {
		const { toEmail, text, name, reservationDate, subject } = req.body;
		console.log('서버 데이터 테스트(sendEmail): ', req.body);
		res.status(200).json({ request: req.body }); // req body 잘등어오는지 테스트 코드

		try {
			emailSender(toEmail, name, text, reservationDate, subject);
			res.status(200).json({ message: 'Email sent.' });
		} catch (error) {
			console.error('Error processing email:', error);
			res.status(500).json({ message: 'Error processing email.' });
		}
	} else {
		res.status(405).json({ message: 'Method not allowed.' });
	}
});

const port = 8080;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
