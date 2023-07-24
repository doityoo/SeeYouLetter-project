import nodemailer from 'nodemailer';
import schedule from 'node-schedule';

const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS } = process.env;

const emailSender = async (
	toEmail: string,
	name: string,
	text: string,
	reservationDate: Date
) => {
	try {
		// 예약된 날짜가 도달하면 이메일을 보내도록 설정
		const currentDate = new Date();
		const transporter = nodemailer.createTransport({
			service: EMAIL_SERVICE,
			auth: {
				user: EMAIL_USER,
				pass: EMAIL_PASS,
			},
		});
		const mailOptions = {
			from: EMAIL_USER, // 보내는 이메일 주소
			to: toEmail, // 수신인 이메일 주소
			text: text, // 이메일 내용
		};
		// if (currentDate >= new Date(reservationDate)) {
		// 	await transporter.sendMail(mailOptions);
		// 	console.log('successfully sent email(즉시)');
		// } else {
		console.log('예약된 날짜에 이메일이 전송 중..');
		// 예약된 날짜에 이메일을 보내도록 스케줄링
		const scheduledJob = schedule.scheduleJob(reservationDate, async () => {
			try {
				await transporter.sendMail(mailOptions);
				console.log('successfully sent email(예약)');
			} catch (error) {
				console.error('이메일 처리 중 오류가 발생했습니다(1):', error);
			} finally {
				// 작업이 실행된 이후에 해당 작업을 삭제합니다.
				scheduledJob.cancel();
				console.log('scheduled end!');
			}
		});
		// }
	} catch (error) {
		console.error('이메일 처리 중 오류가 발생했습니다(2):', error);
	}
};

export default emailSender;
