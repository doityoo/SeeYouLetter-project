import nodemailer from 'nodemailer';
import schedule from 'node-schedule';

const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS } = process.env;

const emailSender = async (
	toEmail: string,
	name: string,
	text: string,
	reservationDate: Date
) => {
	const reservationDated = reservationDate.toISOString();

	try {
		// 여기에서 토큰의 유효성을 검사합니다.
		// Firebase Admin SDK를 사용하여 토큰을 검증할 수 있습니다.
		// 검증 로직을 추가해주세요. (Firebase Admin SDK 사용)

		// 예약된 날짜가 도달하면 이메일을 보내도록 설정합니다.
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
		if (currentDate >= new Date(reservationDated)) {
			await transporter.sendMail(mailOptions);
			console.log('이메일이 성공적으로 보내졌습니다!');
		} else {
			console.log('예약된 날짜에 이메일이 전송될 것입니다.');
			// 예약된 날짜에 이메일을 보내도록 스케줄링합니다.
			schedule.scheduleJob(reservationDated, async () => {
				try {
					await transporter.sendMail(mailOptions);
					console.log('이메일이 성공적으로 보내졌습니다!');
				} catch (error) {
					console.error('이메일 처리 중 오류가 발생했습니다:', error);
				}
			});
		}
	} catch (error) {
		console.error('이메일 처리 중 오류가 발생했습니다:', error);
	}
};

export default emailSender;
