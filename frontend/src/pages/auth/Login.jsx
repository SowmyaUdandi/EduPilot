import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authService";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

      const response = await loginUser(formData);

      if (response.success) {

  // Save JWT Token
  localStorage.setItem(
    "token",
    response.access_token
  );

  // Save User
  localStorage.setItem(
    "user",
    JSON.stringify(response.user)
  );

  navigate("/dashboard");

} else {

        alert(response.message);

      }

    } catch (error) {

      console.error(error);
      alert("Login Failed");

    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white rounded-xl shadow-lg p-8 w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>
        <div className="text-right mb-4">
  <button
    type="button"
    onClick={() => navigate("/forgot-password")}
    className="text-emerald-600 hover:underline text-sm"
  >
    Forgot Password?
  </button>
</div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <button
            className="w-full bg-emerald-600 text-white py-3 rounded"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-5">

          Don't have an account?

          <Link
            to="/register"
            className="text-emerald-600 ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );
}

export default Login;
