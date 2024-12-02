import React from 'react'
import {
    Card,
     CardHeader,
    CardBody,
    CardTitle,
  } from "react-bootstrap";

  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnchorLock, faAtom, faChartLine } from '@fortawesome/free-solid-svg-icons';

export default function Cards({title,subtitle}) {
    console.log(title,subtitle)
  return (
 <React.Fragment>
    <div className='customCard m-2'>
            <div className='text-center cardVector'>
                <FontAwesomeIcon icon={faChartLine} size='2x' color='white' />
            </div>
      <div className='d-flex flex-column'>

            <label className='cardTitle'>{title}</label>
            <label className='cardSubTitle text-center'>{subtitle}</label>
      </div>
            
    </div>
            
 </React.Fragment>
  )
}
