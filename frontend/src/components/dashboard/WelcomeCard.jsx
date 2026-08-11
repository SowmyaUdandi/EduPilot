import { FaUserCircle } from "react-icons/fa";

function WelcomeCard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-xl shadow-lg p-8 mb-8">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold">
            Welcome back, {user?.full_name || "User"} 👋
          </h2>

          <p className="mt-3 text-emerald-100 text-lg">
            Hope you're having a productive day.
          </p>

          <p className="mt-2 text-emerald-200">
            Role:
            <span className="font-bold ml-2 uppercase">
              {user?.role}
            </span>
          </p>

        </div>

        <FaUserCircle className="text-7xl opacity-80" />

      </div>

    </div>
  );
}

export default WelcomeCard;

