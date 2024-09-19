import React, { useEffect, useRef, useState } from 'react';
import './Spreadsheet.css'; // Optional for custom styling
import { darkenColor } from '../../utils/DarkenColor';
import Compact from '@uiw/react-color-compact';

const Spreadsheet = () => {
  const tableRef = useRef(null);
  const contextMenuRef = useRef(null);
  const [title, setTitle] = useState('');

  const [header, setHeader] = useState([
    { cellID: '1', value: 'Name', bgColor: '#ffffff' },
    { cellID: '2', value: 'Age', bgColor: '#ffffff' },
    { cellID: '3', value: 'Job', bgColor: '#ffffff' }
  ]);

  const [data, setData] = useState([
    { order: 1, cells: [
      { cellID: '1', value: 'Alice', column: 1, bgColor: '#ffffff', rowspan: 2 },
      { cellID: '2', value: '30', column: 2, bgColor: '#ffffff', rowspan: 2 },
      { cellID: '3', value: 'Developer', column: 3, bgColor: '#ffffff', rowspan: 1 }
    ]},
    { order: 2, cells: [
      { cellID: '8', value: '', column: 1, bgColor: '#ffffff', rowspan: 2 },
      { cellID: '9', value: '', column: 2, bgColor: '#ffffff', rowspan: 2 },
      { cellID: '4', value: 'Designer',column: 3, bgColor: '#ffffff', rowspan: 1 }
    ]},
    { order: 3, cells: [
      { cellID: '5', value: 'Bob', column: 1, bgColor: '#ffffff', rowspan: 1 },
      { cellID: '6', value: '25', column: 2, bgColor: '#ffffff', rowspan: 1 },
      { cellID: '7', value: 'Designer', column: 3, bgColor: '#ffffff', rowspan: 1 }
    ]}
  ]);

  const [isSelecting, setIsSelecting] = useState(false); // Is the user selecting cells
  const [isSelected, setIsSelected] = useState(false); // Is the user selecting cells
  const [selectionStart, setSelectionStart] = useState(null); // The start cell (row, col) of the selection
  const [selectionEnd, setSelectionEnd] = useState(null); // The end cell (row, col) of the selection
  const [selectedColor, setSelectedColor] = useState('#ffffff'); // Default background color for cells
  const [position, setPosition] = useState(null);
  const [hex, setHex] = useState("#fff");

  const [contextMenu, setContextMenu] = useState(null);

  const handleEdit = (rowIndex, colIndex, e) => {
    // const updatedData = [...data];
    // updatedData[rowIndex][colIndex] = e.target.innerText;
    // setData(updatedData);
  };

  // Handle when the user starts selecting cells
  const handleMouseDown = (rowIndex, colIndex) => {
    setIsSelecting(true);
    setSelectionStart([rowIndex, colIndex]); // Set the starting point of the selection
    setSelectionEnd([rowIndex, colIndex]); // Temporarily set the end to be the same as start
  };

  // Handle when the user drags over more cells to select them
  const handleMouseOver = (rowIndex, colIndex) => {
    if (isSelecting) {
      setSelectionEnd([rowIndex, colIndex]); // Update the end of the selection range
    }
  };

  // Handle when the user finishes selecting cells
  const handleMouseUp = () => {
    setIsSelecting(false); // Stop selecting
  };

  const handleOutsideClick = (e) => {
    // Check if the click is outside of the dropdown
    if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
      setContextMenu(null); // Hide the dropdown
    }

    // if(tableRef.current && !tableRef.current.contains(e.target)){
    //   setSelectionStart(null);
    //   setSelectionEnd(null);
    // }
  };

  // Calculate if a cell is within the selection range
  const isCellSelected = (rowIndex, colIndex) => {
    if (!selectionStart || !selectionEnd) return false;

    const [startRow, startCol] = selectionStart;
    const [endRow, endCol] = selectionEnd;

    const rowMin = Math.min(startRow, endRow);
    const rowMax = Math.max(startRow, endRow);
    const colMin = Math.min(startCol, endCol);
    const colMax = Math.max(startCol, endCol);

    return rowIndex >= rowMin && rowIndex <= rowMax && colIndex >= colMin && colIndex <= colMax;
  };

  // Handle background color change for the selected cells
  const applyBackgroundColor = (color) => {
    if (!selectionStart || !selectionEnd) return;

    const updatedBackgroundColors = [...data];
    const [startRow, startCol] = selectionStart;
    const [endRow, endCol] = selectionEnd;

    for (let row = Math.min(startRow, endRow); row <= Math.max(startRow, endRow); row++) {
      for (let col = Math.min(startCol, endCol); col <= Math.max(startCol, endCol); col++) {
        updatedBackgroundColors[row].cells[col].bgColor = color;
      }
    }

    setData(updatedBackgroundColors);
  };

  // Handle color picker change
  const handleColorChange = (color) => {
    setSelectedColor(color); // Set the selected color
    applyBackgroundColor(color); // Apply it to selected cells
  };

  // Handle right-click to show the context menu
  const handleContextMenu = (e, rowIndex, colIndex, column, rowId) => {
    e.preventDefault(); // Prevent default context menu
    setContextMenu({ x: e.clientX, y: e.clientY, rowIndex, colIndex, column, rowId });
  };


  const addRow = (rowIndex, position) => {
    const updatedData = [...data];

    const newRow = {
      rowID: data[rowIndex].rowID,
      cells: data[rowIndex].cells.map((cell) => ({
        cellID:  Math.random() * 1000, 
        value: '',
        bgColor: '#ffffff'
      })),
    }
    
    if(position == "top"){
      updatedData.splice(rowIndex, 0, newRow);
    }else if(position == "bottom"){
      updatedData.splice(rowIndex + 1, 0, newRow);
    }

    setData(updatedData);
    setContextMenu(null); 
  }

  const addColumn = (position, title) => {
    const columnIndex = selectionStart[1];
    const updatedHeader = [...header];
    const updatedData = [...data];
    console.log(columnIndex, position);

    const newHeader = {
      cellID: Math.random() * 1000,
      value: title,
      bgColor: '#ffffff'
    }

    const newColumn = {
      cellID: Math.random() * 1000, 
      value: '',
      bgColor: '#ffffff'
    }
    
    if(position == "left"){
      updatedHeader.splice(columnIndex, 0, newHeader);
      updatedData.map((row) => {
        row.cells.splice(columnIndex, 0, newColumn);
      })
    }else if(position == "right"){
      console.log("test")
      updatedHeader.splice(columnIndex+1, 0, newHeader);
      updatedData.map((row) => {
        row.cells.splice(columnIndex+1, 0, newColumn);
      })
    }
    console.log(updatedHeader)

    setHeader(updatedHeader);
    setData(updatedData);
    setContextMenu(null); 
  }

  const deleteRow = (rowIndex) => {
    const updatedData = [...data];
    updatedData.splice(rowIndex, 1);
    setData(updatedData);
    setContextMenu(null);
  }

  const deleteColumn = (columnIndex) => {
    const updatedHeader = [...header];
    const updatedData = [...data];

    updatedHeader.splice(columnIndex, 1);
    updatedData.map((row) => {
      row.cells.splice(columnIndex, 1);
    })

    setHeader(updatedHeader);
    setData(updatedData);
    setContextMenu(null);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div onMouseUp={handleMouseUp} >

      <table ref={tableRef} className='m-2'>
        <thead>
          <tr>
            {
              header.map((cell, index) => (
                <th 
                  key={index} 
                  contentEditable={true} 
                  suppressContentEditableWarning={true}
                  style={{ padding: '8px', backgroundColor: cell.bgColor }}>
                    {cell.value}
                </th>
              ))
            }
          </tr>
        </thead>
            
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.cells.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  contentEditable={true} // Make cell always editable
                  suppressContentEditableWarning={true} // Suppress React warning about using contentEditable
                  onBlur={(e) => handleEdit(rowIndex, colIndex, e)} // Track content changes
                  onMouseDown={(e) => {
                    if (e.button === 0) { // Check if left mouse button is clicked
                      handleMouseDown(rowIndex, colIndex);
                    }
                  }}
                  onMouseOver={() => handleMouseOver(rowIndex, colIndex)} // Continue selecting
                  onContextMenu={(e) => handleContextMenu(e, rowIndex, colIndex, cell.column, row.rowID, cell.bgColor)}
                  style={{
                    backgroundColor: isCellSelected(rowIndex, colIndex, cell)
                      ? darkenColor(cell.bgColor, 0.99) // Darken color if selected
                      : cell.bgColor, // Otherwise, use the cell's background color
                    border: isCellSelected(rowIndex, colIndex) ? '2px solid #38bdf8' : '1px solid #ddd', // Add thicker border if selected
                    padding: '8px',
                    minWidth: '100px',
                    cursor: 'pointer',
                  }}
                >
                  {cell.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '10px' }}>
        <input type="color" value={selectedColor} onChange={handleColorChange} />
      </div>

      {contextMenu && (
        <ul 
          ref={contextMenuRef}
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
          }}
          tabIndex={0} className={`dropdown-content menu bg-base-100 rounded-box z-[1] w-fit p-2 pe-5 shadow absolute top-[${contextMenu.y}px] ${contextMenu ? '' : 'hidden'}`}>
            <li>
              <h2 className="menu-title">Background Color</h2>
              <ul>
                <li>
                  <Compact
                    color={selectedColor}
                    style={{
                      backgroundColor: 'white'
                    }}
                    onChange={(color) => {
                      handleColorChange(color.hex);
                    }}
                    rectRender={(props) => {
                      if (props.key == 35) {
                        return <button key={props.key} style={{ width: 15, height: 15, padding: 0, lineHeight: "10px" }} onClick={() => setHex(null)}>x</button>
                      }
                    }}
                  />

                </li>
              </ul>
            </li>
            <li>
              <h2 className="menu-title">Row</h2>
              <ul>
                <li><a onClick={() => addRow(contextMenu.rowIndex, "top")}>Add to the top</a></li>
                <li><a onClick={() => addRow(contextMenu.rowIndex, "bottom")}>Add to the bottom</a></li>
                <li><a onClick={() => deleteRow(contextMenu.rowIndex)}>Delete</a></li>
              </ul>
            </li>
            <li>
              <h2 className="menu-title">Column</h2>
              <ul>
                <li><a onClick={() => {document.getElementById('columnTitleId').showModal(); setPosition("left")}}>Add to the left</a></li>
                <li><a onClick={() => {document.getElementById('columnTitleId').showModal(); setPosition("right")}}>Add to the right</a></li>
                <li><a onClick={() => deleteColumn(contextMenu.colIndex)}>Delete</a></li>
              </ul>
            </li>
        </ul>
      )}

      <dialog id="columnTitleId" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">New Column</h3>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Give a name for this column</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered w-full input-error" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <div className="label">
              <span className="label-text-alt text-red-500">Bottom Left label</span>
            </div>
          </label>
          <div className="modal-action ">
            <form method="dialog" className='grid grid-cols-2 col-span-2 justify-between gap-3 w-full'>
              <button className="btn">Cancel</button>
              <button className="btn btn-success" onClick={()=>addColumn(position, title)}>Add</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="columnTitleId" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">New Column</h3>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Give a name for this column</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered w-full input-error" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <div className="label">
              <span className="label-text-alt text-red-500">Bottom Left label</span>
            </div>
          </label>
          <div className="modal-action ">
            <form method="dialog" className='grid grid-cols-2 col-span-2 justify-between gap-3 w-full'>
              <button className="btn">Cancel</button>
              <button className="btn btn-success" onClick={()=>addColumn(position, title)}>Add</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
    
  );
};

export default Spreadsheet;
