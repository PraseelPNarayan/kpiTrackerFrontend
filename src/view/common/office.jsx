import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faUserPen } from "@fortawesome/free-solid-svg-icons";

import { Tooltip } from "react-tooltip";
import { Link, Routes, Route } from "react-router-dom";

import {
  officeToUpdate,
  updateSuccessFlag,
} from "../../js/reducer/kpiTrackerSlice";

import ApiService from "../../js/api/apiService";

import { Spinner } from "../common/spinner";
import Errors from "../common/errors";
import Success from "../common/success";

import OfficeForm from "./forms/officeForm";

export default function Office() {
  const dispatch = useDispatch();

  const offices = useSelector((state) => state.kpiTracker.officeList);
  // const coderToUpdate = useSelector((state) => state.kpiTracker.coderToUpdate);

  const [showModal, setShowModal] = useState(false);

  const toggleSpinner = useSelector((state) => state.kpiTracker.toggleSpinner);
  const error = useSelector((state) => state.kpiTracker.error);
  const errorMessage = useSelector((state) => state.kpiTracker.errorMessage);
  const success = useSelector((state) => state.kpiTracker.success);

  return (
    <div className="container w-100">
      <Errors message={errorMessage} show={error} />
      <Spinner loadSpinner={toggleSpinner} />
      <Success
        message={"Data load completed"}
        show={success}
        UpdateSuccessFlag={() => dispatch(updateSuccessFlag())}
      />

      <div>
        <Link
          to={"/home/settings/addEditOffice"}
          data-tooltip-id="coders-tooltip"
          variant="success"
          // className="m-2"
          onClick={() => {
            setShowModal(!showModal);
            // setDispatchType("NewUser");
          }}
          data-tooltip-content="Add an Office"
        >
          <FontAwesomeIcon icon={faPlusCircle} size={"2xl"} color="green" />
        </Link>
        <Tooltip id="coders-tooltip" style={{ zIndex: 999 }} />

        <Table striped bordered hover size="2x" className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {offices &&
              offices.map((office) => (
                <tr key={office.id}>
                  <td>{office.id}</td>
                  <td>{office.name}</td>
                  <td>
                    <Link
                      to={`/home/settings/addEditOffice`}
                      onClick={() => {
                        setShowModal(!showModal);
                        dispatch(officeToUpdate(office));
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faUserPen}
                        size={100}
                        color="green"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <Routes>
        <Route path={"settings/addOffice"} component={<OfficeForm />} />
        {/* <Route path={'settings/add/:id'} component={<CodersForm coder={coderToUpdate}/>} /> */}
      </Routes>
    </div>
  );
}
