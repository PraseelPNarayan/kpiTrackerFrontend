import React, { useState, useMemo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import { useDispatch } from "react-redux";
import { updateWorkPackageRow } from "../../js/reducer/kpiTrackerSlice";
import { Form } from "react-bootstrap";

export default function EditableTable({ data }) {
  const [columnHeaders, setColumnHeaders] = useState([]);
  const [editCell, setEditCell] = useState(false);
  const [editCellRow, setEditCellRow] = useState();
  const [editCellIndex, setEditCellIndex] = useState();
  const [cellValue, setCellValue] = useState();
const [selectedRow, setsetselectedRow] = useState([])

  const dispatch = useDispatch();

  useEffect(() => {
    loadTableHeaders();
  }, [data]);

  const loadTableHeaders = () => {
    let tempCol = [...columnHeaders];
    if (data && data.length > 0)
      Object.keys(data[0]).map((columnHeader) => {
        if (!columnHeaders.includes(columnHeader)) {
          tempCol.push(columnHeader);
        }
      });
    setColumnHeaders(tempCol);
  };

  const updateCellValue = async (data, rowIndex, col) => {
    let toChange = {
      col,
      rowIndex,
      changeValue: cellValue,
      data,
    };
   
    dispatch(updateWorkPackageRow(toChange));

  };

  const determineInputType=(cellValue,event)=>{

    if(cellValue.length < 20)
    {
       return (  <input
                              
      value={cellValue}
      type='text'
      style={{
        backgroundColor: "#f2eeed",
        border: "0px",
        borderRadius: "5px",
        padding: "10px",
      }}
      onChange={(event) => {
        setCellValue(event.target.value);
      
      }}
    />)
    }
    else {
     return(<textarea defaultValue={cellValue} rows="5" cols="33" onChange={(event) => {
      setCellValue(event.target.value);
   
    }}>

</textarea>) 

    }
   
  }

  const highlightSelectedRow=(rowIndex)=>{
let copySelectedRow = [...selectedRow]
copySelectedRow.push(rowIndex)
setsetselectedRow(copySelectedRow)
  }

  return (
    <div className="">
      <Table hover>
        <thead>
          <tr>
            {data.length > 0 && <th></th>}
            {data.length > 0 && <th>#</th> }
            {columnHeaders.map((header, index) => (
              <th
                key={index}
                style={{ backgroundColor: "#a5c28d", height:'60px', textAlign:'center',alignContent:'center' }}
              >
                <div className="d-flex flex-column">

                {header}
                <FontAwesomeIcon icon={faMagnifyingGlass} className="pt-2" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0
            ? data.map((row, rowIndex) => (
                <tr key={rowIndex} style={{backgroundColor:selectedRow.includes(rowIndex) ? 'red':'white'}} >
                  <td><input type='checkbox' key={rowIndex} onClick={(()=> highlightSelectedRow(rowIndex))}/></td>
                  <td key={rowIndex}>{rowIndex}</td>
                  {columnHeaders.map((col, colIndex) => (
                    <React.Fragment>
                      {editCell &&
                        editCellRow === rowIndex &&
                        editCellIndex === col && (
                          <>
                            <td key={rowIndex} style={{ position: "relative" }}>
                              {determineInputType(cellValue)}
                              <FontAwesomeIcon
                                icon={faCheckCircle} //size="2xs"
                                style={{ marginLeft: "10px", width: "inherit" }}
                                color="green"
                                onClick={() => {
                                  updateCellValue(cellValue, rowIndex, col);
                                  setEditCell(!editCell);
                                  setEditCellIndex(col);
                                  setEditCellRow(rowIndex);
                                }}
                              />
                            </td>
                          </>
                        )}
                      {editCell &&
                      editCellRow === rowIndex &&
                      editCellIndex === col ? null : (
                        <>
                          <td key={colIndex} className="inline-block" style={{width:'inherit'}}>
                      
                            <div className="d-flex flex-row">
                              <div style={{paddingRight:'5px'}}>
                                <FontAwesomeIcon
                                  icon={faPen}
                                  size="2xs"
                                  style={{
                                    // marginLeft: "10px",
                                    paddingRight: "3px",
                                    backgroundColor: "#F1EBE9",
                                    borderRadius: "50%",
                                    position: "relative",
                                  }}
                                  onClick={() => {
                                    setEditCellRow(rowIndex);
                                    setEditCell(!editCell);
                                    setEditCellIndex(col);
                                    setCellValue(row[col]);
                                  }}
                                />
                              </div>
                              <div>
                              

                                {row[col]}
                               
                                </div>
                            </div>
                          
                          </td>
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </div>
  );
}
