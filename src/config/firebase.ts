import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDu6dlt4b50lZj6VbOZqEqX7LMuRehVORc",
    authDomain: "prueba-app-21c6d.firebaseapp.com",
    projectId: "prueba-app-21c6d",
    storageBucket: "prueba-app-21c6d.appspot.com",
    messagingSenderId: "242770769405",
    appId: "1:242770769405:web:40ac388b9034a8f5325594"
  };
  
  // Inicializar Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  export default db;