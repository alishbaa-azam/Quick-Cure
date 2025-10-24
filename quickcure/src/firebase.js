// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCFfMl6FA5xxHJKv69ajWawys1lzwKpOoY",
  authDomain: "myauthapp-52ce5.firebaseapp.com",
  projectId: "myauthapp-52ce5",
  storageBucket: "myauthapp-52ce5.appspot.com",
  messagingSenderId: "816451714809",
  appId: "1:816451714809:web:7bc0e5ae2b7aa4d5712c28",
  measurementId: "G-M1RRJD5C1M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
