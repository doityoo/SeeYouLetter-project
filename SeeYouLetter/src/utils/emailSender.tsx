import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import schedule from 'node-schedule';

import 'dayjs/locale/ko'; // 한국어 가져오기
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('ko');
dayjs.extend(relativeTime);

const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS } = process.env;

const emailSender = async (
	toEmail: string,
	name: string,
	text: string,
	reservationDate: Date,
	subject: string
) => {
	try {
		const templatePath = path.join(
			process.cwd(),
			'pages/api/email-template.hbs'
		);
		const templateSource = fs.readFileSync(templatePath, 'utf8');
		const emailTemplate = handlebars.compile(templateSource);

		// 예약된 날짜가 도달하면 이메일을 보내도록 설정
		const transporter = nodemailer.createTransport({
			service: EMAIL_SERVICE,
			auth: {
				user: EMAIL_USER,
				pass: EMAIL_PASS,
			},
		});

		await new Promise((resolve, reject) => {
			// verify connection configuration
			transporter.verify(function (error, success) {
				if (error) {
					console.log(error);
					reject(error);
				} else {
					console.log('Server is ready to take our messages');
					resolve(success);
				}
			});
		});

		const currentDate = dayjs(new Date()).format('YYYY년 MM월 DD일');

		const templateDate = {
			to: toEmail, // 수신인 이메일 주소
			name: name, // 받는이 이름
			subject: subject, // 제목
			text: text, // 이메일 내용
			currentDate: currentDate,
		};
		console.log('서버 데이터 테스트(emailSender)3 :', templateDate);

		const emailContent = emailTemplate(templateDate);

		const mailOptions = {
			to: toEmail, // 수신인 이메일 주소
			subject: subject, // 이메일 제목
			html: emailContent, // 렌더링된 템플릿 내용
		};

		console.log('예약된 날짜에 이메일이 전송 중..');
		console.log('서버 데이터 테스트(emailSender)4 :', mailOptions);
		// 예약된 날짜에 이메일을 보내도록 스케줄링
		const scheduledJob = await schedule.scheduleJob(
			reservationDate,
			async () => {
				try {
					await transporter.sendMail(mailOptions);
					console.log('successfully sent email(예약)');
				} catch (error) {
					console.error('이메일 처리 중 오류가 발생했습니다(1):', error);
				} finally {
					// 작업이 실행된 이후에 해당 작업을 삭제합니다.
					await scheduledJob.cancel();
					console.log('scheduled end!');
				}
			}
		);
	} catch (error) {
		console.error('이메일 처리 중 오류가 발생했습니다(2):', error);
	}
};

export default emailSender;
