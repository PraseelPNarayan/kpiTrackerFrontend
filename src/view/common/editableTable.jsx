import React, { useState, useMemo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";



export default function EditableTable({data}) {
  // console.log(data.data.length)
  const [columnHeaders, setColumnHeaders] = useState([]);
  const [editCell, setEditCell] = useState(false);
  // const [hideCell, setHideCell] = useState(false)
  const [editCellRow, setEditCellRow] = useState();
  const [editCellIndex, setEditCellIndex] = useState();
  const [cellValue, setCellValue] = useState();
  

  useEffect(() => {
    loadTableHeaders();
  }, [data]);

  const loadTableHeaders = () => {
    let tempCol = [...columnHeaders];
    if(data && data.length > 0)
    Object.keys(data[0]).map((columnHeader) => {
  console.log('column header ', columnHeader)
      if (!columnHeaders.includes(columnHeader)) {
        tempCol.push(columnHeader);
      }
    });
    setColumnHeaders(tempCol);
  };

  return (
    <div className="container" >
      <Table bordered  >
        <thead>
          <tr>
            {columnHeaders.map((header, index) => (
              <th key={index}  style={{backgroundColor:'#a5c28d'}}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columnHeaders.map((col, colIndex) => (
                <React.Fragment>
                  {editCell &&
                    editCellRow === rowIndex &&
                    editCellIndex === col && (
                      <td key={colIndex} style={{position:'relative'}}>
                        <input
                          value={cellValue}
                          type="text"
                          style={{ backgroundColor: "#f2eeed" , border:'0px', borderRadius:'5px', padding:'10px'}}
                          onChange={(event) => {
                            setCellValue(event.target.value);
                            row[col] = cellValue;
                          }}
                        />
                        <FontAwesomeIcon
                          icon={faCheckCircle} //size="2xs"
                          style={{ marginLeft: "10px", width: "inherit" }}
                          color="green"
                          onClick={() => {
                            setEditCell(!editCell);
                            setEditCellIndex(col);
                            setEditCellRow(rowIndex);
                          }}
                        />
                      </td>
                    )}
                  {editCell &&
                  editCellRow === rowIndex &&
                  editCellIndex === col ? null : (
                    <td key={colIndex} >
                      {row[col]}
                      <FontAwesomeIcon
                        icon={faPen}
                        size="2xs"
                        style={{
                          marginLeft: "10px",
                          padding: "3px",
                          backgroundColor: "#F1EBE9",
                          borderRadius: "50%",
                        }}
                        onClick={() => {
                          setEditCellRow(rowIndex);
                          setEditCell(!editCell);
                          setEditCellIndex(col);
                          setCellValue(row[col]);
                        }}
                      />
                    </td>
                  )}

                </React.Fragment>
              ))}
            </tr>
          )) : null}
        </tbody>
      </Table>
    </div>
  );
}
