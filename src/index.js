import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import NotFound from './view/pages/notFound'
import SpreadSheetImporter from './view/common/spreadSheetImporter';
import HeadersOn from './view/pages/headersOn'
import Workpackage from './view/pages/workPackage'
import ImportData from './view/pages/importData';
import { store } from './js/store/store';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    errorElement: <NotFound />,
    children:[
      {
        path:'/importData',
        element: <ImportData />
      },
      {
        path:'/headersOn',
        element: <HeadersOn />
      },
      {
        path:'/workPackage',
        element: <Workpackage />
      }
    ]
  },

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
  <RouterProvider router={router}/></Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
