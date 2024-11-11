import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import validator from "validator";
import {
  addInitialWorkPackage,
  updateSuccessFlag,
} from "../../js/reducer/kpiTrackerSlice";
import { Card, Button, Container, Row, Col, ToastBody } from "react-bootstrap";
import SpreadSheetImporter from "../common/spreadSheetImporter";
import ApiService from "../../js/api/apiService";
import ActionType from "../../js/actions/actionType";
import moment from "moment";

import { Spinner } from "../common/spinner";
import Errors from "../common/errors";
import Success from "../common/success";

export default function ImportData() {
  const dispatch = useDispatch();

  const [openImporter, setOpenImporter] = useState(false);
  const [fieldsType, setFieldsType] = useState();
  const [actionType, setActionType] = useState();
  const [loadingData, setLoadingData] = useState(false);

  const toggleSpinner = useSelector((state) => state.kpiTracker.toggleSpinner);
  const error = useSelector((state) => state.kpiTracker.error);
  const errorMessage = useSelector((state) => state.kpiTracker.errorMessage);
  const success = useSelector((state) => state.kpiTracker.success);

  const SetImportedData = (data) => {
    if (actionType === ActionType.createWorkPage) {

      let formattedData = [...data];
      formattedData.forEach((m) => {
        m.Abandoned_M =m.Abandoned_M ?validator.trim(m.Abandoned_M)   : 0.00
        m.Surveyed_M = validator.trim(m.Surveyed_M? m.Surveyed_M : "0")
        m.GIS_Length = validator.trim(m.GIS_Length? m.GIS_Length : "0")
      });

      dispatch(ApiService.postCreateWorkpackages(formattedData));
    }

    if (actionType === ActionType.createHeadersOn) {
      let formattedData = [...data];
      formattedData.forEach((m) => {
        let dateOfInsp = m.Date_of_Inspection + "00:00:00";
        m.Date_of_Inspection = moment(dateOfInsp, "DD/MM/YYYY").format(
          "YYYY-MM-DD"
        );
        m.Abandoned_M =m.Abandoned_M ?validator.trim(m.Abandoned_M)   : 0.00
        m.Surveyed_M = validator.trim(m.Surveyed_M? m.Surveyed_M : "0")
        m.GIS_Length = validator.trim(m.GIS_Length? m.GIS_Length : "0")
      });
      dispatch(ApiService.postCreateHeadersOn(formattedData));
    }

    if (actionType === ActionType.updateBatchHeadersOn) {
      let formattedData = [...data];
      formattedData.forEach((m) => {
        let dateOfInsp = m.Date_of_Inspection + "00:00:00";
        m.Date_of_Inspection = moment(dateOfInsp, "DD/MM/YYYY").format("YYYY-MM-DD");
        m.Time_of_Inspection =m.Time_of_Inspection  ? moment(m.Time_of_Inspection,'HH:MM:SS').format('hh:mma') : '00:00am'
        m.Abandoned_M =m.Abandoned_M ? validator.trim(m.Abandoned_M)   : 0.00
        m.Surveyed_M = validator.trim(m.Surveyed_M? m.Surveyed_M : "0")
        m.GIS_Length = validator.trim(m.GIS_Length? m.GIS_Length : "0")
      });
     dispatch(ApiService.putHeadersOnBatch(data));
    }
  };

  const SetImportType = (type) => {
    if (type === ActionType.createWorkPage) {
      setFieldsType(ApiService.initialWorkPackageFields);
    }

    if (type == ActionType.createHeadersOn) {
      setFieldsType(ApiService.dailyReportFields);
    }
    if (type == ActionType.updateBatchHeadersOn) {
      setFieldsType(ApiService.dailyReportFields);
    }
    setOpenImporter(true);
  };

  return (
    <div className="d-flex flex-column justify-contents-center alignt-items-center pt-5 ml-4">
      <Errors message={errorMessage} show={error} />
      <Spinner loadSpinner={toggleSpinner} />
      <Success
        message={"Data load completed"}
        show={success}
        UpdateSuccessFlag={() => dispatch(updateSuccessFlag())}
      />

      <Container className="w-100 h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col md="6">
            <Card style={{ width: "18rem", height: "13rem" }}>
              <Card.Body>
                <Card.Title>Import Workpackage</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  1st Milestone
                </Card.Subtitle>
                <Card.Text>Import workpackages from Auckland Council</Card.Text>
                <Button
                  variant="success"
                  onClick={() => {
                    SetImportType(ActionType.createWorkPage);
                    setActionType(ActionType.createWorkPage);
                  }}
                >
                  Import
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md="6">
            <Card style={{ width: "18rem", height: "13rem" }}>
              <Card.Body>
                <Card.Title>Import Daily Report</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  2nd Milestone
                </Card.Subtitle>
                <Card.Text>Import Daily Report from site</Card.Text>
                <Button
                  variant="success"
                  onClick={() => {
                    SetImportType(ActionType.createHeadersOn);
                    setActionType(ActionType.createHeadersOn);
                  }}
                >
                  Import
                </Button>
              </Card.Body>
            </Card>
          </Col>
         
        </Row>
        <Row>
        <Col md="12" className="pt-4">
            <Card style={{ width: "18rem", height: "20rem" }}>
              <Card.Body>
                <Card.Title>Update HeaderOn</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Recurring Milestone's
                </Card.Subtitle>
                {/* <Card.Text>Import: </Card.Text>
                <Card.Text> To Send to Coder </Card.Text>
                <Card.Text> Allocated to Coder </Card.Text>
                <Card.Text> With a Coder </Card.Text>
                <Card.Text> To Upload </Card.Text> */}
                <p>Update Wincam report</p>
                <p>Sent to Coder</p>
                <p>Received from Coder</p>
                <p>Ready to upload</p>

                <Button
                  variant="success"
                  onClick={() => {
                    SetImportType(ActionType.updateBatchHeadersOn);
                    setActionType(ActionType.updateBatchHeadersOn);
                  }}
                >
                  Import
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {fieldsType && (
        <SpreadSheetImporter
          fields={fieldsType}
          isImportOpen={openImporter}
          SetData={(data) => {
            SetImportedData(data);
          }}
          CloseImporter={() => {
            setOpenImporter(false);
          }}
        />
      )}
    </div>
  );
}
