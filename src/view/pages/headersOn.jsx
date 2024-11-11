import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImport,
  faGlassMartini,
  faPaperPlane,
  faRedoAlt,
  faUser,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import Modal from "react-bootstrap/Modal";

import EditableTable from "../common/editableTable";
import Table from "../common/table";

import {
  updatePutSuccessFlag,
  selectApiStatus,
} from "../../js/reducer/kpiTrackerSlice";
import ApiService from "../../js/api/apiService";
import Success from "../common/success";
import Errors from "../common/errors";
import moment from "moment";

export default function HeadersOn() {
  const data = useSelector((state) => state.kpiTracker.headersOn);
  const status = useSelector((state) => state.kpiTracker.status);
  const coders = useSelector((state) => state.kpiTracker.coders);

  // const [storeData,setData] = useState(data)
  const [apiStatus, setApiStatus] = useState(status)

  const dispatch = useDispatch();

  const putHeadersOnSuccess = useSelector(
    (state) => state.kpiTracker.putSuccess
  );
  const error = useSelector((state) => state.kpiTracker.error);
  const errorMessage = useSelector((state) => state.kpiTracker.errorMessage);

  const [show, setShow] = useState(false);
  const [coder, setCoder] = useState();
  const [dateSent, setDateSent] = useState();
  const [rowIds, setRowIds] = useState([]);
  const [columnHeaders, setColumnHeaders] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
 
    loadTableHeaders();
// setData(data)
    // getAllHeadersOnData();
    
  }, [data]);

  // const getAllHeadersOnData = () => {
  //   dispatch(ApiService.getAllHeadersOn());
  //   setData(storeData)
  // };

  const updateRow = (data) => {
    dispatch(ApiService.putHeadersOn(data));
  };

  const updateSetStatus = (status) => {
    let headersOnToUpdate = [];

    rowIds.forEach((y) => {
      let copyHeaders = [...data];
      let foundHeader = copyHeaders.findIndex((x) => x.id === y);

      headersOnToUpdate.push({
        ...copyHeaders[foundHeader],
        coder: coder,
        send_for_coding: "Yes",
        status: status,
        date_Sent_for_coding: moment().format("YYYY-MM-DDTHH:mm:ss.ssss"),
      });
    });

 
    dispatch(ApiService.putHeadersOnBatchEntries(headersOnToUpdate));
    handleClose();
    // setData(storeData)
  };

  const updateReceivedFromCoder = (status) => {
    let headersOnToUpdate = [];

    rowIds.forEach((y) => {
      let copyHeaders = [...data];
      let foundHeader = copyHeaders.findIndex((x) => x.id === y);

      headersOnToUpdate.push({
        ...copyHeaders[foundHeader],
        status: status,
        date_received_from_coder: moment().format("YYYY-MM-DDTHH:mm:ss.ssss"),
      });
    });

  
    dispatch(ApiService.putHeadersOnBatchEntries(headersOnToUpdate));
    handleClose();
    // setData(storeData)
  };

  const updateReadyToUpload = (status) => {
    let headersOnToUpdate = [];

    rowIds.forEach((y) => {
      let copyHeaders = [...data];
      let foundHeader = copyHeaders.findIndex((x) => x.id === y);

      headersOnToUpdate.push({ ...copyHeaders[foundHeader], status: status });
    });

  
    dispatch(ApiService.putHeadersOnBatchEntries(headersOnToUpdate));
    handleClose();
    // setData(storeData)
  };

  const loadTableHeaders = () => {
    let tempCol = [];
    let schema = {};
    if (data && data.length > 0)
      ApiService.headersOnFields.map((columnHeader,i) => {
        if (!columnHeaders.includes(columnHeader)) {
          schema = {
            field: columnHeader.key,
            headerName: columnHeader.label,
            editable: columnHeader.key === "id" || 
                      columnHeader.key ==="status" ||
                      columnHeader.key === "asset_ID"
                      ? false : true,
            type: columnHeader.type ? columnHeader.type : "text",
            valueOptions: columnHeader.valueOptions
              ? columnHeader.valueOptions
              : null,
              // headerClassName: 'super-app-theme--header',
              headerAlign: 'center',
          };
        
        }
        if (columnHeader.type && columnHeader.type === "date") {
          let dateParams = {
            valueGetter: (value, row) =>
              row[i] ? new Date(row[i]) : null,
          };
          schema = { ...schema, ...dateParams };
        }
        tempCol.push(schema);
      });
    setColumnHeaders(tempCol);

  };

  return (
    <>
       <Errors message={errorMessage} show={error} />
    
      <Success
        message={"Workpackage Updates"}
        show={putHeadersOnSuccess}
        UpdateSuccessFlag={() => dispatch(updatePutSuccessFlag())}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send to Coder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <InputGroup className="mb-3" onChange={(event) => setCoder(event.target.value)}> */}
          <Form.Select
            aria-label="Default select example"
            onChange={(event) => {
              setCoder(event.target.value);
          
            }}
          >
            <option>--Select--</option>
            {coders.filter(x => x.status===true).map((coder) => (
              
              <option key={coder.id}>{coder.name}</option>
            ))}
          </Form.Select>
          {/* <Form.Control
          placeholder="Coders Name"
          aria-label="Coders Name"
          aria-describedby="basic-addon2"
        />
      </InputGroup> */}

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Date Sent</Form.Label>
            <Form.Control
              type="text"
              placeholder="Date Sent"
              disabled
              value={moment().format("DD/MM/YYYY")}

              // onChange={(event) => { setDateSent(event.target.value)}}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => updateSetStatus("With Coder")}
          >
            Confirm Send
          </Button>
        </Modal.Footer>
      </Modal>
  
        <div className="pb-2" >
          <Button
            data-tooltip-id="my-tooltip"
            variant="success"
            className="m-2"
            onClick={() => {
              dispatch(ApiService.getAllCoders());
              handleShow();
            }}
            data-tooltip-content="Send to Coder"
          >
            <FontAwesomeIcon icon={faUser} />
          </Button>

          <Button
            data-tooltip-id="my-tooltip"
            variant="success"
            className="m-2"
            data-tooltip-content="Received from Coder"
          >
            <FontAwesomeIcon
              icon={faUserPen}
              onClick={() => updateReceivedFromCoder("Received from Coder")}
            />
          </Button>

          <Button
            data-tooltip-id="my-tooltip"
            variant="success"
            className="m-2"
            data-tooltip-content="To Upload"
          >
            <FontAwesomeIcon
              icon={faFileImport}
              onClick={() => updateReadyToUpload("To Upload")}
            />
          </Button>
          <Button
            data-tooltip-id="my-tooltip"
            variant="danger"
            className="m-2"
            data-tooltip-content="Refresh Data"
          >
            <FontAwesomeIcon
              icon={faRedoAlt}
              onClick={() => dispatch(ApiService.getAllHeadersOn())}
            />
          </Button>
          <Tooltip id="my-tooltip" style={{ zIndex: 999 }} />
        </div>
        <div className="w-100">
          {data && data.length > 0 ? (
            <Table
              colHeaders={columnHeaders}
              tableData={data}
              HandleRowUpdate={(data) => updateRow(data)}
              HandleStatusChange={(data) => setRowIds(data)}
              editTable
              HandlePageFilters={() => {}}
            />
          ) : (
            <h3>No data</h3>
          )}
        </div>

    </>
  );
}
