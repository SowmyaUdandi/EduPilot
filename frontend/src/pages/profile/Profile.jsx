import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { getProfile } from "../../services/dashboardService";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProfile();

      if (response.success) {
        if (response.student) {
          setProfile(response.student);
        } else if (response.user) {
          setProfile(response.user);
        } else {
          setError("Profile data not found.");
        }
      } else {
        setError(
          response.message || "Failed to load profile."
        );
      }
    } catch (error) {
      console.error("Profile Load Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // Loading
  // ======================================

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-2xl font-bold text-gray-700">
            Loading Profile...
          </h1>
        </div>
      </DashboardLayout>
    );
  }

  // ======================================
  // Error
  // ======================================

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Profile Error
          </h1>

          <p className="text-gray-600 mt-3">
            {error}
          </p>

          <button
            onClick={loadProfile}
            className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </DashboardLayout>
    );
  }

  // ======================================
  // Profile
  // ======================================

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-600">
          My Profile
        </h1>

        <p className="text-gray-500 mt-2">
          View your account and academic information.
        </p>
      </div>


      {/* Profile Information */}

      <div className="bg-white rounded-xl shadow-lg p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Full Name */}

          <div>
            <label className="font-bold text-gray-700">
              Full Name
            </label>

            <p className="mt-1 text-gray-600">
              {profile?.full_name || "N/A"}
            </p>
          </div>


          {/* Email */}

          <div>
            <label className="font-bold text-gray-700">
              Email
            </label>

            <p className="mt-1 text-gray-600">
              {profile?.email || "N/A"}
            </p>
          </div>


          {/* Role */}

          {profile?.role && (
            <div>
              <label className="font-bold text-gray-700">
                Role
              </label>

              <p className="mt-1 text-gray-600 uppercase">
                {profile.role}
              </p>
            </div>
          )}


          {/* Student ID */}

          {profile?.student_id && (
            <div>
              <label className="font-bold text-gray-700">
                Student ID
              </label>

              <p className="mt-1 text-gray-600">
                {profile.student_id}
              </p>
            </div>
          )}


          {/* Department */}

          {profile?.department && (
            <div>
              <label className="font-bold text-gray-700">
                Department
              </label>

              <p className="mt-1 text-gray-600">
                {profile.department}
              </p>
            </div>
          )}


          {/* Semester */}

          {profile?.semester !== undefined &&
            profile?.semester !== null && (
              <div>
                <label className="font-bold text-gray-700">
                  Semester
                </label>

                <p className="mt-1 text-gray-600">
                  {profile.semester}
                </p>
              </div>
            )}


          {/* Attendance */}

          {profile?.attendance !== undefined &&
            profile?.attendance !== null && (
              <div>
                <label className="font-bold text-gray-700">
                  Attendance
                </label>

                <p className="mt-1 text-gray-600">
                  {profile.attendance}%
                </p>
              </div>
            )}


          {/* Study Hours */}

          {profile?.study_hours !== undefined &&
            profile?.study_hours !== null && (
              <div>
                <label className="font-bold text-gray-700">
                  Study Hours
                </label>

                <p className="mt-1 text-gray-600">
                  {profile.study_hours}
                </p>
              </div>
            )}


          {/* Assignment Score */}

          {profile?.assignment_score !== undefined &&
            profile?.assignment_score !== null && (
              <div>
                <label className="font-bold text-gray-700">
                  Assignment Score
                </label>

                <p className="mt-1 text-gray-600">
                  {profile.assignment_score}
                </p>
              </div>
            )}


          {/* Internal Marks */}

          {profile?.internal_marks !== undefined &&
            profile?.internal_marks !== null && (
              <div>
                <label className="font-bold text-gray-700">
                  Internal Marks
                </label>

                <p className="mt-1 text-gray-600">
                  {profile.internal_marks}
                </p>
              </div>
            )}


          {/* Previous GPA */}

          {profile?.previous_gpa !== undefined &&
            profile?.previous_gpa !== null && (
              <div>
                <label className="font-bold text-gray-700">
                  Previous GPA
                </label>

                <p className="mt-1 text-gray-600">
                  {profile.previous_gpa}
                </p>
              </div>
            )}


          {/* Sleep Hours */}

          {profile?.sleep_hours !== undefined &&
            profile?.sleep_hours !== null && (
              <div>
                <label className="font-bold text-gray-700">
                  Sleep Hours
                </label>

                <p className="mt-1 text-gray-600">
                  {profile.sleep_hours}
                </p>
              </div>
            )}


          {/* Stress Level */}

          {profile?.stress_level !== undefined &&
            profile?.stress_level !== null && (
              <div>
                <label className="font-bold text-gray-700">
                  Stress Level
                </label>

                <p className="mt-1 text-gray-600">
                  {profile.stress_level}
                </p>
              </div>
            )}


          {/* Predicted Marks */}

          {profile?.predicted_marks !== undefined &&
            profile?.predicted_marks !== null && (
              <div>
                <label className="font-bold text-gray-700">
                  Predicted Marks
                </label>

                <p className="mt-1 text-gray-600">
                  {profile.predicted_marks}
                </p>
              </div>
            )}


          {/* Prediction Risk */}

          {profile?.prediction_risk && (
            <div>
              <label className="font-bold text-gray-700">
                Prediction Risk
              </label>

              <p className="mt-1 text-gray-600">
                {profile.prediction_risk}
              </p>
            </div>
          )}

        </div>


        {/* Change Password */}

        <div className="mt-8 pt-6 border-t">

          <button
            onClick={() =>
              window.location.href =
                "/change-password"
            }
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg"
          >
            Change Password
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Profile;
