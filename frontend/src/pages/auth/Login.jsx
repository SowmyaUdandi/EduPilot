import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGraduationCap } from "react-icons/fa";
import { loginUser } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const response = await loginUser(formData);

      if (response.success) {
        localStorage.setItem("token", response.access_token);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

        {/* ==============================
            LEFT BRANDING SECTION
        ============================== */}

        <div className="hidden lg:flex bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white p-12 flex-col justify-between">

          <div>

            <div className="flex items-center gap-3 mb-10">

              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                <FaGraduationCap className="text-2xl" />
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  EduPilot
                </h1>

                <p className="text-emerald-100 text-xs">
                  AI-Powered Academic Assistance
                </p>
              </div>

            </div>

            <h2 className="text-4xl font-bold leading-tight">
              Smarter insights.
              <br />
              Better academic
              <br />
              outcomes.
            </h2>

            <p className="text-emerald-50/90 mt-6 leading-relaxed max-w-md">
              Monitor student performance, predict academic outcomes,
              identify risks, and provide personalized recommendations
              with AI-powered insights.
            </p>

          </div>

          <div className="text-sm text-emerald-100">
            <p>Student Performance Prediction Platform</p>
            <p className="mt-1 opacity-75">
              EduPilot • AI & Machine Learning
            </p>
          </div>

        </div>

        {/* ==============================
            LOGIN SECTION
        ============================== */}

        <div className="p-7 sm:p-10 lg:p-12">

          {/* Mobile branding */}

          <div className="lg:hidden text-center mb-8">

            <div className="inline-flex w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 items-center justify-center mb-3">
              <FaGraduationCap className="text-2xl" />
            </div>

            <h1 className="text-2xl font-bold text-slate-800">
              EduPilot
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              AI-Powered Academic Assistance
            </p>

          </div>

          <div className="max-w-md mx-auto">

            <div className="mb-8">

              <p className="text-emerald-600 text-sm font-semibold uppercase tracking-wider">
                Welcome back
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">
                Sign in to EduPilot
              </h2>

              <p className="text-slate-500 mt-2">
                Continue to your academic dashboard.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email address
                </label>

                <div className="relative">

                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition"
                    required
                  />

                </div>

              </div>

              {/* Password */}

              <div>

                <div className="flex items-center justify-between mb-2">

                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>

                </div>

              </div>

              {/* Login button */}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold shadow-lg shadow-emerald-600/20 transition duration-200"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

            </form>

            {/* Register */}

            <div className="relative my-8">

              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs text-slate-400">
                  NEW TO EDUPILOT?
                </span>
              </div>

            </div>

            <p className="text-center text-sm text-slate-500">

              Don't have an account?

              <Link
                to="/register"
                className="ml-2 font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
              >
                Create an account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;
