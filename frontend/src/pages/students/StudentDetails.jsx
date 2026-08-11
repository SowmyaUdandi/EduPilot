import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getStudentById } from "../../services/dashboardService";

import StudentChart from "../../components/students/StudentChart";
import StudentRecommendations from "../../components/students/StudentRecommendations";
import StudentPDF from "../../components/students/StudentPDF";
import StudentExcel from "../../components/students/StudentExcel";
import { getPredictionHistory } from "../../services/dashboardService";
import PredictionHistoryChart from "../../components/students/PredictionHistoryChart";

function StudentDetails() {
  const { id } = useParams();
  console.log("Student ID:", id);
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    try {
      const response = await getStudentById(id);

      if (response.success) {
  setStudent(response.student);

  const historyResponse = await getPredictionHistory(id);

  if (historyResponse.success) {
    setHistory(historyResponse.history);
  }
}
    } catch (error) {
      console.error("Student Load Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-3xl font-bold">
            Loading Student...
          </h1>
        </div>
      </DashboardLayout>
    );
  }

  if (!student) {
    return (
      <DashboardLayout>
        <h1 className="text-3xl font-bold text-red-600">
          Student Not Found
        </h1>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      {/* Student Profile */}

      <div className="bg-white rounded-xl shadow-lg p-8">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            Student Profile
          </h1>

          <div className="flex gap-3">

            <StudentPDF
              student={student}
              recommendations={recommendations}
            />

            <StudentExcel
              student={student}
              recommendations={recommendations}
            />

            <button
              onClick={() => navigate("/students")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg"
            >
              Back
            </button>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <Info
            label="Student ID"
            value={student.student_id}
          />

          <Info
            label="Full Name"
            value={student.full_name}
          />

          <Info
            label="Email"
            value={student.email}
          />

          <Info
            label="Department"
            value={student.department}
          />

          <Info
            label="Semester"
            value={student.semester}
          />

          <Info
            label="Attendance"
            value={`${student.attendance}%`}
          />

          <Info
            label="Study Hours"
            value={student.study_hours}
          />

          <Info
            label="Assignment Score"
            value={student.assignment_score}
          />

          <Info
            label="Internal Marks"
            value={student.internal_marks}
          />

          <Info
            label="Previous GPA"
            value={student.previous_gpa}
          />

          <Info
            label="Sleep Hours"
            value={student.sleep_hours}
          />

          <Info
            label="Stress Level"
            value={student.stress_level}
          />

          <Info
            label="Extracurricular"
            value={
              student.extracurricular
                ? "Yes"
                : "No"
            }
          />

          <Info
            label="Predicted Marks"
            value={student.predicted_marks}
          />

          <Info
            label="Risk Level"
            value={student.prediction_risk}
          />

        </div>

      </div>

      {/* Student Chart */}

      <StudentChart student={student} />
      <PredictionHistoryChart history={history} />
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
  <h2 className="text-2xl font-bold text-emerald-600 mb-4">
    Prediction History
  </h2>

  <table className="w-full border">
    <thead className="bg-emerald-600 text-white">
      <tr>
        <th className="p-3 border">Date</th>
        <th className="p-3 border">Predicted Marks</th>
        <th className="p-3 border">Risk</th>
      </tr>
    </thead>

    <tbody>
      {history.map((item, index) => (
        <tr key={index}>
          <td className="border p-3">{item.date}</td>
          <td className="border p-3">{item.marks}</td>
          <td className="border p-3">{item.risk}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/* AI Recommendations */}

      <StudentRecommendations
        studentId={student.id}
        onRecommendationsLoaded={
          setRecommendations
        }
      />

    </DashboardLayout>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-gray-100 rounded-lg p-4">

      <p className="text-gray-500 text-sm">
        {label}
      </p>

      <h2 className="text-xl font-semibold">
        {value ?? "N/A"}
      </h2>

    </div>
  );
}

export default StudentDetails;
