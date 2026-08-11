import {
  FaHome,
  FaUserGraduate,
  FaBrain,
  FaLightbulb,
  FaHistory,
  FaUser,
  FaChartBar,
  FaFileExport,
  FaSignOutAlt,
  FaRobot,
  FaBalanceScale,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const role = (user?.role || "student").toLowerCase();

  const menuItems = [
    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
      roles: ["admin", "teacher", "student"],
    },
    {
      title: "Students",
      icon: <FaUserGraduate />,
      path: "/students",
      roles: ["admin", "teacher"],
    },
    {
      title: "Student Comparison",
      icon: <FaBalanceScale />,
      path: "/students/comparison",
      roles: ["admin", "teacher"],
    },
    {
      title: "Prediction",
      icon: <FaBrain />,
      path: "/prediction",
      roles: ["admin", "teacher", "student"],
    },
    {
      title: "Analytics",
      icon: <FaChartBar />,
      path: "/analytics",
      roles: ["admin"],
    },
    {
      title: "Recommendations",
      icon: <FaLightbulb />,
      path: "/recommendation",
      roles: ["admin", "teacher", "student"],
    },
    {
      title: "History",
      icon: <FaHistory />,
      path: "/history",
      roles: ["admin", "teacher", "student"],
    },
    {
      title: "Export Reports",
      icon: <FaFileExport />,
      path: "/export",
      roles: ["admin"],
    },
    {
      title: "Student Profile",
      icon: <FaUser />,
      path: "/students/profile",
      roles: ["admin", "teacher", "student"],
    },
    {
      title: "AI Chatbot",
      icon: <FaRobot />,
      path: "/chatbot",
      roles: ["admin", "teacher", "student"],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-slate-300 flex flex-col shadow-xl">

      {/* Logo */}
      <div className="text-center py-8 border-b border-slate-700">

        <h1 className="text-3xl font-bold text-white">
          EduPilot
        </h1>

        <p className="text-sm text-slate-400 mt-2 px-3">
          AI Student Performance Prediction
        </p>

        <div className="mt-4 text-xs text-slate-400">
          Logged in as
          <br />

          <span className="font-bold uppercase text-emerald-400">
            {role}
          </span>
        </div>

      </div>

      {/* Menu */}
      <nav className="flex-1 mt-6 px-3">

        {menuItems
          .filter((item) =>
            item.roles.includes(role)
          )
          .map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 mb-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-500 text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >

              <span className="text-lg">
                {item.icon}
              </span>

              <span className="font-medium">
                {item.title}
              </span>

            </NavLink>
          ))}

      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-slate-700">

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-300 hover:bg-rose-600 hover:text-white transition-all duration-200"
        >
          <FaSignOutAlt />
          <span className="font-medium">
            Logout
          </span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;

