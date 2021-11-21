import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";

// import {FirebaseAppProvider} from 'reactfire'


ReactDOM.render(
  // <FirebaseAppProvider firebaseConfig = {firebaseConfig}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    // </FirebaseAppProvider>
    ,
  document.getElementById('root')
);
