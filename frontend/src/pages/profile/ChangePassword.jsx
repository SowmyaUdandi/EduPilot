import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axios from "axios";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/change-password`,
        {
          current_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Password change failed"
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-600 mb-8">
          Change Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="font-semibold">
              Current Password
            </label>

            <input
              type="password"
              className="w-full border rounded-lg p-3 mt-2"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
              required
            />
          </div>

          <div>
            <label className="font-semibold">
              New Password
            </label>

            <input
              type="password"
              className="w-full border rounded-lg p-3 mt-2"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              required
            />
          </div>

          <div>
            <label className="font-semibold">
              Confirm Password
            </label>

            <input
              type="password"
              className="w-full border rounded-lg p-3 mt-2"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg"
          >
            Change Password
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default ChangePassword;
