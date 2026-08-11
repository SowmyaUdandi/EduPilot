import api from "./api";

export const getStudentProfile = async (id) => {
  const response = await api.get(`/students/${id}`);
  return response.data;
};
