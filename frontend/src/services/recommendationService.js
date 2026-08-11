import api from "./api";

export const getRecommendations = async (studentData) => {
  const response = await api.post(
    "/recommendation",
    studentData
  );

  return response.data;
};
