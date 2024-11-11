import React from 'react'
import { Card,Button,Container,Row, Col } from 'react-bootstrap'

export default function WithCoders({data}) {

let assignedWP = data.filter(i => i.Coder !=null)

const wpLenth =(coder)=>{
    let wpCount = assignedWP.filter( b => b.Coder === coder)
    return wpCount.length
}

  return (
    <div className='row'>{assignedWP.map((coder) => (

    <Card style={{ width: '18rem', height:'13rem', marginRight:'1em' }} >
         <Card.Body>
           <Card.Title>With Coder</Card.Title>
           <Card.Subtitle className="mb-2 text-muted">{coder.Coder}</Card.Subtitle>
           <Card.Text>
           Assets Assigned : {wpLenth(coder.Coder)}
           </Card.Text>
         </Card.Body>
       </Card>
   

    )) }</div>
  )
}
