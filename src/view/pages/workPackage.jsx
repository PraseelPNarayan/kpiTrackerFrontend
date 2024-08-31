import React,{useEffect} from 'react'
import EditableTable from '../common/editableTable'
import { useSelector,useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'

export default function WorkPackage() {
  const stateData = useSelector((state)=> state)
const dispatch= useDispatch()

  return (
    <div>

<EditableTable  data={stateData.kpiTracker.workPackage}/>


    </div>
  )
}
