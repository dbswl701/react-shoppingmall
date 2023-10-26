// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/database';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGE_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
  measurementId: process.env.REACT_APP_FB_MEASURE_ID,
  databaseURL: process.env.REACT_APP_FB_DATABASE_NAME,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const database = firebase.database();

// Initialize Firebase Authentication and get a reference to the service. Firebase Authentication 인스턴스 생성
// const auth = firebase.auth();

export default firebase;