import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from '/src/contexts/UserContext';
import './index.css';
// import Loader from '/src/components/Loader';

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <UserProvider>  
      {/* <Loader /> */}
      <App />
    </UserProvider>
  </React.StrictMode>
);