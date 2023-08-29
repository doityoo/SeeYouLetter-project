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
		emailSender(toEmail, name, text, reservationDate, subject);
		return res.status(200).json({ message: 'Email sent.' });
	} else {
		return res.status(405).json({ message: 'Method not allowed.' });
	}
});

const port = 8080;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
