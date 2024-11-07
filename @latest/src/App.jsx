import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '/src/pages/LandingPage';
import Merch from '/src/pages/LandingPage/MerchPage';
import SchedulePage from '/src/pages/LandingPage/SchedulePage';
import AboutPage from '/src/pages/LandingPage/AboutPage';
import ContactsPage from '/src/pages/LandingPage/ContactsPage';
import QuestionsPage from './pages/LandingPage/QuestionsPage';
import RegisterPage from '/src/pages/LandingPage/RegisterPage';
import Toast from './components/Toast';
import SubsPage from './pages/LandingPage/SubsPage';
import ClassesPage from './pages/LandingPage/ClassesPage';
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
    element: <SchedulePage />,
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
  {
    path: '/subscriptions',
    element: <SubsPage/>
  },
  {
    path: '/classes',
    element: <ClassesPage />
  }
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
