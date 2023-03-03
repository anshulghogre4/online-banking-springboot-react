import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './Components/Context/UserContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
   <Toaster
    position="top-right"
    reverseOrder={true}
    />
  <React.StrictMode>
  
  <UserContextProvider>
    <App />
  </UserContextProvider>
  </React.StrictMode>
  
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
