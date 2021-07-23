 //cofigurando proyecto de firebase, en modo local, instalar firebase antes (npm i firebase)
 import firebase from 'firebase/app';

 //importamos la libreria de firebase, en este caso se trabajara unicamente con firestore, 
 import 'firebase/firestore';

 //credenciales que generan al crear y registrar un nuevo proyecto de firebase, para poder generar se tiene que ir a la consola de firebase
 const firebaseConfig = {
    apiKey: "AIzaSyAWQgyBJvNytG6VIQQyIiurRqpycAX_juw",
    authDomain: "practica-crud-43cd8.firebaseapp.com",
    projectId: "practica-crud-43cd8",
    storageBucket: "practica-crud-43cd8.appspot.com",
    messagingSenderId: "170652095287",
    appId: "1:170652095287:web:ecb70c03d12a1e4cf100b2"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  //exportamos firebase para poder usarlo en otros componentes
  export {firebase}

//asi quedaria el proyecto listo para empezar a crear las peticiones a la base de datos
