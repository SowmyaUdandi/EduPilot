import {
  FaHome,
  FaUserGraduate,
  FaBrain,
  FaLightbulb,
  FaHistory,
  FaUser,
  FaLock,
  FaChartBar,
  FaFileExport,
  FaSignOutAlt,
  FaRobot,
  FaBalanceScale,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  // ==========================================
  // LOGGED-IN USER
  // ==========================================

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const role = (user?.role || "").toLowerCase();

  // ==========================================
  // MENU ITEMS
  // ==========================================

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
      title: "Change Password",
      icon: <FaLock />,
      path: "/change-password",
      roles: ["admin", "teacher", "student"],
    },

    {
      title: "AI Chatbot",
      icon: <FaRobot />,
      path: "/chatbot",
      roles: ["admin", "teacher", "student"],
    },
  ];

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  // ==========================================
  // SIDEBAR
  // ==========================================

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col shadow-xl">

      {/* ======================================
          LOGO
      ====================================== */}

      <div className="text-center px-5 py-7 border-b border-slate-700">

        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500 shadow-lg mb-4">
          <FaBrain className="text-2xl text-white" />
        </div>

        <h1 className="text-2xl font-bold tracking-wide">
          EduPilot
        </h1>

        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
          AI Student Performance
          <br />
          Prediction
        </p>

        {/* Role */}

        <div className="mt-5">

          <p className="text-xs text-slate-500 uppercase tracking-wider">
            Logged in as
          </p>

          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase">
            {role || "user"}
          </span>

        </div>

      </div>

      {/* ======================================
          MENU
      ====================================== */}

      <nav className="flex-1 px-3 py-5 overflow-y-auto">

        <p className="px-3 mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Main Menu
        </p>

        <div className="space-y-1">

          {menuItems
            .filter((item) =>
              item.roles.includes(role)
            )
            .map((item) => (

              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-500 text-white shadow-md"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >

                <span className="text-lg w-5 flex justify-center">
                  {item.icon}
                </span>

                <span className="text-sm font-medium">
                  {item.title}
                </span>

              </NavLink>

            ))}

        </div>

      </nav>

      {/* ======================================
          LOGOUT
      ====================================== */}

      <div className="p-3 border-t border-slate-700">

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-300 hover:bg-rose-500 hover:text-white transition-all duration-200"
        >

          <span className="text-lg w-5 flex justify-center">
            <FaSignOutAlt />
          </span>

          <span className="text-sm font-medium">
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
