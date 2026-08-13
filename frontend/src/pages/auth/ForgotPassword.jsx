import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================
  // Send OTP
  // =====================

  const sendOTP = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `/api/forgot-password`,
        {
          email,
        }
      );

      alert(response.data.message);

      setStep(2);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // Reset Password
  // =====================

  const resetPassword = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `/api/reset-password`,
        {
          email,
          otp,
          new_password: newPassword,
        }
      );

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center text-emerald-600 mb-6">
          Forgot Password
        </h1>

        {step === 1 ? (
          <>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 mb-4"
            />

            <button
              onClick={sendOTP}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 mb-4"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              className="w-full border rounded-lg px-4 py-3 mb-4"
            />

            <button
              onClick={resetPassword}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
