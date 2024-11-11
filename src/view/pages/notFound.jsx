import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

export default function NotFound() {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center' style={{height:'70vh'}}>
    <div>
    <h3>Oops that page is not found</h3>

    </div>

    <div>
    <Link to="/home/importData" > <Button  color="primary" variant="contained">Go to Home</Button> </Link>

    </div>
    
    
    </div>
  )
}
