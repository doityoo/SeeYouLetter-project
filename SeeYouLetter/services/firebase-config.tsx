// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};
// Initialize Firebase
const firebaseConfigString = JSON.stringify(firebaseConfig);
const app = initializeApp(JSON.parse(firebaseConfigString) as FirebaseOptions);
export default app;
// 이메일 로그인
export const authService = getAuth(app);
// 구글 소셜로그인
// export const googleProvider = new initializeApp.auth.GoogleAuthProvider();
export const database = getFirestore(app);
// db 접근
