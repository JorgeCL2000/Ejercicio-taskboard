// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBHSK8D2ZMloFYaXNAVkTizGwVodnI7n7E',
  authDomain: 'taskboard-f6aae.firebaseapp.com',
  projectId: 'taskboard-f6aae',
  storageBucket: 'taskboard-f6aae.firebasestorage.app',
  messagingSenderId: '114731103044',
  appId: '1:114731103044:web:f41d135c4d08b4b0329d11',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
