import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function VerifyEmail() {
  const { token } = useParams();

  const [message, setMessage] = useState("Verifying...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/verify-email/${token}`
      );

      setSuccess(true);
      setMessage(res.data.message);
    } catch (err) {
      setSuccess(false);

      setMessage(
        err.response?.data?.message ||
          "Verification failed"
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
        <h1 className="text-3xl font-bold mb-6">
          Email Verification
        </h1>

        <p
          className={`text-lg ${
            success
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
}

export default VerifyEmail;
