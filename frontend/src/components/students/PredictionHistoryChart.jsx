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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

function PredictionHistoryChart({ history }) {
  if (!history || history.length === 0) {
    return null;
  }

  const data = {
    labels: history.map((item) => item.date),

    datasets: [
      {
        label: "Predicted Marks",

        data: history.map((item) => item.marks),

        borderColor: "#2563eb",

        backgroundColor: "rgba(37,99,235,0.25)",

        borderWidth: 3,

        fill: true,

        tension: 0.4,

        pointRadius: 5,
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
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-emerald-600 mb-4">
        Prediction History
      </h2>

      <Line data={data} options={options} />
    </div>
  );
}

export default PredictionHistoryChart;
