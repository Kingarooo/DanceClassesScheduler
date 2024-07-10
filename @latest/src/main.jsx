import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from '/src/pages/LandingPage'
import Merch from '/src/pages/LandingPage/Merch'
import LessonPage from '/src/pages/LandingPage/LessonPage'
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
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
