import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "parach-admin.firebaseapp.com",
    projectId: "parach-admin",
    storageBucket: "parach-admin.appspot.com",
    messagingSenderId: "249296540407",
    appId: "1:249296540407:web:ea58fd0b04f917f0c839f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
export const facebookAuth = new FacebookAuthProvider();


// export default app

// const provider = new app.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: 'select_account' });
// export const signInWithGoogle = () => {
//     signInWithPopup(auth, provider).then((result) => {
//         console.log(result);
//     }).catch((error) => {
//         console.log(error);
//     })
// }
