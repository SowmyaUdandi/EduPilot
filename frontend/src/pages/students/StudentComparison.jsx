import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import ComparisonChart from "../../components/students/ComparisonChart";
import ComparisonResult from "../../components/students/ComparisonResult";

import {
  getStudents,
  getStudentById,
} from "../../services/dashboardService";

function StudentComparison() {
  const [students, setStudents] = useState([]);

  const [student1, setStudent1] = useState("");
  const [student2, setStudent2] = useState("");

  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);

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

  const compareStudents = async () => {
    if (!student1 || !student2) return;

    try {
      const res1 = await getStudentById(student1);
      const res2 = await getStudentById(student2);

      if (res1.success) {
        setData1(res1.student);
      }

      if (res2.success) {
        setData2(res2.student);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-emerald-600 mb-8">
          Student Comparison
        </h1>

        <div className="grid md:grid-cols-2 gap-4">

          <select
            className="border p-3 rounded-lg"
            value={student1}
            onChange={(e) => setStudent1(e.target.value)}
          >
            <option value="">Select Student 1</option>

            {students.map((student) => (
              <option
                key={student.id}
                value={student.id}
              >
                {student.full_name}
              </option>
            ))}
          </select>

          <select
            className="border p-3 rounded-lg"
            value={student2}
            onChange={(e) => setStudent2(e.target.value)}
          >
            <option value="">Select Student 2</option>

            {students.map((student) => (
              <option
                key={student.id}
                value={student.id}
              >
                {student.full_name}
              </option>
            ))}
          </select>

        </div>

        <button
          onClick={compareStudents}
          className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700"
        >
          Compare
        </button>

        {data1 && data2 && (
          <>
            <div className="grid md:grid-cols-2 gap-6 mt-8">

              <StudentCard student={data1} />

              <StudentCard student={data2} />

            </div>

            <ComparisonChart
              student1={data1}
              student2={data2}
            />
            <ComparisonResult
  student1={data1}
  student2={data2}
/>
          </>
        )}

      </div>
    </DashboardLayout>
  );
}

function StudentCard({ student }) {
  return (
    <div className="bg-gray-100 rounded-xl p-6 shadow">

      <h2 className="text-2xl font-bold mb-4">
        {student.full_name}
      </h2>

      <p><b>Department:</b> {student.department}</p>

      <p><b>Semester:</b> {student.semester}</p>

      <p><b>Attendance:</b> {student.attendance}%</p>

      <p><b>Study Hours:</b> {student.study_hours}</p>

      <p><b>Assignment:</b> {student.assignment_score}</p>

      <p><b>Internal:</b> {student.internal_marks}</p>

      <p><b>Previous GPA:</b> {student.previous_gpa}</p>

      <p><b>Predicted Marks:</b> {student.predicted_marks}</p>

      <p><b>Risk:</b> {student.prediction_risk}</p>

    </div>
  );
}

export default StudentComparison;
