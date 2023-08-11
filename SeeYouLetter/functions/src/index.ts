import * as functions from 'firebase-functions';
import emailSender from '../../src/utils/emailSender';
// -------------but '--jsx' is not set ERROR > emailSender확장명을 ts로 변경

export const sendEmail = functions.https.onRequest(async (req, res) => {
  if (req.method === 'POST') {
    const { toEmail, text, name, reservationDate, subject } = req.body;
    console.log('서버 데이터 테스트(sendEmail): ', req.body);

    try {
      // 여기에서 예약된 날짜 로직을 추가
      // 예약된 날짜가 도달하면 이메일을 보내도록 설정
      const delay = reservationDate.getTime() - Date.now();
      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));

        await emailSender(toEmail, name, text, reservationDate, subject);
        res.status(200).json({ message: 'Email sent.' });
      }
    } catch (error) {
      console.error('Error processing email:', error);
      res.status(500).json({ message: 'Error processing email.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
});
