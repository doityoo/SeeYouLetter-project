import fs from 'fs';
import path from 'path';
import admin from 'firebase-admin';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import schedule from 'node-schedule';
// import serviceAccount from './../../seeyouletter-735f3-firebase-adminsdk.json';
// import { ServiceAccount } from 'firebase-admin';

// -------------admin init이 필요한가?
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount as ServiceAccount),
//   });
// }

const db = admin.firestore();

// -------------날짜 가져오는 모듈
import 'dayjs/locale/ko'; // 한국어 가져오기
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('ko');
dayjs.extend(relativeTime);

// -------------env 구조분해 할당
const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS } = process.env;

// -------------mail타입
interface mailOptionsTypes {
  to: string; // 수신인 이메일 주소
  subject: string; // 이메일 제목
  html: string; // 렌더링된 템플릿 내용
}

// -------------emailSender 함수
const emailSender = async (
  toEmail: string,
  name: string,
  text: string,
  reservationDate: Date,
  subject: string,
) => {
  try {
    const templatePath = path.join(
      process.cwd(),
      'pages/api/email-template.hbs',
    );
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

    const mailOptions: mailOptionsTypes = {
      to: toEmail,
      subject: subject,
      html: emailContent,
    };

    // firebase db에 mailOptions 저장
    const saveMailOptionsToFirestore = async (
      mailOptions: mailOptionsTypes,
    ) => {
      try {
        // Firestore에 데이터 저장
        await db.collection('mailOptions').add(mailOptions);
        console.log('mailOptions 데이터가 Firestore에 저장되었습니다.');
      } catch (error) {
        console.error(
          'Firestore에 데이터를 저장하는 중 오류가 발생했습니다:',
          error,
        );
      }
    };

    await saveMailOptionsToFirestore(mailOptions);

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

    // 예약된 날짜에 이메일을 보내도록 스케줄링
    const scheduledJob = await schedule.scheduleJob(
      reservationDate,
      async () => {
        try {
          await transporter.sendMail(mailOptions);
          console.log('예약 편지 보내기 성공');
        } catch (error) {
          console.error('이메일 처리 중 오류가 발생했습니다(1):', error);
        } finally {
          // 작업이 실행된 이후에 해당 작업을 삭제합니다.
          await scheduledJob.cancel();
          console.log('scheduled end!');
        }
      },
    );
  } catch (error) {
    console.error('이메일 처리 중 오류가 발생했습니다(2):', error);
  }
};

export default emailSender;
