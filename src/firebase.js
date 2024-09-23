import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBtUpoKYneHgX9_TSoz4wGw-kN368ykVmE",
    authDomain: "react-prac-a899e.firebaseapp.com",
    projectId: "react-prac-a899e",
    storageBucket: "react-prac-a899e.appspot.com",
    messagingSenderId: "2311366147",
    appId: "1:2311366147:web:757a1159e3f85c3140d036",
    measurementId: "G-N0ES79XHCH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export  { auth };