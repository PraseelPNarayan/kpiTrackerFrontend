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
  faFilter,
  faMagnifyingGlass,
  faPenToSquare,
  faFileExport
} from "@fortawesome/free-solid-svg-icons";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
  Skeleton,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Modal from "react-bootstrap/Modal";
import { makeStyles } from "@mui/styles";

import Table from "../common/table";
import ApiService from "../../js/api/apiService";
import moment from "moment";
import exportCSV from "../common/exportCsv";

import Success from "../common/success";
import Errors from "../common/errors";
import { Spinner } from "../common/spinner";
import {
  workPackage,
  updatePutSuccessFlag,
  updateFilterData,
  setFilteredWP,
  setFilterOperatorText,
  setFilterWpText,
  setFilterInspDate,
  deleteDate,
} from "../../js/reducer/kpiTrackerSlice";
import Cards from "../components/cards";
import clsx from "clsx";
import WpAdvancedSearch from "../common/wpAdvancedSearch";
import WpMultiEdit from "../components/wpMultiEdit";
const useStyles = makeStyles({
  red: {
    color: "red",
  },
  black: {
    color: "black",
  },
});

export default function WorkPackage() {
  const classes = useStyles();
  const data = useSelector((state) => state.kpiTracker.filteredWorkpackage);
  const status = useSelector((state) => state.kpiTracker.status);
  const toggleSpinner = useSelector((state) => state.kpiTracker.toggleSpinner);
  const error = useSelector((state) => state.kpiTracker.error);
  const errorMessage = useSelector((state) => state.kpiTracker.errorMessage);
  const defaultFromDate = useSelector((state) => state.kpiTracker.fromDate);
  const defaultToDate = useSelector((state) => state.kpiTracker.toDate);

  const [columnHeaders, setColumnHeaders] = useState([]);
  const [apiStatusChanged, setApiStatusChanged] = useState(status);
  // const [data, setData] = useState(storeData);
  const [fromDate, setFromDate] = useState(
    defaultFromDate.format("YYYY-MM-DDTHH:mm:ss.ssss")
  );
  const [toDate, setToDate] = useState(
    defaultToDate.format("YYYY-MM-DDTHH:mm:ss.ssss")
  );
  const [showError, setShowError] = useState(error);
  const [showErrorMessage, setShowErrorMessage] = useState(errorMessage);
  const [pagedData, setPagedData] = useState();
  const [rowIds, setRowIds] = useState([]);
  const [show, setShow] = useState(false);
  const [selectOffice, setSelectedOffice] = useState();
  const [advancedFilterShow, setadvancedFilterShow] = useState(false);
  // const [filterWp, setFilterWP] = useState("");
  // const [filterOperator, setFilterOperator] = useState("");
  // const [filterInspDate, setFilterInspDate] = useState();

  const dispatch = useDispatch();

  const putWorkPackageSuccess = useSelector(
    (state) => state.kpiTracker.success
  );
  const handleClose = () => setShow(false);

  useEffect(() => {
    loadTableHeaders();
  }, [data]);

  const updateRowInStore = (data) => {
    let payload = [];
    payload.push(data);
    // console.log(payload)
    dispatch(ApiService.putWorkpackagesBatch(payload));
  };

  const loadAllWorkPackages = () => {
    if (fromDate > toDate) {
      setShowErrorMessage("From date cannot be past to date");
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
      ApiService.workPackageFields.map((columnHeader, i) => {
        let schema = {
          field: columnHeader.key,
          headerName: columnHeader.label,
          editable: columnHeader.editable ?? true,
          // headerClassName: "super-app-theme--header",
          type: columnHeader.type ? columnHeader.type : "text",
          valueOptions: columnHeader.valueOptions
            ? columnHeader.valueOptions
            : null,
          flex: 1,
          minWidth: columnHeader.minWidth ? columnHeader.minWidth : 100,
        };
        if (columnHeader.type && columnHeader.type === "date") {
          let dateParams = {
            valueGetter: (value, row) => (row[i] ? new Date(row[i]) : null),
          };
          schema = { ...schema, ...dateParams };
        }
        if (columnHeader.type && columnHeader.type === "dateTime") {
          let dateParams = {
            valueGetter: (value, row) =>
              // console.log(value, row)
              value ? new Date(value) : null,
            //  console.log('found ',row.date_of_Inspection)
            // row[i] ? moment(row.date_of_Inspection).format('yyyy-mm-dd hh:mm') : null,
          };
          schema = { ...schema, ...dateParams };
        }
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
  let totalGisLength = 0;
  let submittedInMoata = 0;
  let withCoder = 0;

  if (data) {
    totalGisLength = data.reduce((a, v) => a + v.giS_Length, initialValue);
    submittedInMoata = data
      .filter((x) => x.status === "To Upload")
      .reduce((a, v) => a + v.giS_Length, initialValue);
    withCoder = data
      .filter((x) => x.coder != null)
      .reduce((a, v) => a + v.giS_Length, initialValue);
  }



  const customFilter = ({ filterName, value }) => {
    setTimeout(() => {
      dispatch(setFilteredWP({ filterName, filterValue: value }));
    }, 1000);
  };

  return (
    <div className="container-fluid p-4">
      <Spinner loadSpinner={toggleSpinner} />
      <Errors message={errorMessage} show={error} />

      <Success
        message={"Workpackage Updated"}
        show={putWorkPackageSuccess}
        UpdateSuccessFlag={() => dispatch(updatePutSuccessFlag())}
      />

      <WpAdvancedSearch
        show={advancedFilterShow}
        HandleOnHide={() => setadvancedFilterShow(false)}
      />

    <WpMultiEdit show={show} handleClose={handleClose} data={data} rowIds={rowIds}/>

      <Spinner loadSpinner={toggleSpinner} />
      <Errors showHeading={false} show={showError} message={showErrorMessage} />
      <div className="d-flex flex-row mb-2">
        <div style={{ zIndex: 998, width: "600px", marginRight: "30px" }}>
          <div
            className="row"
            style={{
              position: "relative",
              // left: "100px",
              backgroundColor: "white",
              color: "black",
              // width: "500px",
              minHeightheight: "160px",
              alignContent: "center",
              padding: "20px 0px 20px auto",
            }}
          >
            <div>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="From Date"
                  onChange={(value) =>
                    setFromDate(
                      moment(value).format("YYYY-MM-DDTHH:mm:ss.ssss")
                    )
                  }
                  maxDate={moment()}
                  className="p-1"
                  format="DD/MM/YYYY"
                  defaultValue={defaultFromDate}
                />
                <DatePicker
                  label="To Date"
                  onChange={(value) =>
                    setToDate(
                      moment(value)
                        .add(24, "hours")
                        .format("YYYY-MM-DDTHH:mm:ss.ssss")
                    )
                  }
                  //  maxDate={defaultToDate}
                  className="p-1"
                  format="DD/MM/YYYY"
                  defaultValue={defaultToDate}
                />
              </LocalizationProvider>
              <Button
                // disabled={fromDate && toDate ? false : true}
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
            </div>

            {
              <div className="mb-2">
                <TextField
                  id="WP"
                  name="WP"
                  label="WP#"
                  className="m-1"
                  style={{ width: "100px" }}
                  onChange={(e) => {
                  
                    customFilter({ filterName: "wp", value: e.target.value });
                  }}
                />
                <TextField
                  id="Operator"
                  name="Operator"
                  label="Operator#"
                  className="m-1"
                  style={{ width: "200px" }}
                  onChange={(e) => {
                    customFilter({
                      filterName: "operator",
                      value: e.target.value,
                    });
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Inspection Date"
                    onAccept={(value) => {
                      customFilter({
                        filterName: "inspDate",
                        value: moment(value).format("YYYY-MM-DDTHH:mm:ss"),
                      });
                    }}
                    onChange={(val) => {
                   
                      if (val === "" || val == null) {
                        customFilter({ filterName: "inspDate", value: null });
                      }
                    }}
                    maxDate={moment()}
                    className="p-1"
                    format="DD/MM/YYYY"
                  />
                </LocalizationProvider>
              </div>
            }
          </div>
        </div>
        <div className="d-flex flex-row mb-4">
          <Cards
            title="GIS Meters"
            subtitle={Math.round((totalGisLength + Number.EPSILON) * 100) / 100}
          />
          <Cards title="In Moata" subtitle={submittedInMoata} />
          <Cards title="With Coder" subtitle={withCoder} />
          {/* <Card className="reportCards">
            <CardHeader>Quick Summary</CardHeader>
            <CardBody className="reportCardBody">{reports()}</CardBody>
          </Card> */}
        </div>
      </div>
      <div style={{ position: "sticky", top: "600px" }}>
        <div>
          {data && rowIds?.length > 0 && (
            <Button
              data-tooltip-id="my-tooltip"
              variant="success"
              className="m-2"
              data-tooltip-content="Bulk Edit"
              onClick={() => setShow(true)}
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                // onClick={() => updateReceivedFromCoder("Received from Coder")}
              />
            </Button>
          )}
         {data &&  <Button
                    data-tooltip-id="my-tooltip"
                    variant="success"
                    className="m-2"
                    onClick={() => exportCSV(data)}
                    data-tooltip-content="Export All Data"
            
                  >
                    <FontAwesomeIcon icon={faFileExport} />
                  </Button>}
        </div>
        {data && data.length > 0 ? (
          <Table
            tableData={data}
            HandleRowUpdate={(value) => updateRowInStore(value)}
            HandleStatusChange={(data) => setRowIds(data)}
            colHeaders={columnHeaders}
            // filters={filterPayload}
            // editTable={false}
            HandlePageFilters={(data) => {
              setPagedData(data);
            }}
            rowCss={(params) => {
              return params.row.duplicateAndLatest === false
                ? classes.red
                : classes.black;
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
            </Box>
          </>
        )}
      </div>
    </div>
  );
}
