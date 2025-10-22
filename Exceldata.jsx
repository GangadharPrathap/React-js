import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

/**
 * A React component to read an Excel file and optionally transform the data.
 *
 * @param {object} props
 * @param {function} [props.transform] - An optional function to transform the raw JSON data from Excel.
 * It receives the 'excelData' array and should return the transformed array.
 */
function ExcelReader({ transform }) { // Destructure 'transform' from props
  const [excelData, setExcelData] = useState(null);
  const [transformedData, setTransformedData] = useState(null);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assuming you want to read the first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        setExcelData(json); // Update raw data state
        console.log(json)
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // 1. **Initial Error Resolution:** Moved data transformation logic into a useEffect hook.
  // 2. **Added Prop Usage:** Implements the custom 'transform' prop, falling back to the default logic.
  useEffect(() => {
    if (excelData) {
      let dataToSet;

      // If a custom transform function is provided, use it.
      if (typeof transform === 'function') {
        dataToSet = transform(excelData);
      } else {
        // Your original transformation logic (Default transform for OHLC data)
        dataToSet = excelData.map((row) => {
          // Convert the Date string to a Unix timestamp (milliseconds)
          const timestamp = new Date(row.Date).getTime();

          // Create the OHLC array [Open, High, Low, Close]
          const ohlc = [
            row.Open,
            row.High,
            row.Low,
            row.Close
          ];

          return {
            x: timestamp, // The date/time for the X-axis
            y: ohlc,     // The OHLC values for the Y-axis
          };
        });
      }

      setTransformedData(dataToSet);
      console.log("Transformed Data:", dataToSet);
    }
  }, [excelData, transform]); // Re-run when raw data or the transform prop changes

  return (
    <div>
      <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFile} />
      {/* Display raw Excel Data as a Table (Optional, for debugging/display) */}
      {excelData && excelData.length > 0 && (
        <section>
            <h2>Raw Excel Data ({excelData.length} rows)</h2>
            <table>
              <thead>
                <tr>
                  {Object.keys(excelData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excelData.map((row, index) => (
                  <tr key={index}>
                    {/* {Object.values(row).map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))} */}
                  </tr>
                ))}
              </tbody>
            </table>
        </section>
      )}

      {/* Display Transformed Data (Optional, for debugging/display) */}
      {transformedData && transformedData.length > 0 && (
        <section>
            <h2>Transformed Data ({transformedData.length} entries)</h2>
            {/* You would typically use this data to render a chart component here */}
            <pre style={{
                maxHeight: '300px',
                overflowY: 'scroll',
                backgroundColor: '#f4f4f4',
                padding: '10px'
            }}>
                {JSON.stringify(transformedData.slice(0, 5), null, 2)}
                {transformedData.length > 5 && "\n...\n(Showing first 5 entries)"}
            </pre>
        </section>
      )}
    </div>
  );
}

export default ExcelReader;