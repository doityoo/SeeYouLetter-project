import fs from 'fs';
import path from 'path';
import admin from 'firebase-admin';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import schedule from 'node-schedule';
import serviceAccount from './../../seeyouletter-735f3-firebase-adminsdk-5wshl-2235575ff4.json';
import { ServiceAccount } from 'firebase-admin';

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount as ServiceAccount),
	});
}

const db = admin.firestore();

import 'dayjs/locale/ko'; // 한국어 가져오기
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('ko');
dayjs.extend(relativeTime);

const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS } = process.env;

interface mailOptionsTypes {
	to: string; // 수신인 이메일 주소
	subject: string; // 이메일 제목
	html: string; // 렌더링된 템플릿 내용
}

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
		const transporter = await nodemailer.createTransport({
			service: EMAIL_SERVICE,
			port: 587,
			secure: true,
			auth: {
				user: EMAIL_USER,
				pass: EMAIL_PASS,
			},
		});

		const currentDate = dayjs(new Date()).format('YYYY년 MM월 DD일');

		const mailTemplate = {
			to: toEmail, // 수신인 이메일 주소
			name: name, // 받는이 이름
			subject: subject, // 제목
			text: text, // 이메일 내용
			currentDate: currentDate,
		};

		const emailContent = await emailTemplate(mailTemplate);

		const mailOptions: mailOptionsTypes = {
			to: toEmail, // 수신인 이메일 주소
			subject: subject, // 이메일 제목
			html: emailContent, // 렌더링된 템플릿 내용
		};

		console.log('예약된 날짜에 이메일이 전송 중..');

		// firebase db에 mailOptions 저장
		const saveMailOptionsToFirestore = async (
			mailOptions: mailOptionsTypes
		) => {
			try {
				// Firestore에 데이터 저장
				await db.collection('mailOptions').add(mailOptions);
				console.log('mailOptions 데이터가 Firestore에 저장되었습니다.');
			} catch (error) {
				console.error(
					'Firestore에 데이터를 저장하는 중 오류가 발생했습니다:',
					error
				);
			}
		};
		saveMailOptionsToFirestore(mailOptions);

		// 예약된 날짜에 이메일을 보내도록 스케줄링
		// const scheduledJob = await schedule.scheduleJob(
		// 	reservationDate,
		// 	async () => {
		// 		try {
		// 			await transporter.sendMail(mailOptions);
		// 			console.log('successfully sent email(예약)');
		// 		} catch (error) {
		// 			console.error('이메일 처리 중 오류가 발생했습니다(1):', error);
		// 		} finally {
		// 			// 작업이 실행된 이후에 해당 작업을 삭제합니다.
		// 			await scheduledJob.cancel();
		// 			console.log('scheduled end!');
		// 		}
		// 	}
		// );
	} catch (error) {
		console.error('이메일 처리 중 오류가 발생했습니다(2):', error);
	}
};

export default emailSender;
