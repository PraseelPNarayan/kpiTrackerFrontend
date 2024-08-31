import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addWorkPackage } from '../../js/reducer/kpiTrackerSlice'

import { Card,Button,Container,Row, Col } from 'react-bootstrap'
import SpreadSheetImporter from '../common/spreadSheetImporter'
import ApiService from '../../js/api/apiService'

export default function ImportData() {
const [openImporter, setOpenImporter] = useState(false)
const dispatch = useDispatch()


const SetImportedData =(data)=>{
dispatch(addWorkPackage(data))

}
   
  return (
    <>
<Container fluid className='w-100 h-100 bg-light'>
    <Row className='justify-content-center align-items-center h-100'>

 <Col md='4'>
 <Card style={{ width: '18rem', height:'13rem' }} >
      <Card.Body>
        <Card.Title>Import Workpackage</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">1st Milestone</Card.Subtitle>
        <Card.Text>
        Import workpackages from Auckland Council
        </Card.Text>
        <Button variant="success" onClick={()=> setOpenImporter(true)}>Import</Button>
      </Card.Body>
    </Card>
 </Col>
        
       <Col md='4'>
         <Card style={{ width: '18rem', height:'13rem'  }} >
      <Card.Body>
        <Card.Title>Import Daily Report</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">2nd Milestone</Card.Subtitle>
        <Card.Text>
        Import Daily Report from site
        </Card.Text>
        <Button variant="success">Import</Button>{' '}
      </Card.Body>
    </Card>  
       </Col>
      
     </Row>
       </Container>

       <SpreadSheetImporter fields={ApiService.initialWorkPackageFields} isImportOpen={openImporter} SetData={(data)=>{SetImportedData(data)}} CloseImporter={()=>{setOpenImporter(false)}}/>
       </>
  )
}
