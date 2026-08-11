import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getStudents,
  getRecommendation,
} from "../../services/dashboardService";

function Recommendation() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await getStudents();

      if (response.success) {
        setStudents(response.students);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadRecommendation = async () => {
    if (!selectedStudent) return;

    try {
      // Find selected student
      const student = students.find(
        (s) => s.id === Number(selectedStudent)
      );

      if (!student) return;

     const response = await getRecommendation(selectedStudent);

      if (response.success) {
        setResult({
          student: {
            name: student.full_name,
            predicted_marks: student.predicted_marks,
            risk: student.prediction_risk,
          },
          recommendations: response.recommendations,
        });
      }
    } catch (error) {
  console.error("Recommendation Error:", error);

  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Data:", error.response.data);
  }

  alert("Unable to fetch recommendations");
}
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">
        AI Study Recommendations
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <label className="font-semibold">
          Select Student
        </label>

        <select
          className="w-full border p-3 rounded-lg mt-2"
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option value="">
            Select Student
          </option>

          {students.map((student) => (
            <option
              key={student.id}
              value={student.id}
            >
              {student.full_name}
            </option>
          ))}
        </select>

        <button
          onClick={loadRecommendation}
          className="mt-5 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700"
        >
          Generate AI Recommendation
        </button>
      </div>

      {result && (
        <>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">
              {result.student.name}
            </h2>

            <p className="mb-2">
              <strong>Predicted Marks:</strong>{" "}
              {result.student.predicted_marks}
            </p>

            <p>
              <strong>Risk Level:</strong>{" "}
              {result.student.risk}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-5">
              AI Recommendations
            </h2>

            <ul className="list-disc ml-6 space-y-3">
              {result.recommendations.map((item, index) => (
                <li key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default Recommendation;
