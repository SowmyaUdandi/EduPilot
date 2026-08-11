import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import {
  getStudentById,
  getPredictionHistory,
} from "../../services/dashboardService";


function StudentView() {

  const { id } = useParams();

  const navigate = useNavigate();


  // ==================================================
  // State
  // ==================================================

  const [student, setStudent] = useState(null);

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ==================================================
  // Load Student
  // ==================================================

  useEffect(() => {

    loadStudent();

  }, [id]);


  const loadStudent = async () => {

    try {

      setLoading(true);

      setError("");


      // ----------------------------------------------
      // Get student
      // ----------------------------------------------

      const response = await getStudentById(id);


      if (!response?.success) {

        setError(
          response?.message ||
          "Student not found."
        );

        return;

      }


      setStudent(response.student);


      // ----------------------------------------------
      // Get prediction history
      // ----------------------------------------------

      try {

        const historyResponse =
          await getPredictionHistory(id);


        if (historyResponse?.success) {

          setHistory(
            historyResponse.history || []
          );

        }

      } catch (historyError) {

        console.error(
          "History Error:",
          historyError
        );

      }

    } catch (error) {

      console.error(
        "Student View Error:",
        error
      );


      // ----------------------------------------------
      // Access denied
      // ----------------------------------------------

      if (
        error.response &&
        error.response.status === 403
      ) {

        setError(
          "You are not allowed to view this student's profile."
        );

      }

      // ----------------------------------------------
      // Not found
      // ----------------------------------------------

      else if (
        error.response &&
        error.response.status === 404
      ) {

        setError(
          "Student not found."
        );

      }

      // ----------------------------------------------
      // Other error
      // ----------------------------------------------

      else {

        setError(
          "Unable to load student information."
        );

      }

    } finally {

      setLoading(false);

    }

  };


  // ==================================================
  // Loading
  // ==================================================

  if (loading) {

    return (

      <DashboardLayout>

        <LoadingSpinner />

      </DashboardLayout>

    );

  }


  // ==================================================
  // Error
  // ==================================================

  if (error || !student) {

    return (

      <DashboardLayout>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">

          <h1 className="text-2xl font-bold text-red-600">

            Student Profile Unavailable

          </h1>


          <p className="text-gray-600 mt-3">

            {error || "Student not found."}

          </p>


          <button
            onClick={() => navigate("/students")}
            className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg"
          >
            Back to Students
          </button>

        </div>

      </DashboardLayout>

    );

  }


  // ==================================================
  // Main Page
  // ==================================================

  return (

    <DashboardLayout>

      {/* ==============================================
          Header
      ============================================== */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">

        <div>

          <h1 className="text-3xl font-bold">

            Student Profile

          </h1>


          <p className="text-gray-500 mt-1">

            View student performance information

          </p>

        </div>


        <button
          onClick={() => navigate("/students")}
          className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
        >
          ← Back to Students
        </button>

      </div>


      {/* ==============================================
          Profile Header
      ============================================== */}

      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              student.full_name
            )}&background=2563eb&color=fff&size=150`}
            alt="Student Profile"
            className="rounded-full"
          />


          <div className="text-center md:text-left">

            <h2 className="text-3xl font-bold">

              {student.full_name}

            </h2>


            <p className="text-gray-500 mt-2">

              {student.email}

            </p>


            <p className="text-gray-500 mt-1">

              Student ID:{" "}

              <span className="font-semibold">

                {student.student_id}

              </span>

            </p>


            <div className="mt-4">

              <RiskBadge
                risk={student.prediction_risk}
              />

            </div>

          </div>

        </div>

      </div>


      {/* ==============================================
          Academic Information
      ============================================== */}

      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">

        <h2 className="text-2xl font-bold mb-6">

          Academic Information

        </h2>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          <Info
            title="Department"
            value={student.department}
          />


          <Info
            title="Semester"
            value={student.semester}
          />


          <Info
            title="Attendance"
            value={`${student.attendance}%`}
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

        </div>

      </div>


      {/* ==============================================
          Personal / Lifestyle Information
      ============================================== */}

      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">

        <h2 className="text-2xl font-bold mb-6">

          Personal & Lifestyle Information

        </h2>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          <Info
            title="Age"
            value={student.age}
          />


          <Info
            title="Gender"
            value={student.gender}
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

      </div>


      {/* ==============================================
          AI Prediction
      ============================================== */}

      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">

        <h2 className="text-2xl font-bold mb-6">

          AI Performance Prediction

        </h2>


        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-emerald-50 rounded-xl p-6">

            <p className="text-gray-600">

              Predicted Marks

            </p>


            <p className="text-4xl font-bold text-emerald-600 mt-2">

              {student.predicted_marks ?? "N/A"}

            </p>

          </div>


          <div className="bg-gray-50 rounded-xl p-6">

            <p className="text-gray-600">

              Risk Level

            </p>


            <div className="mt-3">

              <RiskBadge
                risk={student.prediction_risk}
              />

            </div>

          </div>

        </div>

      </div>


      {/* ==============================================
          Prediction History
      ============================================== */}

      <div className="bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-6">

          Prediction History

        </h2>


        {history.length > 0 ? (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-emerald-600 text-white">

                <tr>

                  <th className="p-4">
                    Date
                  </th>

                  <th>
                    Predicted Marks
                  </th>

                  <th>
                    Risk
                  </th>

                </tr>

              </thead>


              <tbody>

                {history.map(
                  (item, index) => (

                    <tr
                      key={index}
                      className="border-b text-center"
                    >

                      <td className="p-4">

                        {item.date}

                      </td>


                      <td>

                        {item.marks ?? "N/A"}

                      </td>


                      <td>

                        <RiskBadge
                          risk={item.risk}
                        />

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        ) : (

          <p className="text-gray-500 text-center py-6">

            No prediction history available.

          </p>

        )}

      </div>

    </DashboardLayout>

  );

}


// ======================================================
// Information Card
// ======================================================

function Info({ title, value }) {

  return (

    <div className="bg-gray-100 rounded-lg p-4">

      <h3 className="font-semibold text-gray-600">

        {title}

      </h3>


      <p className="text-xl font-bold mt-2">

        {value ?? "N/A"}

      </p>

    </div>

  );

}


// ======================================================
// Risk Badge
// ======================================================

function RiskBadge({ risk }) {

  let className =
    "bg-gray-500";


  if (risk === "Low") {

    className =
      "bg-green-500";

  }

  else if (risk === "Medium") {

    className =
      "bg-yellow-500";

  }

  else if (risk === "High") {

    className =
      "bg-red-500";

  }


  return (

    <span
      className={`inline-block px-4 py-2 rounded-full text-white font-bold ${className}`}
    >

      {risk || "N/A"}

    </span>

  );

}


export default StudentView;

