import React from 'react';
import ReactDOM from 'react-dom/client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.scss';

import { Buffer } from 'buffer';
import process from 'process';

import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./app/redux/store";
import App from './App';


window.Buffer = Buffer;
window.process = process;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
