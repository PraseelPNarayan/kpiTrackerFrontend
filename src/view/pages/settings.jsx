import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointer,
  faPlusCircle,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import { Tooltip } from "react-tooltip";
import { Link,Routes,Route } from "react-router-dom";

import Apiservice from "../../js/api/apiService";
import CodersForm from "../common/forms/codersForm";
import {
  updateSuccessFlag,
  updateCoder,
} from "../../js/reducer/kpiTrackerSlice";
import ActionType from "../../js/actions/actionType";

import { Spinner } from "../common/spinner";
import Errors from "../common/errors";
import Success from "../common/success";
import Staff from "../common/staff";

export default function Settings({match}) {
  const dispatch = useDispatch();

  const coders = useSelector((state) => state.kpiTracker.coders);
  // const coderToUpdate = useSelector((state) => state.kpiTracker.coderToUpdate);

  const [showModal, setShowModal] = useState(false);
  
  const toggleSpinner = useSelector((state) => state.kpiTracker.toggleSpinner);
  const error = useSelector((state) => state.kpiTracker.error);
  const errorMessage = useSelector((state) => state.kpiTracker.errorMessage);
  const success = useSelector((state) => state.kpiTracker.success);

  return (
    <div >
      <Errors message={errorMessage} show={error} />
      <Spinner loadSpinner={toggleSpinner} />
      <Success
        message={"Data load completed"}
        show={success}
        UpdateSuccessFlag={() => dispatch(updateSuccessFlag())}
      />
      <div style={{backgroundColor:"white"}}>
        <Tabs
          defaultActiveKey="coders"
          id="uncontrolled-tab-example"
          className="mb-3"
          transition
          style={{ backgroundColor:'#f5f3ed'}}
          // onSelect={() => dispatch(Apiservice.getAllCoders())}
        >
          <Tab
            eventKey="coders"
            title="Coders"
            // onSelect={() => dispatch(Apiservice.getAllCoders())}
          >
            <Link to={"/home/settings/addEditCoder"}
              data-tooltip-id="coders-tooltip"
              variant="success"
              style={{position:'relative', float:'right', margin:'10px'}}
              onClick={() => {
                setShowModal(!showModal);
                // setDispatchType("NewUser");
              }}
              data-tooltip-content="Add a Coder"
            >
              <FontAwesomeIcon icon={faPlusCircle} size={"2xl"} color="green" />
            </Link>
            <Tooltip id="coders-tooltip" style={{ zIndex: 999 }} />

            <Table striped bordered hover size="2x" className="mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Active</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {coders &&
                  coders.map((coder) => (
                    <tr key={coder.id}>
                      <td>{coder.id}</td>
                      <td>{coder.name}</td>
                      <td>{coder.email}</td>
                      <td>{coder.status.toString()}</td>
                      <td>
                        <Link to={`/home/settings/addEditCoder`} onClick={() => { dispatch(updateCoder(coder)); 
                              setShowModal(!showModal);
                              // setDispatchType("UpdateUser");
                              }}>
                          <FontAwesomeIcon
                            icon={faUserPen}
                            size={"2x"}
                            color="green"
                        
                          />
                          
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="staff" title="Staff">
            <Staff />
          </Tab>
        </Tabs>
      </div>
      <Routes>
     
      <Route path={'/home/settings/add'} component={<CodersForm />} />
      <Route path={'/home/settings/add/:id'} component={<CodersForm/>} />
  </Routes>
    </div>
  );
}
