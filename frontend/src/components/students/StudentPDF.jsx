import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function StudentPDF({ student, recommendations = [] }) {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.setTextColor(0, 102, 204);
    doc.text("EduPilot Student Report", 14, 20);

    // Student Details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    autoTable(doc, {
      startY: 30,
      head: [["Field", "Value"]],
      body: [
        ["Student ID", student.student_id],
        ["Full Name", student.full_name],
        ["Email", student.email],
        ["Department", student.department],
        ["Semester", student.semester],
        ["Attendance", `${student.attendance}%`],
        ["Study Hours", student.study_hours],
        ["Assignment Score", student.assignment_score],
        ["Internal Marks", student.internal_marks],
        ["Previous GPA", student.previous_gpa],
        ["Sleep Hours", student.sleep_hours],
        ["Stress Level", student.stress_level],
        [
          "Extracurricular",
          student.extracurricular ? "Yes" : "No",
        ],
        ["Predicted Marks", student.predicted_marks],
        ["Risk Level", student.prediction_risk],
      ],
    });

    let y = doc.lastAutoTable.finalY + 10;

    // AI Recommendations
    doc.setFontSize(16);
    doc.setTextColor(0, 102, 204);
    doc.text("AI Recommendations", 14, y);

    y += 8;

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);

    if (recommendations.length === 0) {
      doc.text("No recommendations available.", 18, y);
    } else {
      recommendations.forEach((item, index) => {
        doc.text(`${index + 1}. ${item}`, 18, y);
        y += 8;
      });
    }

    y += 10;

    doc.setFontSize(10);
    doc.setTextColor(120);

    doc.text(
      `Generated on: ${new Date().toLocaleString()}`,
      14,
      y
    );

    doc.save(`${student.full_name}_Report.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
    >
      Download PDF
    </button>
  );
}

export default StudentPDF;
