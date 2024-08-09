import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from '/src/pages/LandingPage'
import Merch from '/src/pages/LandingPage/MerchPage'
import LessonPage from '/src/pages/LandingPage/LessonPage'
import AboutPage from '/src/pages/LandingPage/AboutPage'
import ContactsPage from '/src/pages/LandingPage/ContactsPage'
import QuestionsPage from './pages/LandingPage/QuestionsPage'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/merch",
    element: <Merch />
  },
  {
    path: "/free-lesson",
    element: <LessonPage />
  },
  {
    path: "/about",
    element: <AboutPage />
  },
  {
    path: "/contacts",
    element: <ContactsPage/>
  },
  {
    path: "/q&a",
    element: <QuestionsPage/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
