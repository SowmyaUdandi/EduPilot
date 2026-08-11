import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

function Settings() {

  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "Administrator",
    email: "admin@gmail.com",
  });

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [darkMode, setDarkMode] = useState(false);

  const [notifications, setNotifications] = useState(true);

  const [emails, setEmails] = useState(true);

  const saveProfile = () => {
    alert("Profile Updated Successfully");
  };

  const changePassword = () => {

    if (
      password.newPassword !==
      password.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    alert("Password Updated Successfully");
  };

  const logout = () => {

    localStorage.removeItem("access_token");

    navigate("/");

  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-8">
        Settings
      </h1>

      {/* Profile */}

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

        <h2 className="text-xl font-bold mb-5">
          Admin Profile
        </h2>

        <input
          type="text"
          value={profile.name}
          onChange={(e) =>
            setProfile({
              ...profile,
              name: e.target.value,
            })
          }
          className="border p-3 rounded-lg w-full mb-4"
        />

        <input
          type="email"
          value={profile.email}
          onChange={(e) =>
            setProfile({
              ...profile,
              email: e.target.value,
            })
          }
          className="border p-3 rounded-lg w-full mb-4"
        />

        <button
          onClick={saveProfile}
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg"
        >
          Save Profile
        </button>

      </div>

      {/* Password */}

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

        <h2 className="text-xl font-bold mb-5">
          Change Password
        </h2>

        <input
          type="password"
          placeholder="Current Password"
          className="border p-3 rounded-lg w-full mb-3"
          onChange={(e)=>
            setPassword({
              ...password,
              oldPassword:e.target.value
            })
          }
        />

        <input
          type="password"
          placeholder="New Password"
          className="border p-3 rounded-lg w-full mb-3"
          onChange={(e)=>
            setPassword({
              ...password,
              newPassword:e.target.value
            })
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-3 rounded-lg w-full mb-4"
          onChange={(e)=>
            setPassword({
              ...password,
              confirmPassword:e.target.value
            })
          }
        />

        <button
          onClick={changePassword}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Update Password
        </button>

      </div>

      {/* Preferences */}

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

        <h2 className="text-xl font-bold mb-5">
          Preferences
        </h2>

        <label className="flex items-center justify-between mb-4">

          Dark Mode

          <input
            type="checkbox"
            checked={darkMode}
            onChange={() =>
              setDarkMode(!darkMode)
            }
          />

        </label>

        <label className="flex items-center justify-between mb-4">

          Notifications

          <input
            type="checkbox"
            checked={notifications}
            onChange={() =>
              setNotifications(!notifications)
            }
          />

        </label>

        <label className="flex items-center justify-between">

          Email Updates

          <input
            type="checkbox"
            checked={emails}
            onChange={() =>
              setEmails(!emails)
            }
          />

        </label>

      </div>

      {/* Logout */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg"
        >
          Logout
        </button>

      </div>

    </DashboardLayout>
  );
}

export default Settings;
