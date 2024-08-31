import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePen,
  faLock,
  faLockOpen,
  faPerson,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { faPersonCircleCheck } from "@fortawesome/free-solid-svg-icons/faPersonCircleCheck";
import { faHotTubPerson } from "@fortawesome/free-solid-svg-icons/faHotTubPerson";
import { faPersonBooth } from "@fortawesome/free-solid-svg-icons/faPersonBooth";
export default function NavBar() {
  return (
    <React.Fragment>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        className="position-fixed"
        style={{ height: "100vh", width: "80px" }}
        id="navBar"
      >
        <Nav className="d-flex flex-column h-100">
          <Link to={"/importData"} className="primary p-4">
            <div className="d-flex justify-content-start">
              <FontAwesomeIcon icon={faUpload} size="2x" />
              <div className="navText">Upload Files</div>
            </div>
          </Link>

          <Link to={"/headersOn"} className="primary  p-4">
            <div className="d-flex justify-content-start">
              <FontAwesomeIcon icon={faLockOpen} size="2x" />
              <div className="navText">Headers On</div>
            </div>
          </Link>
          <Link to={"/workPackage"} className="primary  p-4">
            <div className="d-flex justify-content-start">
              <FontAwesomeIcon icon={faLock} size="2x" />
              <div className="navText ">Workpackage</div>
            </div>
          </Link>

        <div className="primary" style={{position:'absolute', bottom:'20%', alignItems:"center", width:'80px'}}>
  <div className="d-flex justify-content-center">

    <FontAwesomeIcon icon={faPerson} size="3x" className="circle-icon-background " />
  </div>
 
  </div>
        </Nav>
      </Navbar>
    </React.Fragment>
  );
}
