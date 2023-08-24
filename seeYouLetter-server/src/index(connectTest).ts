import express, { Request, Response } from 'express';
import emailSender from './emailSender';

const app = express();

app.use(express.json()); // Body 데이터 파싱을 위한 미들웨어 추가

// type Data = {
// 	name: string;
// 	age: number;
// 	url: string;
// };

app.post('/sendEmail', (req: Request, res: Response) => {
	res.send('<h1>Send Email</h1>');
});

const port = 8080;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
