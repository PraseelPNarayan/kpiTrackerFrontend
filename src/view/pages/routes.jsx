import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
import { useAuth } from '../../js/auth/authProvider';
import Unauthorized from './unAuthorised';
import Roles from '../../js/auth/roles';

const Routes =()=>{
    const routes = createBrowserRouter([
        {
          path: "/home",
          element: <ProtectedRoutes element={ <NavBar />}  roles={Roles.AccessAll} /> ,
           errorElement: <NotFound />,
          children: [
                 { index : true,
              path: "/home/importData",
              element:<ProtectedRoutes element={<ImportData />} roles={Roles.ImportDataRole} /> ,
            },
            {
              path: "/home/headersOn",
              element: <ProtectedRoutes element={<HeadersOn />} roles={Roles.ImportDataRole} />,
            },
            {
              path: "/home/workPackage",
              element: <ProtectedRoutes element={<WorkPackage />} roles={Roles.WorkPackageRole} />,
            },
            {
              path: "/home/settings",
              element:<ProtectedRoutes element={<Settings />} roles={Roles.SettingsRole} />,
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

