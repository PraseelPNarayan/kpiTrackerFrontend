import React from 'react'
import { ReactSpreadsheetImport } from "react-spreadsheet-import";


export default function SpreadSheetImporter({fields,isImportOpen,SetData,CloseImporter}) {

  return (
    <React.Fragment>
    <ReactSpreadsheetImport isOpen={isImportOpen} onClose={() => CloseImporter(true)} onSubmit={(data) => {

      let addedData =[]
      data.validData.forEach((element,index) => {
      let test = {"status": "","id": 0,...element}

      addedData.push(test)
    
      });
    
      SetData(addedData); 
      
      }} fields={fields} />
    </React.Fragment>
  )
}
