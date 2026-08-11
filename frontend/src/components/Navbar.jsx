import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md px-8 py-4 flex justify-between items-center">

      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h2>

        <p className="text-gray-500 dark:text-gray-300">
          Welcome back!
        </p>
      </div>

      <div className="flex items-center gap-5">

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-xl p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <div className="text-right">
          <h3 className="font-bold text-gray-800 dark:text-white">
            {user?.full_name}
          </h3>

          <p className="text-gray-500 dark:text-gray-300">
            {user?.role}
          </p>
        </div>

      </div>

    </div>
  );
}

export default Navbar;
