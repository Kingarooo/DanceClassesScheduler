
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './style.css';

const Toast = () => {
<ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition: Bounce
/>
}

export const showToast = (type, message) => {
    switch (type) {
        case 'success':
          toast.success(message);
          break;
        case 'error':
          toast.error(message);
          break;
        case 'warn':
          toast.warn(message);
          break;
        case 'info':
        default:
          toast.info(message);
          break;
      }
}
