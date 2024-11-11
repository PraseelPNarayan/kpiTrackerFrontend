import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { object, string, boolean,ref } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../spinner";
import Errors from "../errors";
import Success from "../success";

import ApiService from "../../../js/api/apiService";

import { Link } from "react-router-dom";
import { updateSuccessFlag,updateStaff } from "../../../js/reducer/kpiTrackerSlice";




export default function UsersForm() {
    const dispatch = useDispatch();

    const [resetPassword, setResetPassword] = useState(false)

    const toggleSpinner = useSelector((state) => state.kpiTracker.toggleSpinner);
    const error = useSelector((state) => state.kpiTracker.error);
    const errorMessage = useSelector((state) => state.kpiTracker.errorMessage);
    const success = useSelector((state) => state.kpiTracker.success);
    const user = useSelector((state) => state.kpiTracker.userToUpdate)

      const validationSchema = object({
      email: string().email().required(),
      userName: string().required(),
      role: string().required(),
      isActive:boolean().required(),
      password:string().concat(!user.id ? string().required('Password is required'): null)
      .min(8, 'Password must be 8 characters long')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol'),
    confirm:string()
    .when('password',(password,schema)=>{if((!user.id) || (resetPassword && user.id) ) return schema.required('Confirm Password')})
      .oneOf([ref('password')], 'Must match "Password" field value'),
    });
    

    const formik = useFormik({
      initialValues: {
        // id: user.id ? user.id : 0,
        email:user.id ? user.email : "",
        userName: user.id ? user.userName : "",
        isActive: user.id ? user.isActive : true,
        role: user.id ? user.role : "",
        password: '',
        confirm:''
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {

      if(user.id)
      {
      let userToUpdate = {...values, "id" : user.id}
    dispatch(ApiService.updateUser(userToUpdate))
      }
      else {
        let payload = {
         
            "email": values.email,
            "username": values.userName,
            "password": values.password,
            "role": values.role,
            "isActive" : values.isActive
          }
        dispatch(ApiService.createUser(payload))
      }
        
  // 
      
      }
    });
  
    return (
      <div className="container mt-3 p-2" style={{backgroundColor:'white',display:'flex', justifyContent:'center', alignContent:'center'}}>
         <Errors message={errorMessage} show={error} />
        <Spinner loadSpinner={toggleSpinner} />
        <Success
          message={"User Updated"}
          show={success}
          UpdateSuccessFlag={() => dispatch(updateSuccessFlag())}
        />
          <form onSubmit={formik.handleSubmit} className="form">
       <h3 className="m-2">{user.id ? "Edit User" : "Add User"}</h3>
         
              {/* <TextField
                fullWidth
                id="ID"
                name="ID"
                label="Coders ID"
                value={formik.values.id}
                onChange={formik.handleChange}
                
                style={{ margin: "10px" }}
             
               disabled
              /> */}
                <TextField
                fullWidth
                id="userName"
                name="userName"
                label="Users Name"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.userName && Boolean(formik.errors.userName)}
                helperText={formik.touched.userName && formik.errors.userName}
                style={{ margin: "10px" }}
              />
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
                style={{ margin: "10px" }}
                disabled = {user.id ? true : false}
              />
                  <InputLabel id="status" style={{ margin: "0px" }}>
                Role
              </InputLabel>
              <Select
                labelId="role"
                id="role"
                value={formik.values.role}
                label="Role"
                onChange={(nextValue) => {
                  formik.setFieldValue("role", nextValue.target.value);
                }}
                // onBlur={formik.handleBlur}
                style={{ margin: "10px", width:'100%' }}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
              >
               
                <MenuItem value={"Admin"}>Admin</MenuItem>
                <MenuItem value={"Superuser"}>Superuser</MenuItem>
                <MenuItem value={"User"}>User</MenuItem>
                <MenuItem value={"WorkPackeage_Viewer_Only"}>WorkPackeage_Viewer_Only</MenuItem>
                <MenuItem value={"HeadersOnV_Viewer_Only"}>HeadersOnV_Viewer_Only</MenuItem>
              </Select>
         {user.id &&      <FormControlLabel control={<Switch checked={resetPassword} onChange={(value) => setResetPassword(value.target.checked)}/>} label="Reset Password" /> }
   
     
        { (!user.id) || (resetPassword) ?    <>
        <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                style={{ margin: "10px" }}
                type="password"
              />
              <TextField
                fullWidth
                id="confirm"
                name="confirm"
                label="Confirm"
                value={formik.values.confirm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.errors.confirm)}
                helperText={ formik.errors.confirm}
                style={{ margin: "10px" }}
                type="password"
              /> 
              </> : null}
    
              <InputLabel id="status" style={{ margin: "0px" }}>
                Active
              </InputLabel>
              <Select
                labelId="isActive"
                id="isActive"
                value={formik.values.isActive}
                label="Is Active"
                onChange={(nextValue) => {
                  formik.setFieldValue("isActive", nextValue.target.value);
                }}
                // onBlur={formik.handleBlur}
                style={{ margin: "10px" }}
                error={formik.touched.isActive && Boolean(formik.errors.isActive)}
                helperText={formik.touched.isActive && formik.errors.isActive}
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            {/* </Modal.Body>
            <Modal.Footer> */}
            <div className="d-flex justify-content-around">
            <Link to={"/home/settings"} color="error" variant="contained" fullWidth type="button" className="btn btn-danger col-3" onClick={()=> dispatch(updateStaff({}))}>
  Go back
            </Link>
              <Button className="ml-2" color="primary" variant="contained" fullWidth type="submit" style={{width:'70%'}}>
                Submit
              </Button>
  
            </div>
            {/* </Modal.Footer> */}
          </form>
        {/* </Modal> */}
      </div>
    );
  }
  