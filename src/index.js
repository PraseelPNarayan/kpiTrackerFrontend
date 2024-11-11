import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./view/pages/notFound";
import SpreadSheetImporter from "./view/common/spreadSheetImporter";
import HeadersOn from "./view/pages/headersOn";
import Workpackage from "./view/pages/workPackage";
import ImportData from "./view/pages/importData";
import { store } from "./js/store/store";
import { Provider, useSelector } from "react-redux";
import Settings from "./view/pages/settings";
import CodersForm from "./view/common/forms/codersForm";
import NavBar from "./view/navBar";
import UsersForm from "./view/common/forms/usersForm";
import Login from "../src/view/pages/login";
import ProtectedRoutes from "./view/pages/protectedRoutes";
import Routes from "./view/pages/routes";
import AuthProvider from "./js/auth/authProvider";




// const router = createBrowserRouter([
//   {
//     path: "/home",
//     element: <ProtectedRoutes> <NavBar /> </ProtectedRoutes>,
//      errorElement: <NotFound />,
//     children: [
//            { index : true,
//         path: "/home/importData",
//         element: <ImportData />,
//       },
//       {
//         path: "/home/headersOn",
//         element: <HeadersOn />,
//       },
//       {
//         path: "/home/workPackage",
//         element: <Workpackage />,
//       },
//       {
//         path: "/home/settings",
//         element: <Settings />,
//       },
//       { path: "/home/settings/addEditCoder", element: <CodersForm /> },
//       { path: "/home/settings/addEditUser", element: <UsersForm /> },
//     ],
//   },
//   { path: "/login", element: <Login /> },
//   { path: "*", element: <NotFound /> },
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>

  <Provider store={store}>

    {/* <RouterProvider router={router} /> */}
    <AuthProvider>

    <Routes/>
    </AuthProvider>

  </Provider>
 
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
