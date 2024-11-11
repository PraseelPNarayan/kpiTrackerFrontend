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
import CodersForm from "./forms/codersForm";
import {
  updateSuccessFlag,
  updateStaff,
} from "../../js/reducer/kpiTrackerSlice";
import ActionType from "../../js/actions/actionType";

import { Spinner } from "../common/spinner";
import Errors from "../common/errors";
import Success from "../common/success";
import UsersForm from "./forms/usersForm";

export default function Staff() {
    const dispatch = useDispatch();

    const users = useSelector((state) => state.kpiTracker.users);
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
                     <Link to={"/home/settings/addEditUser"}
                data-tooltip-id="coders-tooltip"
                variant="success"
                // className="m-2"
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
                  {users &&
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isActive.toString()}</td>
                        <td>
                          <Link to={`/home/settings/addEditUser`} onClick={() => { 
                                setShowModal(!showModal);
                              dispatch(updateStaff(user))}}>
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
       
        <Route path={'settings/addUser'} component={<UsersForm />} />
        {/* <Route path={'settings/add/:id'} component={<CodersForm coder={coderToUpdate}/>} /> */}
    </Routes>
      </div>
    );
  }
  