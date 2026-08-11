import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import { getStudents } from "../../services/dashboardService";

function StudentProfile() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("StudentProfile component loaded");
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getStudents();

      console.log("Student Profiles API Response:", response);

      if (response?.success) {
        setStudents(response.students || []);
      } else {
        setError(
          response?.message || "Unable to load student profiles."
        );
      }
    } catch (error) {
      console.error("Student Profiles Error:", error);

      setError(
        error.response?.data?.message ||
        "Unable to load student profiles."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  // ==========================================
  // Error
  // ==========================================

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">

          <h1 className="text-2xl font-bold text-red-600">
            Student Profiles Unavailable
          </h1>

          <p className="text-gray-600 mt-3">
            {error}
          </p>

          <button
            onClick={loadStudents}
            className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg"
          >
            Try Again
          </button>

        </div>
      </DashboardLayout>
    );
  }

  // ==========================================
  // Main Student Profiles
  // ==========================================

  return (
    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Student Profiles
        </h1>

        <p className="text-gray-500 mt-2">
          View student performance information
        </p>

      </div>

      {students.length === 0 ? (

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">

          <p className="text-gray-500">
            No students found.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {students.map((student) => (

            <div
              key={student.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >

              {/* =====================================
                  Header
              ===================================== */}

              <div className="bg-emerald-600 text-white p-6">

                <h2 className="text-2xl font-bold">
                  {student.full_name}
                </h2>

                <p className="text-emerald-100 mt-2">
                  {student.department} • Semester{" "}
                  {student.semester}
                </p>

              </div>

              {/* =====================================
                  Student Information
              ===================================== */}

              <div className="p-6">

                <div className="grid grid-cols-2 gap-4">

                  <Info
                    title="Student ID"
                    value={student.student_id}
                  />

                  <Info
                    title="Email"
                    value={student.email}
                  />

                  <Info
                    title="Attendance"
                    value={
                      student.attendance !== null &&
                      student.attendance !== undefined
                        ? `${student.attendance}%`
                        : "N/A"
                    }
                  />

                  <Info
                    title="Study Hours"
                    value={student.study_hours}
                  />

                  <Info
                    title="Assignment Score"
                    value={student.assignment_score}
                  />

                  <Info
                    title="Internal Marks"
                    value={student.internal_marks}
                  />

                  <Info
                    title="Previous GPA"
                    value={student.previous_gpa}
                  />

                  <Info
                    title="Sleep Hours"
                    value={student.sleep_hours}
                  />

                  <Info
                    title="Stress Level"
                    value={student.stress_level}
                  />

                  <Info
                    title="Extracurricular"
                    value={
                      student.extracurricular
                        ? "Yes"
                        : "No"
                    }
                  />

                </div>

                {/* =====================================
                    Prediction
                ===================================== */}

                <div className="mt-8 border-t pt-6">

                  <h3 className="text-xl font-bold mb-4">
                    Prediction Result
                  </h3>

                  <div className="flex justify-between items-center">

                    <div>

                      <p className="text-gray-500">
                        Predicted Marks
                      </p>

                      <p className="text-3xl font-bold text-emerald-600">
                        {student.predicted_marks ?? "N/A"}
                      </p>

                    </div>

                    <div>

                      <span
                        className={`px-5 py-2 rounded-full text-white font-bold ${
                          student.prediction_risk === "Low"
                            ? "bg-green-500"
                            : student.prediction_risk === "Medium"
                            ? "bg-yellow-500"
                            : student.prediction_risk === "High"
                            ? "bg-red-500"
                            : "bg-gray-500"
                        }`}
                      >
                        {student.prediction_risk ?? "N/A"}
                      </span>

                    </div>

                  </div>

                </div>

                {/* =====================================
                    Performance Summary
                ===================================== */}

                <div className="mt-8 border-t pt-6">

                  <h3 className="text-xl font-bold mb-4">
                    Performance Summary
                  </h3>

                  <ProgressBar
                    title="Attendance"
                    value={student.attendance}
                  />

                  <ProgressBar
                    title="Assignment"
                    value={student.assignment_score}
                  />

                  <ProgressBar
                    title="Internal Marks"
                    value={student.internal_marks}
                  />

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </DashboardLayout>
  );
}

// ==========================================
// Information Card
// ==========================================

function Info({ title, value }) {
  return (
    <div className="bg-gray-100 rounded-lg p-4">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="text-lg font-bold mt-1 break-words">
        {value ?? "N/A"}
      </p>

    </div>
  );
}

// ==========================================
// Progress Bar
// ==========================================

function ProgressBar({ title, value }) {
  const percentage = Math.min(
    Math.max(Number(value) || 0, 0),
    100
  );

  return (
    <div className="mb-5">

      <div className="flex justify-between mb-2">

        <span className="font-medium">
          {title}
        </span>

        <span>
          {value ?? "N/A"}%
        </span>

      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">

        <div
          className="bg-emerald-600 h-3 rounded-full"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}

export default StudentProfile;

