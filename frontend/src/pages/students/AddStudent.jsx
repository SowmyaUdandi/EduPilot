import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { createStudent } from "../../services/dashboardService";

function AddStudent() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [student, setStudent] = useState({
    student_id: "",
    full_name: "",
    email: "",
    age: "",
    gender: "",
    department: "",
    semester: "",
    attendance: "",
    study_hours: "",
    assignment_score: "",
    internal_marks: "",
    previous_gpa: "",
    sleep_hours: "",
    stress_level: "",
    extracurricular: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setStudent((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !student.student_id ||
      !student.full_name ||
      !student.email ||
      !student.department
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const predictedMarks = (
        Number(student.assignment_score) * 0.30 +
        Number(student.internal_marks) * 0.40 +
        Number(student.attendance) * 0.20 +
        Number(student.study_hours) * 2
      ).toFixed(2);

      let risk = "Low";

      if (predictedMarks < 50) {
        risk = "High";
      } else if (predictedMarks < 80) {
        risk = "Medium";
      }

      const studentData = {
        ...student,
        predicted_marks: Number(predictedMarks),
        prediction_risk: risk,
      };

      const response = await createStudent(studentData);

      if (response.success) {
        alert("Student Added Successfully!");

        navigate("/students");
      } else {
        alert(response.message || "Failed to add student.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add student.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Add Student
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg grid grid-cols-2 gap-4"
      >
        <input
          name="student_id"
          placeholder="Student ID"
          value={student.student_id}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          name="full_name"
          placeholder="Full Name"
          value={student.full_name}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={student.age}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <select
          name="gender"
          value={student.gender}
          onChange={handleChange}
          className="border p-3 rounded"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          name="department"
          placeholder="Department"
          value={student.department}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="number"
          name="semester"
          placeholder="Semester"
          value={student.semester}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="number"
          name="attendance"
          placeholder="Attendance (%)"
          value={student.attendance}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="number"
          step="0.1"
          name="study_hours"
          placeholder="Study Hours"
          value={student.study_hours}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="number"
          name="assignment_score"
          placeholder="Assignment Score"
          value={student.assignment_score}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="number"
          name="internal_marks"
          placeholder="Internal Marks"
          value={student.internal_marks}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="number"
          step="0.1"
          name="previous_gpa"
          placeholder="Previous GPA"
          value={student.previous_gpa}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="number"
          step="0.1"
          name="sleep_hours"
          placeholder="Sleep Hours"
          value={student.sleep_hours}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <select
          name="stress_level"
          value={student.stress_level}
          onChange={handleChange}
          className="border p-3 rounded"
        >
          <option value="">Select Stress Level</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label className="flex items-center gap-2 col-span-2">
          <input
            type="checkbox"
            name="extracurricular"
            checked={student.extracurricular}
            onChange={handleChange}
          />
          Participates in Extracurricular Activities
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded col-span-2 disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Save Student"}
        </button>
      </form>
    </DashboardLayout>
  );
}

export default AddStudent;
