import moment from "moment";
import React from "react";
import { ReactSpreadsheetImport,StepType } from "react-spreadsheet-import";

// import XLSX from "xlsx";

export default function SpreadSheetImporter({
  fields,
  isImportOpen,
  SetData,
  CloseImporter,
}) {
  return (
    <React.Fragment>
      <ReactSpreadsheetImport
        isOpen={isImportOpen}
        onClose={() => CloseImporter(true)}
        onSubmit={(data) => {
          let addedData = [];
          data.validData.forEach((element, index) => {
            let newData = { status: "", id: 0, ...element };
newData.Date_of_Inspection = newData.Date_of_Inspection
              ? moment(newData.Date_of_Inspection, "DD/MM/YYYY").format("DD/MM/YYYY")
              : moment('01/01/1900').format("DD/MM/YYYY");

            newData.Diameter = parseFloat(newData.Diameter)
              ? parseFloat(newData.Diameter)
              : 0.0;
            newData.GIS_Length = parseFloat(newData.GIS_Length)
              ? parseFloat(newData.GIS_Length)
              : 0.0;
            newData.Surveyed_M = parseFloat(newData.Surveyed_M)
              ? parseFloat(newData.Surveyed_M)
              : 0.0;

            addedData.push(newData);
          });
// addedData = addedData.map((item) => {
//   console.log("item", !item.Date_of_Inspection  || item.Date_of_Inspection === 'Invalid date' ? moment('01/01/1900').format("DD/MM/YYYY") : item.Date_of_Inspection,);
//             return {
//               ...item,
//               Date_of_Inspection: !item.Date_of_Inspection  || item.Date_of_Inspection === 'Invalid date' ? moment('01/01/1900').format("DD/MM/YYYY") : item.Date_of_Inspection,
             
//             };
//           });
          SetData(addedData);
        }}
        fields={fields}

      />
    </React.Fragment>
  );
}
