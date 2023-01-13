const firebase = require('firebase/app')
require('firebase/auth')

//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDBWt_G3vgQ1zYNs0RUWz6Lbrmxg6mzPtU",
    authDomain: "e-shops-6e55a.firebaseapp.com",
    projectId: "e-shops-6e55a",
    storageBucket: "e-shops-6e55a.appspot.com",
    messagingSenderId: "29676985239",
    appId: "1:29676985239:web:2e2ced59f7c902849402d2"
};

firebase.initializeApp(firebaseConfig);

module.exports = firebase;