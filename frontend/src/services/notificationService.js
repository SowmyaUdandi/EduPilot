import axios from "axios";

const API = "";

export const getNotifications = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${API}/api/notifications`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Notification Error:", error);

    return {
      success: false,
      notifications: [],
    };
  }
};

