import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyCmYu5R72-PUipeu6Of2alQQyNH80CpJ8Y",
    authDomain: "retofinal-60fda.firebaseapp.com",
    databaseURL: "https://retofinal-60fda.firebaseio.com",
    projectId: "retofinal-60fda",
    storageBucket: "retofinal-60fda.appspot.com",
    messagingSenderId: "570136171188",
    appId: "1:570136171188:web:9ed4918bc084b94b273de1"
})
// import * as serviceWorker from './serviceWorker';
let root = document.querySelector('#root')

ReactDOM.render(<App />, root);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
