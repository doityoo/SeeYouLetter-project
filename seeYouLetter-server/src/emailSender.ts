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
const serviceAccount = require('./../seeyouletter-735f3-firebase-adminsdk.json');
// require('dotenv').config();
// const firebaseAdminSdkFile = process.env.FIREBASE_ADMIN_SDK_FILE;
// console.log('FIREBASE_ADMIN_SDK_FILE:', process.env.FIREBASE_ADMIN_SDK_FILE);

// if (!firebaseAdminSdkFile) {
// 	console.error('FIREBASE_ADMIN_SDK_FILE이 정의되지 않았습니다.');
// 	process.exit(1);
// }

// Firebase Admin SDK 초기화
// admin.initializeApp({
// 	credential: admin.credential.cert(firebaseAdminSdkFile),
// });
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
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
	return new Promise(async (resolve, reject) => {
		// 추가된 부분

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

			const transporter = await nodemailer.createTransport({
				service: EMAIL_SERVICE,
				port: 587,
				secure: false,
				auth: {
					user: EMAIL_USER,
					pass: EMAIL_PASS,
				},
			});

			console.log("transporter? : ",transporter);

			await schedule.scheduleJob(reservationDate, async () => {
				try {
					await transporter.sendMail(mailOptions);
					console.log('예약 편지 보내기 성공');
					resolve('성공'); // 이메일 전송 성공 시 프로미스를 성공 상태로 변경
				} catch (error) {
					console.error(
						'예약된 날짜에 메일 보내는 과정에서 에러가 발생했습니다(1). :',
						error
					);
					reject(error); // 오류 발생 시 프로미스를 거부 상태로 변경
				} finally {
					console.log('작업이 실행된 이후에 해당 작업을 삭제합니다.');
				}
			});
		} catch (error) {
			console.error('이메일 처리 중 오류가 발생했습니다(2):', error);
			reject(error); // 이 부분도 수정되어야 합니다.
		}
	});
};

export default emailSender;
