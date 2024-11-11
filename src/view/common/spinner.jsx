import React, { useState, CSSProperties } from "react";
import {ScaleLoader} from "react-spinners";
import Modal from 'react-bootstrap/Modal';

const override = {
  display: "block",
  margin: "10px auto",
  borderColor: "#7bc143",
  color:"#7bc143"
};

export function Spinner({loadSpinner}) {


  return (
<React.Fragment>

<Modal backdrop='none' title='' show={loadSpinner} style={{backgroundColor:'rgba(0,0,0,0)'}}>
  
        <ScaleLoader
        color={"#7bc143"}
        cssOverride={override}
        loading={loadSpinner}
        size={150}
        aria-label="Loading Spinner"
        data-testid="RiseLoader"
       
      />

      <label style={override}>Please wait</label>
</Modal>
</React.Fragment>
   
  )
}