import axios from "axios";

const API = "";

export const exportExcel = async () => {
  const response = await axios.get(
    `${API}/api/export/excel`,
    {
      responseType: "blob",
    }
  );

  const url = window.URL.createObjectURL(
    new Blob([response.data])
  );

  const link = document.createElement("a");

  link.href = url;
  link.setAttribute(
    "download",
    "edupilot-history.xlsx"
  );

  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
};

export const exportPDF = async () => {
  const response = await axios.get(
    `${API}/api/export/pdf`,
    {
      responseType: "blob",
    }
  );

  const url = window.URL.createObjectURL(
    new Blob([response.data])
  );

  const link = document.createElement("a");

  link.href = url;
  link.setAttribute(
    "download",
    "edupilot-report.pdf"
  );

  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
};
