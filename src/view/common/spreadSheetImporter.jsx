import moment from "moment";
import React from "react";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";


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
              ? moment(newData.Date_of_Inspection, "DD/MM/YYYY").format(
                  "DD/MM/YYYY"
                )
              : moment("01/01/1900").format("DD/MM/YYYY");

            newData.Diameter =
              parseFloat(element.Diameter)  ? element.Diameter : 0.0;
            newData.GIS_Length =
              parseFloat(element.GIS_Length)  ? element.GIS_Length : 0.0;
            newData.Surveyed_M =
              parseFloat(element.Surveyed_M)  ? element.Surveyed_M : 0.0;
            newData.General_Comment = String(element.General_Comment);

            addedData.push(newData);
          });

          SetData(addedData);
        }}
        fields={fields}
      />
    </React.Fragment>
  );
}
