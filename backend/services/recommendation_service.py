import api from "./api";

export const getRecommendation = async (predictedMarks) => {
  const response = await api.post("/recommendation", {
    predicted_marks: predictedMarks,
  });

  return response.data;
};