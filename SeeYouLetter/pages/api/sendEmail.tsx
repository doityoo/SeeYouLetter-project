import { NextApiRequest, NextApiResponse } from 'next';
import emailSender from '../../src/utils/emailSender';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		let { toEmail, text, name, reservationDate, subject } = req.body;
		console.log('서버 데이터 테스트(sendEmail): ', req.body);

		try {
			// 여기에서 예약된 날짜 로직을 추가
			// 예약된 날짜가 도달하면 이메일을 보내도록 설정
			setTimeout(async () => {
				await emailSender(toEmail, name, text, reservationDate, subject);
			}, 1000);
			console.log('res: ', res);
			res
				.status(200)
				.json({ message: 'Email will be sent on the reserved date.' });
		} catch (error) {
			console.error('Error processing email:', error);
			res.status(500).json({ message: 'Error processing email.' });
		}
	} else {
		res.status(405).json({ message: 'Method not allowed.' });
	}
};

export default handler;
