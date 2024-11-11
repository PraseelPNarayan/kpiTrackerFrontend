import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { updateMissingWP } from "../../js/reducer/kpiTrackerSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Success({ message, show, UpdateSuccessFlag }) {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(show);
  const missingWP = useSelector(
    (state) => state.kpiTracker.missingWorkPackages
  );
  useEffect(() => {
    setShowModal(show);
  }, [show, missingWP]);

  const renderMissingWp = () =>
    missingWP.map((x) => <li>Missing in Workpackages {x.asset_ID}</li>);
  return (
    <div>
      {" "}
      <Modal
        backdrop="static"
        keyboard={false}
        show={showModal}
        onHide={() => {
          setShowModal(false);
          UpdateSuccessFlag();
          dispatch(updateMissingWP());
        }}
        data-bs-backdrop="static"
      >
        <Modal.Header closeButton style={{ background: "green" }}>
          <Modal.Title className="text-white">Success</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-block">
          <p>{message}</p>
          {missingWP && renderMissingWp()}

          {}
        </Modal.Body>
        {/* <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={() => updateSetStatus('With Coder')}>
        Confirm Send
      </Button>
    </Modal.Footer> */}
      </Modal>
    </div>
  );
}
