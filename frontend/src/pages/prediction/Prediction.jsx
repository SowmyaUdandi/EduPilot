import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  predictStudent,
  getStudents,
  getRecommendations,
} from "../../services/dashboardService";

import { toast } from "react-toastify";

function Prediction() {
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    full_name: "",
    attendance: "",
    study_hours: "",
    assignment_score: "",
    internal_marks: "",
  });

  const [result, setResult] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

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
      toast.error("Failed to load students");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "full_name") {
      const student = students.find(
        (s) => s.full_name === value
      );

      if (student) {
        setFormData({
          full_name: student.full_name,
          attendance: student.attendance || "",
          study_hours: student.study_hours || "",
          assignment_score: student.assignment_score || "",
          internal_marks: student.internal_marks || "",
        });

        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePredict = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await predictStudent(formData);

      if (response.success) {

    setResult(response);

    const selectedStudent = students.find(
        (s) => s.full_name === formData.full_name
    );

    if (selectedStudent) {

        const rec = await getRecommendations(selectedStudent.id);

        if (rec.success) {
            setRecommendations(rec.recommendations);
        }

    }

    toast.success("Prediction Completed Successfully");
} else {
        toast.warning(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Prediction Failed");
    }
    finally {
    setLoading(false);
  }
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        AI Student Performance Prediction
      </h1>

      <form
        onSubmit={handlePredict}
        className="bg-white rounded-xl shadow-lg p-8"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Student Dropdown */}

          <select
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          >
            <option value="">
              Select Student
            </option>

            {students.map((student) => (
              <option
                key={student.id}
                value={student.full_name}
              >
                {student.full_name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="attendance"
            placeholder="Attendance (%)"
            value={formData.attendance}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="study_hours"
            placeholder="Study Hours"
            value={formData.study_hours}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="assignment_score"
            placeholder="Assignment Score"
            value={formData.assignment_score}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="internal_marks"
            placeholder="Internal Marks"
            value={formData.internal_marks}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

        </div>

       <button
  type="submit"
  disabled={loading}
  className={`mt-6 px-8 py-3 rounded-lg text-white ${
    loading
      ? "bg-gray-500 cursor-not-allowed"
      : "bg-emerald-600 hover:bg-emerald-700"
  }`}
>
  {loading ? "Predicting..." : "Predict Performance"}
</button>

      </form>

      {result && (
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            Prediction Result
          </h2>

          <p className="text-lg mb-4">
            <strong>Predicted Marks:</strong>{" "}
            {result.predicted_marks}
          </p>

          <p className="text-lg">
            <strong>Risk Level:</strong>{" "}

            <span
              className={`font-bold ${
                result.risk_level === "Low"
                  ? "text-green-600"
                  : result.risk_level === "Medium"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {result.risk_level}
            </span>

          </p>
          {recommendations.length > 0 && (
    <>
        <h3 className="text-xl font-bold mt-6 mb-3">
            Recommendations
        </h3>

        <ul className="list-disc pl-6 space-y-2">
            {recommendations.map((item, index) => (
                <li key={index}>
                    {item}
                </li>
            ))}
        </ul>
    </>
)}

        </div>
      )}

    </DashboardLayout>
  );
}

export default Prediction;
