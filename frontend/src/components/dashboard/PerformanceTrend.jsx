import { useEffect, useState } from "react";
import { getPredictionHistory } from "../../services/dashboardService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function PerformanceTrend({ student }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!student?.id) {
      setLoading(false);
      return;
    }

    loadHistory();
  }, [student]);

  const loadHistory = async () => {
    try {
      const response = await getPredictionHistory(student.id);

      if (response.success) {
        setHistory(response.history || []);
      }
    } catch (error) {
      console.error("Performance History Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-7">
        <p className="text-gray-500">
          Loading performance trend...
        </p>
      </div>
    );
  }

  if (!student) {
    return null;
  }

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-7">
        <h2 className="text-2xl font-bold text-gray-800">
          📈 Your Performance Trend
        </h2>

        <p className="text-gray-500 mt-3">
          Complete your first prediction to start tracking your progress.
        </p>
      </div>
    );
  }

  const chartData = {
    labels: history.map((item) => item.date),

    datasets: [
      {
        label: "Predicted Marks",
        data: history.map((item) => item.marks),
        borderColor: "#2563EB",
        backgroundColor: "#2563EB",
        tension: 0.3,
        fill: false,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
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

  const firstMarks = Number(history[0]?.marks || 0);
  const latestMarks = Number(
    history[history.length - 1]?.marks || 0
  );

  const improvement = (
    latestMarks - firstMarks
  ).toFixed(1);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-7">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            📈 Your Performance Trend
          </h2>

          <p className="text-gray-500 mt-1">
            Track how your AI-predicted performance changes over time.
          </p>
        </div>

        <div
          className={`px-4 py-2 rounded-lg font-semibold ${
            improvement > 0
              ? "bg-green-100 text-green-700"
              : improvement < 0
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {improvement > 0
            ? `↑ ${improvement}% improvement`
            : improvement < 0
            ? `↓ ${Math.abs(improvement)}% change`
            : "No change"}
        </div>

      </div>

      <div className="mt-6">
        <Line
          data={chartData}
          options={chartOptions}
        />
      </div>

    </div>
  );
}

export default PerformanceTrend;

