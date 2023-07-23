import { NextApiRequest, NextApiResponse } from 'next';
import emailSender from '../../src/utils/emailSender';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		let { toEmail, text, name, reservationDate } = req.body;

		try {
			// 여기에서 예약된 날짜 로직을 추가해야 합니다.
			// 예약된 날짜가 도달하면 이메일을 보내도록 설정해주세요.
			// 예시로 setTimeout을 사용해서 10초 후에 이메일을 보내는 예제를 작성하겠습니다.
			setTimeout(async () => {
				await emailSender(toEmail, name, text, reservationDate);
			}, 1000);

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