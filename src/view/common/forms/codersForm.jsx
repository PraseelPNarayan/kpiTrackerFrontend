import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import { object, string, boolean, required } from "yup";
import { Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../spinner";
import Errors from "../errors";
import Success from "../success";

import ApiService from "../../../js/api/apiService";
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { updateCoder,updateSuccessFlag } from "../../../js/reducer/kpiTrackerSlice";

const validationSchema = object({
  email: string().email().required(),
  name: string().required(),
  status: boolean().required(),
});

export default function CodersForm() {
  const dispatch = useDispatch();

  const toggleSpinner = useSelector((state) => state.kpiTracker.toggleSpinner);
  const error = useSelector((state) => state.kpiTracker.error);
  const errorMessage = useSelector((state) => state.kpiTracker.errorMessage);
  const success = useSelector((state) => state.kpiTracker.success);

  const coder = useSelector((state) => state.kpiTracker.coderToUpdate)

  const isAddMode = !coder.id;

  const formik = useFormik({
    initialValues: {
      id: coder ? coder.id : null,
      email:coder ? coder.email : "",
      name: coder ? coder.name : "",
      status: coder ? coder.status : true,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
  
    if(coder.id)
    {

  dispatch(ApiService.updateCoder({...values,...coder.id}))
    }
    else {
      dispatch(ApiService.createCoder(values))
    }
      
// 
    
    }
  });

  return (
    <div className="container" style={{backgroundColor:'white', width:'50vh',height:'60vh', textAlign:'center', alignContent:'center'}}>
       <Errors message={errorMessage} show={error} />
      <Spinner loadSpinner={toggleSpinner} />
      <Success
        message={"Coder Updated"}
        show={success}
        UpdateSuccessFlag={() => dispatch(updateSuccessFlag())}
      />
      {/* <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={HandleCloseModal}
      > */}
      {isAddMode ? <h3>Create Coder</h3> : <h3>Edit Coder</h3>}
        <form onSubmit={formik.handleSubmit} color="secondary" variant="outlined">
          {/* <Modal.Header closeButton>
            <Modal.Title>Add\Update Coder</Modal.Title>
          </Modal.Header>
          <Modal.Body> */}
            <TextField
              fullWidth
              id="ID"
              name="ID"
              label="Coders ID"
              value={formik.values.id}
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // error={formik.touched.email && Boolean(formik.errors.email)}
              // helperText={formik.touched.email && formik.errors.email}
              style={{ margin: "10px" }}
              // aria-readonly
             disabled
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Coders Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              style={{ margin: "10px" }}
            />
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Coders Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              style={{ margin: "10px" }}
            />
             <FormControl variant='outlined' fullWidth>
            <InputLabel id="status" >
              Status
            </InputLabel>
            <Select
              labelId="status"
              id="status"
              value={formik.values.status}
              label="Status"
              onChange={(nextValue) => {
                formik.setFieldValue("status", nextValue.target.value);
              }}
              // onBlur={formik.handleBlur}
              style={{ margin: "10px" }}
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}
            >
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select></FormControl>
          {/* </Modal.Body>
          <Modal.Footer> */}
          <div className="d-flex justify-content-around">
          <Link to={"/home/settings"} color="error" variant="contained" fullWidth type="button" className="btn btn-danger col-3" onClick={()=> dispatch(updateCoder({}))}>
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
