import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './css/styles.css';
import './css/theme-color.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const main = document.getElementsByTagName('main')[0];

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  main
);

reportWebVitals();