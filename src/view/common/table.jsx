import React, { useState,useEffect } from "react";
import { DataGrid,  gridPageSelector,
  gridPageCountSelector,
  gridExpandedSortedRowIdsSelector,
  useGridApiContext,
  useGridSelector,} from "@mui/x-data-grid";
import Pagination from '@mui/material/Pagination';
import { Box } from "@mui/material";

export default function Table({ tableData,HandleRowUpdate,HandlePageFilters,HandleStatusChange,colHeaders, editTable = true }) {
 

const [data, setTableData] = useState(tableData)
const [paginationModel, setpaginationModel] = useState({pageSize: 15, page:0})

useEffect(()=>{
  setTableData(tableData)
},[tableData])

const Toolbar =()=> {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  
  const pagedData = gridExpandedSortedRowIdsSelector(apiRef)

HandlePageFilters(pagedData)
  return (
    <Pagination
      sx={(theme) => ({ padding: theme.spacing(1.5, 0) })}
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}


  return (
    <div style={{ width: "100%" }}>
      {/* <Box  sx={{
        // height: 300,
        width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: '#f5f3ed',
          borderRight:'2px solid grey',
          // color:'white'
        },
      }}> */}
<Box
 sx={{
  height: '600px',
  width: '100%',
}}

>


      <DataGrid
      hideFooter
      paginationModel={paginationModel}
      onPaginationModelChange={setpaginationModel}
slots={
  {
    toolbar: Toolbar
  }
}
      disableRowSelectionOnClick
      editMode= {editTable ? "row" : false}
    //  editMode="row"
    getRowId={ data.id}
      // onCellEditStop={(data) => console.log(data)}
      processRowUpdate={(updatedRow,originalRow)=> {HandleRowUpdate(updatedRow);  return updatedRow}}
      onProcessRowUpdateError={()=> console.log('error')}
        checkboxSelection
        onRowSelectionModelChange={(data) => {let currentSelection = []; currentSelection.push(data); HandleStatusChange(data)}}
        rows={data}
        columns={colHeaders}
        initialState={{pagination:{paginationModel:{pageSize:15}}}}
        pageSizeOptions={[10,15,20]}
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
      </Box>
      {/* </Box> */}
    </div>
  );
}
