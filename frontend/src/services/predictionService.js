import api from "./api";

export const predictMarks = async (studentData) => {
  const response = await api.post(
    "/prediction",
    studentData
  );

  return response.data;
};
