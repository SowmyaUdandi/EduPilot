import api from "./api";

export const exportExcel = async () => {
  return await api.get("/export/excel", {
    responseType: "blob",
  });
};