import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  DataGrid,
  gridPageSelector,
  gridPageCountSelector,
  gridExpandedSortedRowIdsSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import { Box, Select, MenuItem, InputLabel } from "@mui/material";

export default function Table({
  tableData,
  HandleRowUpdate,
  HandlePageFilters,
  HandleStatusChange,
  colHeaders,
  editTable = true,
  rowCss,
}) {
  const [data, setTableData] = useState(tableData);
  const [removeFilters, setRemoveFilters] = useState(tableData);
  const [pageSizeValue, setPageSize] = useState(100);

  const filterRules = useSelector((state) => state.kpiTracker.filterData);
  // const data = useSelector((state) => state.kpiTracker.workPackage);

  const [paginationModel, setpaginationModel] = useState({
    pageSize: pageSizeValue,
    page: 0,
  });

  useEffect(() => {
     setTableData(tableData);
    // handleFilteredData();
  }, [tableData,pageSizeValue]);

  const Toolbar = () => {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    const pagedData = gridExpandedSortedRowIdsSelector(apiRef);

    HandlePageFilters(pagedData);
    return (
      <Pagination
        sx={(theme) => ({ padding: theme.spacing(1.5, 0) })}
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  };

  // const handleFilteredData = () => {
  //   if (tableData.length > 0) {
  //     if (Object.keys(filterRules).length > 0) {
  //       const filteredDataSet = [...tableData];
  //       if (filterRules.wp) {
  //         setTableData(
  //           filteredDataSet.filter(
  //             (w) => w.wp.toLowerCase() === filterRules.wp.toLowerCase()
  //           )
  //         );
  //       }
  //       if (filterRules.operator) {
  //         setTableData(
  //           filteredDataSet.filter(
  //             (w) =>
  //               w.operator !== null &&
  //               w.operator
  //                 .toLowerCase()
  //                 .match(filterRules.operator.toLowerCase())
  //           )
  //         );
  //       }
  //     }
  //   }
  // };
  return (
    <div style={{ width: "100%" }}>
      {/* <InputLabel id="pageSize" style={{ margin: "0px" }}>
          Page Size
        </InputLabel>
        <Select
          labelId="pageSize"
          id="pageSize"
          value={pageSizeValue}
          label="Page Size"
          onChange={(nextValue) => {
           
            setPageSize(nextValue.target.value);
          }}
          // onBlur={formik.handleBlur}
          style={{ margin: "10px", width: "100px" }}
        
        >
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={100}>100</MenuItem>
         
        </Select> */}
      <Box
        sx={(theme) => ({
          height: "auto",
          width: "100%",
          "& .MuiDataGrid-cell--editable": {
            bgcolor: "rgb(217 243 190)",
            ...theme.applyStyles("dark", {
              bgcolor: "#376331",
            }),
          },
          "& .duplicate.true": {
            backgroundColor: "#d47483",
            color: "#1a3e72",
            fontWeight: "600",
          },

          "& .duplicate.false": {
            backgroundColor: "white",
            color: "black",
            fontWeight: "600",
          },
        })}
      >
        <DataGrid
          hideFooter
          paginationModel={paginationModel}
          // initialState={{ pagination: { paginationModel} }}
          onPaginationModelChange={setpaginationModel}
          slots={{
            toolbar: Toolbar,
          }}
          disableRowSelectionOnClick
          editMode={editTable ? "row" : false}
          //  editMode="row"
          getRowId={data.id}
          // onCellEditStop={(data) => console.log(data)}
          processRowUpdate={(updatedRow, originalRow) => {
            HandleRowUpdate(updatedRow);
            return updatedRow;
          }}
          onProcessRowUpdateError={() => console.log("error")}
          checkboxSelection
          onRowSelectionModelChange={(data) => {
            let currentSelection = [];
            currentSelection.push(data);
            HandleStatusChange(data);
          }}
          rows={data}
          // isCellEditable={(params) => params.isEditable? true : false}
          columns={colHeaders}
          // pageSizeOptions={[30, 60, 100, { value: -1, label: 'All' }]}
          sx={{
            bgcolor: "background.paper",
            boxShadow: 2,
            border: 2,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
          getRowClassName={rowCss}
        />
      </Box>
      {/* </Box> */}
    </div>
  );
}
