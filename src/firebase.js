import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { getAuth } from "firebase/auth";

import { FB_APP_URL } from "./config/config";

const firebaseConfig = {
  apiKey: "AIzaSyD2K5TBJdTlPphUYBhgTvV9Y6Tp2PDYtm0",
  authDomain: "nomvilla-b2b81.firebaseapp.com",
  projectId: "nomvilla-b2b81",
  storageBucket: "nomvilla-b2b81.appspot.com",
  messagingSenderId: "789314975719",
  appId: "1:789314975719:web:8668e048ce635b07c46f42",
  measurementId: "G-42PVB1JTKD",
  databaseURL: FB_APP_URL,
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const user = auth.currentUser;

export default app;
