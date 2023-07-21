import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // 클라이언트에서 전달한 토큰과 이메일 데이터를 받아옵니다.
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { reservationDate, to, subject, text } = req.body;

    try {
      // 여기에서 토큰의 유효성을 검사해야 합니다.
      // Firebase Admin SDK를 사용하여 토큰을 검증할 수 있습니다.

      // 예약된 날짜가 도달하면 이메일을 보내도록 설정해주세요.
      const currentDate = new Date();
      if (currentDate >= new Date(reservationDate)) {
        await emailSender(to, subject, text);
        res.status(200).json({ message: 'Email sent successfully!' });
      } else {
        res.status(200).json({ message: 'Email will be sent on the reserved date.' });
      }
    } catch (error) {
      console.error('Error processing email:', error);
      res.status(500).json({ message: 'Error processing email.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
};

export default handler;
