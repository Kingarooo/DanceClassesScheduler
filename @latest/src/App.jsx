import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '/src/pages/LandingPage';
import Merch from '/src/pages/LandingPage/MerchPage';
import LessonPage from '/src/pages/LandingPage/LessonPage';
import AboutPage from '/src/pages/LandingPage/AboutPage';
import ContactsPage from '/src/pages/LandingPage/ContactsPage';
import QuestionsPage from './pages/LandingPage/QuestionsPage';
import RegisterPage from '/src/pages/LandingPage/RegisterPage';
import Toast from './components/Toast';
// import Loader from '/src/components/Loader';

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
    path: '/lessons',
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
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toast />
    </>
  );
};

export default App;
