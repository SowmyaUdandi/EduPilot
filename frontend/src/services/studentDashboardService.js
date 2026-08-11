import API from "./api";


// ======================================================
// GET LOGGED-IN STUDENT DASHBOARD
// GET /api/students/me
// ======================================================

export const getMyDashboard = async () => {

  const response = await API.get(
    "/students/me"
  );

  return response.data;
};


// ======================================================
// GET LOGGED-IN STUDENT HISTORY
// ======================================================

export const getMyHistory = async (studentId) => {

  const response = await API.get(
    `/students/history/${studentId}`
  );

  return response.data;
};
