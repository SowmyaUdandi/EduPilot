import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { getPredictionHistory } from "../../services/dashboardService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

function StudentChart({ student }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (student?.id) {
      loadHistory();
    }
  }, [student]);

  const loadHistory = async () => {
    try {
      const response = await getPredictionHistory(student.id);

      if (response.success) {
        setHistory(response.history);
      }
    } catch (error) {
      console.error("History Error:", error);
    }
  };

  if (!student) return null;

  // Current Performance Chart
  const performanceData = {
    labels: [
      "Attendance",
      "Study Hours",
      "Assignment",
      "Internal",
      "Predicted",
    ],
    datasets: [
      {
        label: student.full_name,
        data: [
          student.attendance,
          student.study_hours * 20,
          student.assignment_score,
          student.internal_marks,
          student.predicted_marks,
        ],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.3)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Prediction History Chart
  const historyData = {
    labels: history.map((item) => item.date),
    datasets: [
      {
        label: "Predicted Marks",
        data: history.map((item) => item.marks),
        borderColor: "#16a34a",
        backgroundColor: "rgba(22,163,74,0.3)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
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
    <>
      {/* Current Performance */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-emerald-600">
          Student Performance Chart
        </h2>

        <Line data={performanceData} options={options} />
      </div>

      {/* Prediction History */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          Prediction History
        </h2>

        <Line data={historyData} options={options} />
      </div>
    </>
  );
}

export default StudentChart;
