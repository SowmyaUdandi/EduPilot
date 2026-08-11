import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getStudent,
  updateStudent,
} from "../../services/dashboardService";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    try {
      const response = await getStudent(id);

      if (response.success) {
        setStudent(response.student);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load student.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setStudent({
      ...student,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      const updatedStudent = {
        ...student,
        predicted_marks: Number(predictedMarks),
        prediction_risk: risk,
      };

      const response = await updateStudent(id, updatedStudent);

      if (response.success) {
        alert("Student Updated Successfully!");
        navigate("/students");
      }
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Edit Student
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg grid grid-cols-2 gap-4"
      >
        <input
          name="student_id"
          value={student.student_id}
          onChange={handleChange}
          placeholder="Student ID"
          className="border p-3 rounded"
        />

        <input
          name="full_name"
          value={student.full_name}
          onChange={handleChange}
          placeholder="Full Name"
          className="border p-3 rounded"
        />

        <input
          name="email"
          value={student.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-3 rounded"
        />

        <input
          type="number"
          name="age"
          value={student.age}
          onChange={handleChange}
          placeholder="Age"
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
          value={student.department}
          onChange={handleChange}
          placeholder="Department"
          className="border p-3 rounded"
        />

        <input
          type="number"
          name="semester"
          value={student.semester}
          onChange={handleChange}
          placeholder="Semester"
          className="border p-3 rounded"
        />

        <input
          type="number"
          name="attendance"
          value={student.attendance}
          onChange={handleChange}
          placeholder="Attendance"
          className="border p-3 rounded"
        />

        <input
          type="number"
          step="0.1"
          name="study_hours"
          value={student.study_hours}
          onChange={handleChange}
          placeholder="Study Hours"
          className="border p-3 rounded"
        />

        <input
          type="number"
          name="assignment_score"
          value={student.assignment_score}
          onChange={handleChange}
          placeholder="Assignment Score"
          className="border p-3 rounded"
        />

        <input
          type="number"
          name="internal_marks"
          value={student.internal_marks}
          onChange={handleChange}
          placeholder="Internal Marks"
          className="border p-3 rounded"
        />

        <input
          type="number"
          step="0.1"
          name="previous_gpa"
          value={student.previous_gpa}
          onChange={handleChange}
          placeholder="Previous GPA"
          className="border p-3 rounded"
        />

        <input
          type="number"
          step="0.1"
          name="sleep_hours"
          value={student.sleep_hours}
          onChange={handleChange}
          placeholder="Sleep Hours"
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
          className="bg-emerald-600 text-white py-3 rounded col-span-2 hover:bg-emerald-700"
        >
          Update Student
        </button>
      </form>
    </DashboardLayout>
  );
}

export default EditStudent;
