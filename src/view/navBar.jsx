import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  Link,
  NavLink,
  Outlet,
  redirect,
  redirectDocument,
  useNavigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePen,
  faGear,
  faLock,
  faLockOpen,
  faPerson,
  faUpload,
  faGears,
  faPowerOff,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Apiservice from "../js/api/apiService";
import { loginStaff, updateStaff } from "../js/reducer/kpiTrackerSlice";
import { Select } from "@mui/material";
import { isPending } from "@reduxjs/toolkit";
import AuthProvider, { useAuth } from "../js/auth/authProvider";
import Roles from "../js/auth/roles";

export default function NavBar() {
  const user = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log( Roles.ImportDataRole.includes(user.userParsed.role))

  const determineClass = ({ isActive, isPending }) => {
    return isActive ? "activeLink p-3" : "primary p-3 expand";
  };

  return (
    <React.Fragment>
      <div className="d-flex justify-content-start">
        <div>
          <Navbar
            bg="dark"
            data-bs-theme="dark"
            className="position-fixed"
            style={{ zIndex: 999, padding: 0, height: "100vh" }}
            id="navBar"
          >
            <Nav className="d-flex flex-column h-100 w-100">
              <NavLink to={"/home/importData"} className={determineClass}
                hidden= {Roles.ImportDataRole.includes(user.userParsed.role)  ? false : true}
              >
                <div>
                  <FontAwesomeIcon icon={faUpload} size="1x" />
                </div>
                <div>
                  <label className="navText">Upload</label>
                </div>
              </NavLink>

              <NavLink
                to={"/home/headersOn"}
                className={determineClass}
                onClick={() => {
                  dispatch(Apiservice.getAllHeadersOn());
                }}
                hidden= {Roles.HeadersOnRole.includes(user.userParsed.role)  ? false : true}
              >
                <div className="">
                  <FontAwesomeIcon icon={faLockOpen} size="1x" />
                </div>
                <div>
                  <label className="navText">Headers</label>
                </div>
              </NavLink>
              <NavLink to={"/home/workPackage"} className={determineClass}   hidden= {Roles.WorkPackageRole.includes(user.userParsed.role)  ? false : true}>
                <div className="">
                  <FontAwesomeIcon icon={faLock} size="1x" />
                </div>
                <div>
                  <label className="navText">Workpackage</label>
                </div>
              </NavLink>
              <NavLink
             hidden= {Roles.SettingsRole.includes(user.userParsed.role)  ? false : true}
                to={"/home/settings"}
                className={determineClass}
                onClick={() => {
                  dispatch(Apiservice.getAllCoders());
                  dispatch(Apiservice.getAllUsers());
                }}
                
              >
                <div className="">
                  <FontAwesomeIcon icon={faGears} size="1x" />
                </div>
                <div>
                  <label className="navText">Settings</label>
                </div>
              </NavLink>

              <div
                className="primary"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <div className="applyHoverEffectOnAccount">
                  <FontAwesomeIcon icon={faPerson} size="2x" className="p-3" />
                  <label
                    className="navText"
                    style={{ paddingLeft: "15px", textWrap: "wrap" }}
                  >
                    {user.userParsed.userName}
                  </label>
                  <div className="accountSettingsOptions">
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        dispatch(loginStaff({}));
                        localStorage.clear();
                        navigate("/login", true);
                      }}
                    >
                      <FontAwesomeIcon icon={faPowerOff} title="Logout" />

                      <label className="p-2">Logout</label>
                    </div>
                    <div className="linkHover">
                      <FontAwesomeIcon icon={faKey} title="Logout" />
                      <Link style={{paddingLeft: "10px"}}
                        to={`/home/settings/addEditUser`}
                        onClick={() => {
                          dispatch(
                            updateStaff({
                              email: user.userParsed.email,
                              userName: user.userParsed.userName,
                              isActive: true,
                              role: user.userParsed.role,
                              id: user.userParsed.id,
                            })
                          );
                        }}
                      >
                        <label>Change Details</label>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Nav>
          </Navbar>
        </div>
        <div style={{ marginLeft: "100px" }}>
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}
