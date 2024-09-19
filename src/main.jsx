import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import axios from 'axios';
import Cookies from 'js-cookie';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

axios.defaults.baseURL = 'http://localhost/excel-clone/public/api';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get('token');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
