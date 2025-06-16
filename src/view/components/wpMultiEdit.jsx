import React from "react";
import {
  Skeleton,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import ApiService from "../../js/api/apiService";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

export default function WpMultiEdit({ show, data, handleClose, rowIds }) {
  const dispatch = useDispatch();
  let completeionStatusValue = null;
  let completeionCharacterizationValue = null;
  let characterizationValue = null;
  let address = null;
  let rego = null;
  let claimed = null;
  let batchDate = null;
  let receivedDate = null;

  const updateSetStatus = () => {
    let workpackagesToUpdate = [];

    rowIds.forEach((y) => {
      let copyWorkpackages = [...data];
      let foundWorkpackages = copyWorkpackages.findIndex((x) => x.id === y);

      workpackagesToUpdate.push({
        ...copyWorkpackages[foundWorkpackages],
        completion_Status: completeionStatusValue,
        completion_Characterization: completeionCharacterizationValue,
        characterization: characterizationValue,
        address: address,
        rego: rego,
        claimed,
        received_Date: receivedDate ? moment(receivedDate).format("YYYY-MM-DDTHH:mm:ss") : y.received_Date ? y.received_Date : null  ,
        batch_Date:batchDate ? moment(batchDate).format("YYYY-MM-DDTHH:mm:ss") : y.batch_Date ? y.batch_Date : null,
      });
    });

    dispatch(ApiService.putWorkpackagesBatch(workpackagesToUpdate));
    handleClose();
    // setData(storeData)
  };
  return (
    <div>
      {" "}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Attributes of Selected WP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <InputGroup className="mb-3" onChange={(event) => setCoder(event.target.value)}> */}
          <FormControl fullWidth>
            <InputLabel id="completion-status-label">
              Completion Status
            </InputLabel>
            <Select
              labelId="completion-status-label"
              id="completion-status"
              // value={}
              label="Completion Status"
              onChange={(event) => {
                completeionStatusValue = event.target.value;
              }}
            >
              <MenuItem defaultValue={"N/A"} value="N/A">N/A</MenuItem>
              <MenuItem value="Completed Asset">Completed Asset</MenuItem>
              <MenuItem value="Remaining Possible Inspectable Assets">
                Remaining Possible Inspectable Assets
              </MenuItem>
              <MenuItem value="Asset Unable to Complete">
                Asset Unable to Complete
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ marginTop: "20px" }}>
            <InputLabel id="completion-characterization-label">
              Completion Characterization
            </InputLabel>
            <Select
              labelId="completion-characterization-label"
              id="completion-characterization"
              // value={}
              label="Completion Characterization"
              onChange={(event) => {
                completeionCharacterizationValue = event.target.value;
              }}
            >
              <MenuItem value="N/A">N/A</MenuItem>
              <MenuItem value="HC">HC</MenuItem>
              <MenuItem value="TM">TM</MenuItem>
              <MenuItem value="3RD">3RD</MenuItem>
              <MenuItem value="P">P</MenuItem>
              <MenuItem value="NS">NS</MenuItem>
              <MenuItem value="LD">LD</MenuItem>
              <MenuItem value="RF">RF</MenuItem>
              <MenuItem value="HWP">HWP</MenuItem>
              <MenuItem value="HWO">HWO</MenuItem>
              <MenuItem value="AI">AI</MenuItem>
              <MenuItem value="AB">AB</MenuItem>
              <MenuItem value="KR">KR</MenuItem>
              <MenuItem value="LDNE">LDNE</MenuItem>
              <MenuItem value="TD">TD</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ marginTop: "20px" }}>
            <InputLabel id="characteriaztion-label">
              Characterization
            </InputLabel>
            <Select
              labelId="characteriaztion-label"
              id="characteriaztion"
              // value={}
              label="Characterization"
              onChange={(event) => {
                characterizationValue = event.target.value;
              }}
            >
              <MenuItem value="N/A">N/A</MenuItem>
              <MenuItem value="RC">RC</MenuItem>
              <MenuItem value="DB">DB</MenuItem>
              <MenuItem value="L1">L1</MenuItem>
              <MenuItem value="L2">L2</MenuItem>
              <MenuItem value="L3">L3</MenuItem>
              <MenuItem value="CSE">CSE</MenuItem>
              <MenuItem value="RA">RA</MenuItem>
              <MenuItem value="L">L</MenuItem>
              <MenuItem value="S">S</MenuItem>
              <MenuItem value="3RD-CSE">3RD-CSE</MenuItem>
              <MenuItem value="HC-RC">HC-RC</MenuItem>
              <MenuItem value="HC-DB">HC-DB</MenuItem>
              <MenuItem value="P-L">P-L</MenuItem>
              <MenuItem value="P-S">P-S</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              style={{ marginTop: "20px" }}
              onChange={(event) => (address = event.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Rego"
              variant="outlined"
              style={{ marginTop: "20px" }}
              onChange={(event) => (rego = event.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Claimed"
              variant="outlined"
              style={{ marginTop: "20px" }}
              onChange={(event) => (claimed = event.target.value)}
            />
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterMoment}>
            <FormControl fullWidth style={{ marginTop: "20px" }}>
              <DatePicker
                label="Received Date"
                onChange={(value) =>
                  (receivedDate = moment(value).format("YYYY-MM-DDTHH:mm:ss"))
                }
                maxDate={moment()}
                style={{ marginTop: "20px" }}
                format="DD/MM/YYYY"
              />
            </FormControl>
            <FormControl fullWidth style={{ marginTop: "20px" }}>
              <DatePicker
                label="Batch Date"
                onChange={(value) =>
                  (batchDate = moment(value).format("YYYY-MM-DDTHH:mm:ss"))
                }
                //  maxDate={defaultToDate}
                style={{ marginTop: "20px" }}
                format="DD/MM/YYYY"
              />
            </FormControl>
          </LocalizationProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => updateSetStatus()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
