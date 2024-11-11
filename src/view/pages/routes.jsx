import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ImportData from './importData';
import NavBar from '../navBar';
import HeadersOn from './headersOn';
import WorkPackage from './workPackage';
import Settings from './settings';
import CodersForm from '../common/forms/codersForm';
import UsersForm from '../common/forms/usersForm';
import NotFound from './notFound';
import Login from './login';
import ProtectedRoutes from './protectedRoutes';

const Routes =()=>{

    const routes = createBrowserRouter([
        {
          path: "/home",
          element: <ProtectedRoutes> <NavBar /> </ProtectedRoutes>,
           errorElement: <NotFound />,
          children: [
                 { index : true,
              path: "/home/importData",
              element: <ImportData />,
            },
            {
              path: "/home/headersOn",
              element: <HeadersOn />,
            },
            {
              path: "/home/workPackage",
              element: <WorkPackage />,
            },
            {
              path: "/home/settings",
              element: <Settings />,
            },
            { path: "/home/settings/addEditCoder", element: <CodersForm /> },
            { path: "/home/settings/addEditUser", element: <UsersForm /> },
          ],
        },
        { path: "/login", element: <Login /> },
        { path: "*", element: <NotFound /> },
      ]);
return <RouterProvider router={routes}/>
}

export default Routes;

