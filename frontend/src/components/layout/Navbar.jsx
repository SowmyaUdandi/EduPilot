import {
  FaBell,
  FaCircle,
} from "react-icons/fa";

function Navbar() {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const role = user?.role || "User";

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">

      <div className="px-5 md:px-8 py-4 flex items-center justify-between">

        {/* ======================================
            LEFT
        ====================================== */}

        <div>

          <p className="text-emerald-600 text-xs font-semibold uppercase tracking-wider">
            EduPilot
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-1">
            Dashboard
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Welcome back!
          </p>

        </div>

        {/* ======================================
            RIGHT
        ====================================== */}

        <div className="flex items-center gap-5">

          {/* Notification */}

          <div className="relative cursor-pointer group">

            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-emerald-50 transition">

              <FaBell className="text-lg text-slate-600 group-hover:text-emerald-600 transition" />

            </div>

            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
              0
            </span>

          </div>

          {/* Divider */}

          <div className="hidden sm:block h-10 w-px bg-slate-200" />

          {/* User */}

          <div className="flex items-center gap-3">

            <div className="hidden sm:block text-right">

              <h3 className="font-semibold text-slate-800 text-sm">
                {user?.full_name || "User"}
              </h3>

              <p className="text-xs text-slate-500 capitalize mt-1">
                {role}
              </p>

            </div>

            <div className="relative">

              <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold uppercase">
                {user?.full_name
                  ?.charAt(0) || "U"}
              </div>

              <FaCircle className="absolute bottom-0 right-0 text-emerald-500 text-[10px] border-2 border-white rounded-full" />

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;
