import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, FormControl, Button, FormLabel } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { object, string, boolean, ref } from "yup";
import { replace, useFormik } from "formik";
import axios from "axios";

import ApiService, { baseUrl } from "../../js/api/apiService";
import Errors from "../common/errors";
import { loginStaff } from "../../js/reducer/kpiTrackerSlice";
import { useNavigate, Routes, Route, redirect } from "react-router-dom";
import { useAuth } from "../../js/auth/authProvider";

const Login = () => {
  const [error, setShowError] = useState(false);
  const [errorMessage, setShowErrorMessage] = useState();
  const [disableButton, setLoginButtonDisabled] = useState(false)
  const isLoggedIn = useSelector(
    (state) => state.kpiTracker.loggedInStaff
  );

  const {setToken} = useAuth()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputFieldTheme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: '1rem',
            backgroundColor:'white',
             width: '300px',
            marginBottom:'25px',
            textAlign:'center'
          },
        },
      },
      MuiButton:{
        styleOverrides:{
          root:{
            // width:'400px'
          }
        }
      },
      
    },
  });

  useEffect(() => {
    if (isLoggedIn.isLoggedIn) navigate("/home/importData", { replace: true });
  }, [isLoggedIn]);

  const validationSchema = object({
    email: string().email().required(),
    password: string().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoginButtonDisabled(true);
      let payload = {
        email: values.email,
        password: values.password,
      };

      if (error) setShowError(false);

      axios
        .post(baseUrl + "/login/login", payload)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem(
              "token",
              JSON.stringify({
                // email: values.email,
                token: response.data.loggedIn.token,
                // isLoggedIn: true,
              })
            );

            let loginStaffPayload = {
              email: values.email,
              userName : response.data.loggedIn.userName,
              role : response.data.loggedIn.role,
              isLoggedIn: response.data.loggedIn.isLoggedIn,
              token: response.data.loggedIn.token,
              id: response.data.loggedIn.id
            };
            setToken(JSON.stringify(loginStaffPayload));
            dispatch(loginStaff(loginStaffPayload));
            navigate("/home/importdata", { replace: true });
         
          }
        })
        .catch((error) => {
          setLoginButtonDisabled(false)
          if (error.status === 401) {
            setShowError(true);
            setShowErrorMessage(
              "Looks like Authentication did not pass. Either email or password is incorrect or you are not allowed to login"
            );
          }
          if (error.status === 500) {
            setShowError(true);
            setShowErrorMessage(
              "There is an issue with your login, please try with correct credentials"
            );
          } else {
            setShowError(true);
            setShowErrorMessage(error.message);
          }
        });
    },
  });

  return (
    <React.Fragment>
          <Errors show={error} message={errorMessage} showHeading={false} />
      <div className="loginPage">
        <div style={{position:'absolute', top:'10px', left:'10px'}}>

        <img
          className="m-1"
          src={window.location.origin + "/Intergroup-logo-Top.png"}
          alt="Intergroup Logo"
          height={60} width={200}
        />
        </div>
        <div className="loginForm">
     
      
        <div className="loginFormContainer">
          <h5 >Kpi Tracker</h5>

          <form
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
            <FormLabel style={{ fontSize: "18px", marginBottom: "25px", color:'black' }}>
              Please login to continue
            </FormLabel>
<ThemeProvider theme={inputFieldTheme}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Users Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              // style={{ marginBottom: "15px", width: "500px" }}
              
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              // style={{ marginBottom: "20px", width: "500px" }}
            />
          
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled = {disableButton ? true : false}
              // style={{ width: "500px" }}
            >
               {disableButton ? 'Please wait.....' : 'Login'}
            </Button>  </ThemeProvider>
          </form>
          {/* <Routes>
        <Route path="/home" element={<ProtectedRoutes />}/>
      </Routes> */}
        </div>
        </div>
        <div className="loginImage">
         
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
