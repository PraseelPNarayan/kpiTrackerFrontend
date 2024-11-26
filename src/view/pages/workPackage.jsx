import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Button,
Form,
  CardHeader,
  CardBody,
  CardTitle,
} from "react-bootstrap";
import { Tooltip } from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCross,
  faMagnifyingGlass,
 faPenToSquare
} from "@fortawesome/free-solid-svg-icons";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Skeleton, Box } from "@mui/material";
import Modal from "react-bootstrap/Modal";

import Table from "../common/table";
import ApiService from "../../js/api/apiService";
import moment from "moment";
import { FormHelperText, InputLabel } from "@mui/material";

import Success from "../common/success";
import Errors from "../common/errors";
import { Spinner } from "../common/spinner";
import { workPackage,updatePutSuccessFlag } from "../../js/reducer/kpiTrackerSlice";

export default function WorkPackage() {
  const data = useSelector(workPackage);
  const status = useSelector((state) => state.kpiTracker.status);
  const toggleSpinner = useSelector((state) => state.kpiTracker.toggleSpinner);
  const error = useSelector((state) => state.kpiTracker.error);
  const errorMessage = useSelector((state) => state.kpiTracker.errorMessage);

  const [columnHeaders, setColumnHeaders] = useState([]);
  const [apiStatusChanged, setApiStatusChanged] = useState(status);
  // const [data, setData] = useState(storeData);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [showError, setShowError] = useState(error);
  const [showErrorMessage, setShowErrorMessage] = useState(errorMessage)
  const [pagedData, setPagedData] = useState();
  const [rowIds, setRowIds] = useState([]);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const putWorkPackageSuccess = useSelector(
    (state) => state.kpiTracker.success
  );
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let completeionStatusValue = null;
  let completeionCharacterizationValue = null;
  let characterizationValue = null;

  const completeionStatus = ApiService.workPackageFields.filter(v => v.label === 'Completion Status')
  const completeionCharacterization = ApiService.workPackageFields.filter(v => v.label === 'Completion Characterization')
  const characterization = ApiService.workPackageFields.filter(v => v.label === 'Characterization')

  useEffect(() => {
    loadTableHeaders();

    //  setData(storeData);

    // setApiStatusChanged(status)
  }, [data]);

  const updateRowInStore = (data) => {
    let payload = []
    payload.push(data)
    // console.log(payload)
     dispatch(ApiService.putWorkpackagesBatch
      (payload))
  };

  const loadAllWorkPackages = () => {
    if (fromDate > toDate) {
      setShowErrorMessage("From date cannot be past to date")
      setShowError(true);
    } else {
      if (showError) {
        setShowError(false);
      }

      let payload = {
        fromDate,
        toDate,
      };

      dispatch(ApiService.getAllWorkpackages(payload));

      //  setData(storeData)
      setApiStatusChanged(status);
      // setFromDate()
      // setToDate()
    }
    //
  };

  const loadTableHeaders = () => {
    let tempCol = [];
    if (data && data.length > 0)
      ApiService.workPackageFields.map((columnHeader) => {
        let schema = {
          field: columnHeader.key,
          headerName: columnHeader.label,
          editable: columnHeader.editable ?? true,
          // headerClassName: "super-app-theme--header",
          type: columnHeader.type ? columnHeader.type : "text",
          valueOptions: columnHeader.valueOptions
            ? columnHeader.valueOptions
            : null,
        };

        // if (columnHeader.type && columnHeader.type === "date") {
        //   let dateParams = {
        //     valueGetter: (value, row) =>
        //       row.coding_Received ? new Date(row.coding_Received) : null,
        //   };
        //   schema = { ...schema, ...dateParams };
        // }
        tempCol.push(schema);
      });
    setColumnHeaders(tempCol);
  };
  const reports = () => {
    const initialValue = 0;

    let filteredData = [];
    if (pagedData) {
      pagedData.map((v) => {
        let index = data.find((x) => x.id === v);


        filteredData.push(index);
      });
    } else {
      filteredData.push(data);
    }
    let totalGisLength = 0
    let submittedInMoata = 0
    let withCoder = 0
    if(filteredData)
    {

       totalGisLength = filteredData.reduce(
        (a, v) => a + v.giS_Length,
        initialValue
      );
       submittedInMoata = data
        .filter((x) => x.status === "To Upload")
        .reduce((a, v) => a + v.giS_Length, initialValue);
       withCoder = data
        .filter((x) => x.coder != null)
        .reduce((a, v) => a + v.giS_Length, initialValue);
    }
       
    return (
      <>
        <div>
          <h5>
            <span className="badge bg-secondary m-1">
              GIS Meters:{" "}
              {Math.round((totalGisLength + Number.EPSILON) * 100) / 100}
            </span>
          </h5>
          </div>
          <div>
          <h5>
            <span className="badge bg-secondary m-1">
              Submitted in Moata : {submittedInMoata}
            </span>
          </h5>
          </div>
          <div>
          <h5>
            <span className="badge bg-secondary m-1">
              With Coder : {withCoder}
            </span>
          </h5>
        </div>
      </>
    );
  };

  const updateSetStatus = () => {
    let workpackagesToUpdate = [];

    rowIds.forEach((y) => {
      let copyWorkpackages = [...data];
      let foundWorkpackages = copyWorkpackages.findIndex((x) => x.id === y);

      workpackagesToUpdate.push({
        ...copyWorkpackages[foundWorkpackages],
        completion_Status : completeionStatusValue,
        completion_Characterization : completeionCharacterizationValue,
        characterization : characterizationValue
      });
    });

 
    dispatch(ApiService.putWorkpackagesBatch(workpackagesToUpdate));
    handleClose();
    // setData(storeData)
  };
  return (
    <div className="container-fluid p-4">
   <Spinner loadSpinner={toggleSpinner} />
       <Errors message={errorMessage} show={error} />
    
      <Success
        message={"Workpackage Updates"}
        show={putWorkPackageSuccess}
        UpdateSuccessFlag={() => dispatch(updatePutSuccessFlag())}
      />

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Attributes of Selected WP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <InputGroup className="mb-3" onChange={(event) => setCoder(event.target.value)}> */}
        <Form.Label>Completion Status</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={(event) => {
             completeionStatusValue = event.target.value;
          
            }}
          >
            <option></option>
            {completeionStatus[0].valueOptions.map((values) => (
              
              <option key={values}>{values}</option>
            ))}
          </Form.Select>
       
          <Form.Label>Completion Characterization</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={(event) => {
              completeionCharacterizationValue = event.target.value;
           
             }}
          >
            <option></option>
            
            {completeionCharacterization[0].valueOptions.map((value) => (
              
              <option key={value}>{value}</option>
            ))}
          </Form.Select>
          <Form.Label>Characterization</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={(event) => {
              characterizationValue = event.target.value;
           
             }}
          >
            <option></option>
            {characterization[0].valueOptions.map((value) => (
              
              <option key={value}>{value}</option>
            ))}
          </Form.Select>

        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => updateSetStatus()}
          >
         Update
          </Button>
        </Modal.Footer>
      </Modal>


      <Spinner loadSpinner={toggleSpinner} />
      <Errors
        showHeading={false}
        show={showError}
        message={showErrorMessage}
      />
      <div style={{ zIndex: 998, width: "1200px" }}>
        <div
          className="mb-4 d-flex"
          style={{
            position: "relative",
            // left: "100px",
            backgroundColor: "white",
            color: "black",
            // width: "500px",
            minHeightheight: "160px",
            alignContent: "center",
            padding:'20px 20px 0px 20px',
            borderRadius: "20px",
            boxShadow: "10px 10px 15px grey",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="From Date"
              onChange={(value) =>
                setFromDate(moment(value).format("YYYY-MM-DDTHH:mm:ss.ssss"))
              }
              maxDate={moment()}
              className="p-1"
              format="DD/MM/YYYY"
            />
            <DatePicker
              label="To Date"
              onChange={(value) =>
                setToDate(moment(value).format("YYYY-MM-DDTHH:mm:ss.ssss"))
              }
              maxDate={moment()}
              className="p-1"
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
          <Button
            disabled={fromDate && toDate ? false : true}
            data-tooltip-id="my-tooltip"
            variant="success"
            className="m-2"
            data-tooltip-content="Refresh Data"
            onClick={() => {
              loadAllWorkPackages();
            }}
            style={{ height: "50px" }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
          <Tooltip id="my-tooltip" style={{ zIndex: 999 }} />

          <Card className="reportCards">
            <CardHeader>Quick Summary</CardHeader>
            <CardBody className="reportCardBody">{reports()}</CardBody>
          </Card>
        </div>
      </div>
      <div style={{ position: "sticky", top: "600px" }}>
        <div>
        <Button
            data-tooltip-id="my-tooltip"
            variant="success"
            className="m-2"
            data-tooltip-content="Received from Coder"
            onClick={() => setShow(true)}
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              // onClick={() => updateReceivedFromCoder("Received from Coder")}
            />
          </Button>
        </div>
        {data.length > 0 ? (
          <Table
            tableData={data}
            HandleRowUpdate={(value) => updateRowInStore(value)}
            HandleStatusChange={(data) => setRowIds(data)}
            colHeaders={columnHeaders}
            // editTable={false}
            HandlePageFilters={(data) => {
              setPagedData(data);
            }}
          />
        ) : (
          <>
            <h3>No Data</h3>
            <Box>
              <Skeleton width={"100vh"} height={"100px"} />
              <Skeleton width={"100vh"} height={"100px"} />
              <Skeleton width={"100vh"} height={"100px"} />
              <Skeleton width={"100vh"} height={"100px"} />
              <Skeleton width={"100vh"} height={"100px"} />
              <Skeleton width={"100vh"} height={"100px"} />
              <Skeleton width={"100vh"} height={"100px"} />
            </Box>
          </>
        )}
      </div>
    </div>
  );
}
