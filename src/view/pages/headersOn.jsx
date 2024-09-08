import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Button,Form, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport, faGlassMartini, faPaperPlane, faUser, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip'
import Modal from 'react-bootstrap/Modal';

import EditableTable from '../common/editableTable'
import Table from '../common/table';
import { updateHeadersOnStatus,updateHeadersOnRow } from '../../js/reducer/kpiTrackerSlice';
import ApiService from '../../js/api/apiService'

export default function HeadersOn() {
  const data = useSelector((state)=> state.kpiTracker.headersOn)
  const [show, setShow] = useState(false);
  const[coder, setCoder] = useState()
  const [dateSent, setDateSent] = useState()
  const [rowIds, setRowIds] = useState()
  const [columnHeaders, setColumnHeaders] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

useEffect(()=>{
  loadTableHeaders()
},[data])

const dispatch = useDispatch()


  const updateRowInStore=(data)=>{
 
    dispatch(updateHeadersOnRow(data))
  }

  const updateSetStatus =(status)=>{

    let dataToUpdate ={
      ids: rowIds,
      status:status,
      coder,
      dateSent
    }
dispatch(updateHeadersOnStatus(dataToUpdate))

handleClose()
  }

  const loadTableHeaders = () => {
   
    let tempCol = [];
    if (data && data.length > 0)
     ApiService.headersOnFields.map((columnHeader) => {

        if (!columnHeaders.includes(columnHeader)) {
  
          let schema = {
            'field': columnHeader.key,
            'headerName': columnHeader.key,
            editable:columnHeader.key ==='id' ? false : true
          }
          tempCol.push(schema);
       
        }
      });
    setColumnHeaders(tempCol);

   
  };


  
  // useEffect(() => {
  //   loadTableHeaders();
  // }, [data]);


  // const loadTableHeaders = () => {
  //   let tempCol = [...columnHeaders];
  //   if (data && data.length > 0)
  //     Object.keys(data[0]).map((columnHeader) => {
  //       if (!columnHeaders.includes(columnHeader)) {

  //         let schema = {
  //           'field': columnHeader,
  //           'headerName': columnHeader,
  //           // 'width':150
  //         }
  //         tempCol.push(schema);
       
  //       }
  //     });
  //   setColumnHeaders(tempCol);
  // };


    return (
    <>
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send to Coder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup className="mb-3" onChange={(event) => setCoder(event.target.value)}>
        <Form.Control
          placeholder="Coders Name"
          aria-label="Coders Name"
          aria-describedby="basic-addon2"
        />
      </InputGroup>
     
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Date Sent</Form.Label>
        <Form.Control type="date" placeholder="Date Sent" onChange={(event) => setDateSent(event.target.value)} />
      </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => updateSetStatus('With Coder')}>
            Confirm Send
          </Button>
        </Modal.Footer>
      </Modal>
    <div className='container-fluid'>
   
    <div className='pb-2'>
      <Button data-tooltip-id="my-tooltip" variant='success' className='m-2' onClick={()=> handleShow()} data-tooltip-content="Send to Coder"><FontAwesomeIcon icon={faUser}/></Button>
  
      <Button data-tooltip-id="my-tooltip" variant='success' className='m-2' data-tooltip-content="Received from Coder"><FontAwesomeIcon icon={faUserPen} onClick={()=>updateSetStatus('Received from Coder')}/></Button>

      <Button  data-tooltip-id="my-tooltip" variant='success' className='m-2' data-tooltip-content="Read for Uplaod"><FontAwesomeIcon icon={faFileImport} onClick={()=>updateSetStatus('To Upload')}/></Button>
    <Tooltip id='my-tooltip' style={{zIndex:999}}/>
   
  
      </div> 
      <div className='w-100'>
{data.length > 0 ? <Table colHeaders={columnHeaders}   data={data}  HandleRowUpdate={(data) => updateRowInStore(data)} HandleStatusChange={(data) => setRowIds(data)} /> : <h3>No data</h3>}

      </div>
      </div>
      </>
  )
}
