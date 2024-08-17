import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from '/src/contexts/UserContext';
import LandingPage from '/src/pages/LandingPage';
import Merch from '/src/pages/LandingPage/MerchPage';
import LessonPage from '/src/pages/LandingPage/LessonPage';
import AboutPage from '/src/pages/LandingPage/AboutPage';
import ContactsPage from '/src/pages/LandingPage/ContactsPage';
import QuestionsPage from './pages/LandingPage/QuestionsPage';
import RegisterPage from '/src/pages/LandingPage/RegisterPage';
import Toast from './components/Toast';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/merch',
      element: <Merch />,
    },
    {
      path: '/free-lesson',
      element: <LessonPage />,
    },
    {
      path: '/about',
      element: <AboutPage />,
    },
    {
      path: '/contacts',
      element: <ContactsPage />,
    },
    {
      path: '/q&a',
      element: <QuestionsPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    }
  ]);

  return (
    <React.StrictMode>
      <UserProvider>
        <RouterProvider router={router} />
        <Toast />
      </UserProvider >
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
