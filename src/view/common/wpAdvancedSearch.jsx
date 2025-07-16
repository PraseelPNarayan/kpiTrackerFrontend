import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { workPackage, updateMissingWP } from "../../js/reducer/kpiTrackerSlice";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";

export default function WpAdvancedSearch({ show,HandleOnHide }) {
  const data = useSelector(workPackage);

const [showModal, setShowModal] = useState(show);
 
  useEffect(() => {
    setShowModal(show);
  }, [show]);

  return (
    <div>
      <Modal
        backdrop="static"
        keyboard={false}
        show={showModal}
        onHide={() => {
          setShowModal(false);
          HandleOnHide()
        }}
        data-bs-backdrop="static"
      >
        <Modal.Header closeButton style={{ background: "green" }}>
          <Modal.Title className="text-white">Advanced Filters</Modal.Title>
        </Modal.Header>
           <TextField
                    fullWidth
                    id="WP"
                    name="WP"
                    label="WP#"
                   
                    onChange={(value)=>{
                        
                        data.filter(wp => wp.wp === value.target.value)
                    }}
                   
                    style={{ padding: "20px 10px 10px 10px" }}
                  />
        <Modal.Body className="d-block"></Modal.Body>
      </Modal>
    </div>
  );
}
