import fs from 'fs';
import path from 'path';
import admin from 'firebase-admin';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import schedule from 'node-schedule';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('ko');
dayjs.extend(relativeTime);

// Firebase Admin SDK 초기화
// const serviceAccount = require('./../seeyouletter-735f3-firebase-adminsdk.json');
require('dotenv').config();
const firebaseAdminSdkFile = process.env.FIREBASE_ADMIN_SDK_FILE;

if (!firebaseAdminSdkFile) {
	console.error('FIREBASE_ADMIN_SDK_FILE이 정의되지 않았습니다.');
	process.exit(1);
}

// Firebase Admin SDK 초기화
admin.initializeApp({
	credential: admin.credential.cert(firebaseAdminSdkFile),
});

const db = admin.firestore();

const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS } = process.env;

interface MailOptionsTypes {
	to: string;
	subject: string;
	html: string;
}

const emailSender = async (
	toEmail: string,
	name: string,
	text: string,
	reservationDate: Date,
	subject: string
) => {
	try {
		const templatePath = path.join(__dirname, 'src', 'email-template.hbs');
		const templateSource = fs.readFileSync(templatePath, 'utf8');
		const emailTemplate = handlebars.compile(templateSource);

		const currentDate = dayjs(new Date()).format('YYYY년 MM월 DD일');

		const mailTemplate = {
			to: toEmail,
			name: name,
			subject: subject,
			text: text,
			currentDate: currentDate,
		};

		const emailContent = await emailTemplate(mailTemplate);

		const mailOptions: MailOptionsTypes = {
			to: toEmail,
			subject: subject,
			html: emailContent,
		};

		// firebase db에 mailOptions 저장
		const saveMailOptionsToFirestore = async (
			mailOptions: MailOptionsTypes
		) => {
			try {
				await db.collection('mailOptions').add(mailOptions);
				console.log('mailOptions 데이터가 Firestore에 저장되었습니다.');
			} catch (error) {
				console.error(
					'Firestore에 데이터를 저장하는 중 오류가 발생했습니다:',
					error
				);
			}
		};

		await saveMailOptionsToFirestore(mailOptions);

		// 예약된 날짜가 도달하면 이메일을 보내도록 설정
		const transporter = await nodemailer.createTransport({
			service: EMAIL_SERVICE,
			port: 587,
			secure: false,
			auth: {
				user: EMAIL_USER,
				pass: EMAIL_PASS,
			},
		});

		// 예약된 날짜에 이메일을 보내도록 스케줄링
		schedule.scheduleJob(reservationDate, async () => {
			try {
				await transporter.sendMail(mailOptions);
				console.log('예약 편지 보내기 성공');
			} catch (error) {
				console.error('이메일 처리 중 오류가 발생했습니다(1):', error);
			} finally {
				// 작업이 실행된 이후에 해당 작업을 삭제합니다.
				console.log('scheduled end!');
			}
		});
	} catch (error) {
		console.error('이메일 처리 중 오류가 발생했습니다(2):', error);
	}
};

export default emailSender;
