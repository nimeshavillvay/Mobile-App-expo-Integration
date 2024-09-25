import * as XLSX from "xlsx";

const VALID_EXTENSIONS = ["xlsx", "xls", "csv"];
const maxFileSize = 1000000; // 1MB
const maxFileSizeErrorMsg = "Maximum file size is 1MB.";
const acceptableImageTypesErrorMsg =
  "Invalid file format. Only EXCEL and CSV are supported.";

export const validateFile = (file: File) => {
  let errorMsg = "";
  const extension = file.name.split(".")[1];

  if (!extension || !VALID_EXTENSIONS.includes(extension)) {
    errorMsg = acceptableImageTypesErrorMsg;
  }

  if (file.size > maxFileSize) {
    errorMsg = maxFileSizeErrorMsg;
  }

  return errorMsg ? errorMsg : "";
};

export const getExcelData = async (file: File) => {
  const rowData = await readExcelFileAsRows(file);

  return formatRows(rowData);
};

const readExcelFileAsRows = async (file: File) => {
  const fileBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(new Uint8Array(fileBuffer));
  const firstSheetName = workbook.SheetNames[0] ?? "Sheet1";
  const worksheet = workbook.Sheets[firstSheetName] ?? {};
  const csvData = XLSX.utils.sheet_to_csv(worksheet);

  return csvData.split("\n");
};

const formatRows = (rowData: string[]) =>
  rowData
    .map((row) => {
      const cells = row.split(",").map((cell) => cell.trim());

      return cells[0]?.trim()?.length ? cells : null;
    })
    .filter(Boolean);
