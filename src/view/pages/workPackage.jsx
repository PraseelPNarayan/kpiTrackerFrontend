import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Card,Button,Container,Row, Col } from 'react-bootstrap'

import Table from '../common/table'
import { updateWorkPackageRow } from '../../js/reducer/kpiTrackerSlice'
import ApiService from '../../js/api/apiService'
import WithCoders from '../components/withCoders'

export default function WorkPackage() {
  const data = useSelector((state)=> state.kpiTracker.workPackage)
  const [columnHeaders, setColumnHeaders] = useState([]);

  const dispatch = useDispatch()

  useEffect(()=>{
    loadTableHeaders()
  },[data])

  const updateRowInStore=(data)=>{
    console.log('dispatch function')
    dispatch(updateWorkPackageRow(data))
console.log(data)
  }

  const loadTableHeaders = () => {
   
    let tempCol = [];
    if (data && data.length > 0)
     ApiService.workPackageFields.map((columnHeader) => {

        if (!columnHeaders.includes(columnHeader)) {
  
          let schema = {
            'field': columnHeader.key,
            'headerName': columnHeader.key,
            editable:columnHeader.key ==='id' ? false : true,
            headerClassName: 'super-app-theme--header',
          }
          tempCol.push(schema);
       
        }
      });
    setColumnHeaders(tempCol);

   
  };

  return (
    <div className='container-fluid'>

   
    <div className='pb-2'>
   <WithCoders data={data}/>
      </div> 
      <div className=''>

{data.length > 0 ? <Table  data={data} HandleRowUpdate={(data) => updateRowInStore(data)} HandleStatusChange={()=>{}} colHeaders={columnHeaders} />: <h3>No Data</h3>}

</div>
    </div>
  )
}
