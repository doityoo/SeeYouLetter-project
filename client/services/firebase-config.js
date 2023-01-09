// Import the functions you need from the SDKs you need
import { firebase } from "firebase/app";
import { getAuth } from "firebase/auth";

const APIKEY = process.env.REACT_APP_FIREBASE_API
const AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID
const STORAGE_BUCKET = process.env.REACT_APP_STORAGE_BUCKET
const MEASSAGING_SENDER_ID = process.env.REACT_APP_MESSAGING_SENDER_ID
const APP_ID = process.env.REACT_APP_APP_ID
const MEASUREMENT_ID = process.env.REACT_APP_MEASUREMENT_ID

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MEASSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};
export default firebaseConfig;

// Initialize Firebase
const app = firebase(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();