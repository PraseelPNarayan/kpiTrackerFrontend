import React, { useState,useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function Table({ data,HandleRowUpdate,HandleStatusChange,colHeaders }) {

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
     editMode="row"
    getRowId={data.id}
      // onCellEditStop={(data) => console.log(data)}
      processRowUpdate={(updatedRow,originalRow)=> {HandleRowUpdate(updatedRow);  return updatedRow}}
      onProcessRowUpdateError={()=> console.log('error')}
        checkboxSelection
        onRowSelectionModelChange={(data) => {let currentSelection = []; currentSelection.push(data); HandleStatusChange(data)}}
        rows={data}
        columns={colHeaders}
        initialState={{pagination:{paginationModel:{pageSize:10}}}}
        pageSizeOptions={[10, 25,50]}
        sx={{
          bgcolor: "background.paper",
          boxShadow: 2,
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
      
      />
    </div>
  );
}
