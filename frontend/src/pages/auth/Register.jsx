import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(formData);

      if (response.success) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        alert(response.message);
      }
    } catch (error) {
  console.log(error.response?.data);

  alert(
    error.response?.data?.message ||
    "Registration Failed"
  );
}
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <button
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-5">

          Already have an account?

          <Link
            to="/login"
            className="text-emerald-600 ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;
