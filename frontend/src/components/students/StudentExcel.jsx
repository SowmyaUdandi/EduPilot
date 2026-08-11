import * as XLSX from "xlsx";

function StudentExcel({ student, recommendations }) {
  const exportExcel = () => {
    const data = [
      {
        Field: "Student ID",
        Value: student.student_id,
      },
      {
        Field: "Full Name",
        Value: student.full_name,
      },
      {
        Field: "Email",
        Value: student.email,
      },
      {
        Field: "Department",
        Value: student.department,
      },
      {
        Field: "Semester",
        Value: student.semester,
      },
      {
        Field: "Attendance",
        Value: `${student.attendance}%`,
      },
      {
        Field: "Study Hours",
        Value: student.study_hours,
      },
      {
        Field: "Assignment Score",
        Value: student.assignment_score,
      },
      {
        Field: "Internal Marks",
        Value: student.internal_marks,
      },
      {
        Field: "Previous GPA",
        Value: student.previous_gpa,
      },
      {
        Field: "Sleep Hours",
        Value: student.sleep_hours,
      },
      {
        Field: "Stress Level",
        Value: student.stress_level,
      },
      {
        Field: "Extracurricular",
        Value: student.extracurricular ? "Yes" : "No",
      },
      {
        Field: "Predicted Marks",
        Value: student.predicted_marks,
      },
      {
        Field: "Risk Level",
        Value: student.prediction_risk,
      },
    ];

    if (recommendations && recommendations.length > 0) {
      data.push({
        Field: "",
        Value: "",
      });

      data.push({
        Field: "AI Recommendations",
        Value: "",
      });

      recommendations.forEach((item, index) => {
        data.push({
          Field: `Recommendation ${index + 1}`,
          Value: item,
        });
      });
    }

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Student Report"
    );

    XLSX.writeFile(
      workbook,
      `${student.full_name}_Report.xlsx`
    );
  };

  return (
    <button
      onClick={exportExcel}
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
    >
      Export Excel
    </button>
  );
}

export default StudentExcel;
