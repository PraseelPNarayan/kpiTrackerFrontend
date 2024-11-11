import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import { updateErrorFlag } from '../../js/reducer/kpiTrackerSlice';

export default function Errors({message,show, showHeading = true}) {
const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(show)


   useEffect(()=>{
setShowModal(show)
   },[show])

  return (
    <div>
        <Modal show={showModal} onHide={()=>{setShowModal(false); dispatch(updateErrorFlag(false))}} >
        <Modal.Header closeButton style={{background:"red"}}>
          <Modal.Title className="text-white">An Error has Occured</Modal.Title>
        </Modal.Header>
        <Modal.Body>
   {showHeading &&   <p>Please send the below to the I.T team for troubleshooting</p>}
      <i>{message}</i>
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
  )
}
