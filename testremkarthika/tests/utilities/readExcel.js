import ExcelJS from 'exceljs';
import dotenv from 'dotenv';
dotenv.config();

const testDataPath = process.env.DATAPATH;
const sheetName = process.env.SHEET;

export async function readExcelData(filePath, sheetName) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(sheetName);

  if (!worksheet) throw new Error(`Sheet "${sheetName}" not found in ${filePath}`);

  const rows = [];
  const headers = worksheet.getRow(1).values.slice(1); // remove null at index 0

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // skip header

    const rowData = {};
    row.values.slice(1).forEach((cell, i) => {
      rowData[headers[i]] = cell;
    });

    rows.push(rowData);
  });

  return rows;
}










