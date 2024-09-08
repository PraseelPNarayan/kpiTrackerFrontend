import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addInitialWorkPackage,uploadDailyReport } from '../../js/reducer/kpiTrackerSlice'
import { Card,Button,Container,Row, Col } from 'react-bootstrap'
import SpreadSheetImporter from '../common/spreadSheetImporter'
import ApiService from '../../js/api/apiService'
import {  createHeadersOn, createWorkPage } from '../../js/reducer/actionType'

export default function ImportData() {
const [openImporter, setOpenImporter] = useState(false)
const [fieldsType, setFieldsType] = useState()
const [actionType, setActionType] = useState()
const dispatch = useDispatch()


const SetImportedData =(data)=>{

if(actionType === createWorkPage )
  {
    dispatch(addInitialWorkPackage(data))
  }
  
  if(actionType === createHeadersOn)
  {
    dispatch(uploadDailyReport(data))
  }
}

const SetImportType =(type)=>{
if(type === createWorkPage )
{
  setFieldsType(ApiService.workPackageFields)
}

if(type == createHeadersOn)
{
  setFieldsType(ApiService.headersOnFields)
}
setOpenImporter(true)
}
   
  return (
    <>
<Container className='w-100 h-100'>
    <Row className='justify-content-center align-items-center h-100'>

 <Col md='4'>
 <Card style={{ width: '18rem', height:'13rem' }} >
      <Card.Body>
        <Card.Title>Import Workpackage</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">1st Milestone</Card.Subtitle>
        <Card.Text>
        Import workpackages from Auckland Council
        </Card.Text>
        <Button variant="success" onClick={()=> {SetImportType(createWorkPage); setActionType(createWorkPage)}} >Import</Button>
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
        <Button variant="success" onClick={()=> {SetImportType(createHeadersOn); setActionType(createHeadersOn)}}>Import</Button>
      </Card.Body>
    </Card>  
       </Col>
       <Col md='4'>
         <Card style={{ width: '18rem', height:'13rem'  }} >
      <Card.Body>
        <Card.Title>Import QA'd</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">3rd Milestone</Card.Subtitle>
        <Card.Text>
       Import from WinCan Project
        </Card.Text>
        <Button variant="success" onClick={()=> {SetImportType(createHeadersOn); setActionType(createHeadersOn)}}>Import</Button>
      </Card.Body>
    </Card>  
       </Col>
      
     </Row>
       </Container>

    { fieldsType &&  <SpreadSheetImporter fields={fieldsType} isImportOpen={openImporter} SetData={(data)=>{SetImportedData(data)}} CloseImporter={()=>{setOpenImporter(false)}}/>}
       </>
  )
}
