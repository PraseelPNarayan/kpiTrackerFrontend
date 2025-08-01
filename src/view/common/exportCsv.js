import Papa from "papaparse";

const exportCSV = (data, filename = "export.csv") => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
};

export default exportCSV;
