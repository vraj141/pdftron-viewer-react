import firebase from "firebase/app";
import "firebase/storage"

 
const firebaseConfig = {
    apiKey: "AIzaSyDVjvdgk4hBrRyO-tXlT3OicqqpM-dCNQo",
    authDomain: "fir-react-upload-472ad.firebaseapp.com",
    projectId: "fir-react-upload-472ad",
    storageBucket: "fir-react-upload-472ad.appspot.com",
    messagingSenderId: "1038885452377",
    appId: "1:1038885452377:web:04f796878203e084b0cf48"
  };

  firebase.initializeApp(firebaseConfig);
 
  const storage = firebase.storage();
  export{storage,firebase as default};