import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByRqkVbj5U7t9vrdzPlT_YD-mSHeuQRm4",
  authDomain: "fb-crud-react-5a075.firebaseapp.com",
  projectId: "fb-crud-react-5a075",
  storageBucket: "fb-crud-react-5a075.appspot.com",
  messagingSenderId: "583287259053",
  appId: "1:583287259053:web:84c0fd1ebb87ae6edaeb24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};