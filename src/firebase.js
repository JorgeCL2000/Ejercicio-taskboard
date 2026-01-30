import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyBHSK8D2ZMloFYaXNAVkTizGwVodnI7n7E',
  authDomain: 'taskboard-f6aae.firebaseapp.com',
  projectId: 'taskboard-f6aae',
  storageBucket: 'taskboard-f6aae.firebasestorage.app',
  messagingSenderId: '114731103044',
  appId: '1:114731103044:web:f41d135c4d08b4b0329d11',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe()
        resolve(user)
      },
      reject,
    )
  })
}
