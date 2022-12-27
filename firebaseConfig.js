// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    initializeAuth,
    getReactNativePersistence,
} from "firebase/auth/react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDSMFZjg3S07QcHxM5R26tD9wsYL3jLX5U",
    authDomain: "nanika-82072.firebaseapp.com",
    projectId: "nanika-82072",
    storageBucket: "nanika-82072.appspot.com",
    messagingSenderId: "1023316139308",
    appId: "1:1023316139308:web:a8d5f4165f8d97e8252089",
    measurementId: "G-BCZ2XSEK7W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});
export { auth };
export const db = getFirestore(app);
