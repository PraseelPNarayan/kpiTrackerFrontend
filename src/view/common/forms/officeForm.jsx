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
import { updateSuccessFlag} from "../../../js/reducer/kpiTrackerSlice";




export default function OfficeForm() {
    const dispatch = useDispatch();

    const toggleSpinner = useSelector((state) => state.kpiTracker.toggleSpinner);
    const error = useSelector((state) => state.kpiTracker.error);
    const errorMessage = useSelector((state) => state.kpiTracker.errorMessage);
    const success = useSelector((state) => state.kpiTracker.success);
    const office = useSelector((state) => state.kpiTracker.officeToUpdate)

      const validationSchema = object({
      name: string().required(),
    
    });
    

    const formik = useFormik({
      initialValues: {
        // id: office.id ? office.id : 0,
        name:office.id ? office.name : "",
       
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {

      if(office.id)
      {
      let officeToUpdate = {...values, "id" : office.id}
    dispatch(ApiService.updateOffice(officeToUpdate))
      }
      else {
        let payload = {
         
            "name": values.name,
        
          }
        dispatch(ApiService.createOffice(payload))
      }
        
  // 
      
      }
    });
  
    return (
      <div className="container mt-3 p-2" style={{backgroundColor:'white',display:'flex', justifyContent:'center', alignContent:'center'}}>
         <Errors message={errorMessage} show={error} />
        <Spinner loadSpinner={toggleSpinner} />
        <Success
          message={"Office Updated"}
          show={success}
          UpdateSuccessFlag={() => dispatch(updateSuccessFlag())}
        />
          <form onSubmit={formik.handleSubmit} className="form p-3">
       <h3 className="m-2">{office.id ? "Edit Office" : "Add Office"}</h3>
         
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
                id="name"
                name="name"
                label="Office Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                style={{ margin: "10px" }}
              />
            
            <div className="d-flex justify-content-around">
            <Link to={"/home/settings"} color="error" variant="contained" fullWidth type="button" className="btn btn-danger col-3" 
            // onClick={()=> dispatch(updateOffice({}))}
            >
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
  