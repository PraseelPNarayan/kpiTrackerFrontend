import React from 'react'
import { ReactSpreadsheetImport, StepType } from "react-spreadsheet-import";


export default function SpreadSheetImporter({fields,isImportOpen,SetData,CloseImporter}) {

  return (
    <React.Fragment>
    <ReactSpreadsheetImport isOpen={isImportOpen} onClose={() => CloseImporter(true)} onSubmit={(data) => {SetData(data.validData); }} fields={fields} />
    </React.Fragment>
  )
}
