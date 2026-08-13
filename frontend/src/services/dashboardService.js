import axios from "axios";

// ======================================
// API CONFIGURATION
// ======================================

const API = axios.create({
  baseURL: "/api",
});

// ======================================
// REQUEST INTERCEPTOR
// JWT TOKEN
// ======================================

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ======================================
// RESPONSE INTERCEPTOR
// AUTO LOGOUT ON 401
// ======================================

API.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// ======================================
// DASHBOARD
// ======================================

export const getDashboard = async () => {
  const response = await API.get("/dashboard");

  return response.data;
};

// ======================================
// STUDENTS
// ======================================

export const getStudents = async () => {
  const response = await API.get("/students");

  return response.data;
};

export const getStudent = async (id) => {
  const response = await API.get(`/students/${id}`);

  return response.data;
};

export const getStudentById = async (id) => {
  const response = await API.get(`/students/${id}`);

  return response.data;
};

export const createStudent = async (student) => {
  const response = await API.post(
    "/students",
    student
  );

  return response.data;
};

export const updateStudent = async (id, student) => {
  const response = await API.put(
    `/students/${id}`,
    student
  );

  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await API.delete(
    `/students/${id}`
  );

  return response.data;
};

// ======================================
// PREDICTION
// ======================================

export const predictStudent = async (data) => {
  const response = await API.post(
    "/prediction",
    data
  );

  return response.data;
};

// ======================================
// RECOMMENDATION
// ======================================

export const getRecommendation = async (id) => {
  const response = await API.get(
    `/recommendation/${id}`
  );

  return response.data;
};

export const getRecommendations = async (id) => {
  try {
    const response = await API.get(
      `/recommendation/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Recommendation Error:",
      error
    );

    return {
      success: false,
      recommendations: [],
    };
  }
};

// ======================================
// CHATBOT
// ======================================

export const chatbotService = async (question) => {
  const response = await API.post(
    "/chatbot",
    {
      question,
    }
  );

  return response.data;
};

// ======================================
// HISTORY
// ======================================

export const getHistory = async () => {
  const response = await API.get(
    "/history"
  );

  return response.data;
};

// ======================================
// ANALYTICS
// ======================================

export const getAnalytics = async () => {
  const response = await API.get(
    "/analytics"
  );

  return response.data;
};

// ======================================
// NOTIFICATIONS
// ======================================

export const getNotifications = async () => {
  const response = await API.get(
    "/notifications"
  );

  return response.data;
};

// ======================================
// HIGH RISK STUDENTS
// ======================================

export const getHighRiskStudents = async () => {
  const response = await API.get(
    "/students"
  );

  const students =
    response.data.students || [];

  return students.filter(
    (student) =>
      student.prediction_risk === "High"
  );
};

// ======================================
// TOP PERFORMERS
// ======================================

export const getTopPerformers = async () => {
  const response = await API.get(
    "/students"
  );

  const students =
    response.data.students || [];

  return students
    .filter(
      (student) =>
        student.predicted_marks !== null &&
        student.predicted_marks !== undefined
    )
    .sort(
      (a, b) =>
        Number(b.predicted_marks) -
        Number(a.predicted_marks)
    )
    .slice(0, 5);
};

// ======================================
// EXPORT REPORTS
// ======================================

export const exportExcel = () => {
  window.open(
    "/api/export/excel",
    "_blank"
  );
};

export const exportPDF = () => {
  window.open(
    "/api/export/pdf",
    "_blank"
  );
};

// ======================================
// GET STUDENT PREDICTION HISTORY
// ======================================

export const getPredictionHistory = async (id) => {
  const response = await API.get(
    `/students/history/${id}`
  );

  return response.data;
};

// ======================================
// GET LOGGED-IN USER PROFILE
// ======================================

export const getProfile = async () => {
  try {
    const response = await API.get(
      "/profile"
    );

    return response.data;
  } catch (error) {
    console.error(
      "Profile Error:",
      error
    );

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to load profile",
    };
  }
};

// ======================================
// EXPORT API INSTANCE
// ======================================

export default API;