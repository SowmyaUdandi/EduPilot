import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportStudentReport = (students) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("EduPilot Student Performance Report", 14, 20);

  // Table
  autoTable(doc, {
    startY: 30,
    head: [[
      "ID",
      "Name",
      "Department",
      "Attendance",
      "Predicted Marks",
    ]],
    body: students.map((student) => [
      student.id,
      student.name,
      student.department,
      `${student.attendance}%`,
      student.predicted_marks,
    ]),
  });

  // Download PDF
  doc.save("EduPilot_Report.pdf");
};

