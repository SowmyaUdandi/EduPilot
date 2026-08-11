import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

function ComparisonChart({ student1, student2 }) {
  if (!student1 || !student2) return null;

  const data = {
    labels: [
      "Attendance",
      "Study Hours",
      "Assignment",
      "Internal",
      "Predicted Marks",
    ],
    datasets: [
      {
        label: student1.full_name,
        data: [
          student1.attendance,
          student1.study_hours * 20,
          student1.assignment_score,
          student1.internal_marks,
          student1.predicted_marks,
        ],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.2)",
        borderWidth: 3,
        tension: 0.4,
      },
      {
        label: student2.full_name,
        data: [
          student2.attendance,
          student2.study_hours * 20,
          student2.assignment_score,
          student2.internal_marks,
          student2.predicted_marks,
        ],
        borderColor: "#dc2626",
        backgroundColor: "rgba(220,38,38,0.2)",
        borderWidth: 3,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-emerald-600 mb-6">
        Student Comparison Chart
      </h2>

      <Line data={data} options={options} />
    </div>
  );
}

export default ComparisonChart;
