import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function DashboardCharts({
  dashboard,
  highRiskStudents,
  topPerformers,
}) {
  // ==========================================
  // TOP PERFORMERS BAR CHART
  // ==========================================

  const barData = {
    labels: topPerformers.map(
      (student) => student.full_name
    ),

    datasets: [
      {
        label: "Predicted Marks",

        data: topPerformers.map(
          (student) => student.predicted_marks
        ),

        backgroundColor: "#10B981",

        borderRadius: 8,

        borderSkipped: false,

        barThickness: 32,
      },
    ],
  };

  // ==========================================
  // RISK DISTRIBUTION PIE CHART
  // ==========================================

  const pieData = {
    labels: [
      "Low Risk",
      "Medium Risk",
      "High Risk",
    ],

    datasets: [
      {
        data: [
          dashboard?.low_risk ?? 0,
          dashboard?.medium_risk ?? 0,
          dashboard?.high_risk ?? 0,
        ],

        backgroundColor: [
          "#10B981",
          "#F59E0B",
          "#F43F5E",
        ],

        borderWidth: 3,

        borderColor: "#FFFFFF",

        hoverOffset: 8,
      },
    ],
  };

  // ==========================================
  // BAR CHART OPTIONS
  // ==========================================

  const barOptions = {
    responsive: true,

    maintainAspectRatio: true,

    plugins: {
      legend: {
        display: true,

        labels: {
          usePointStyle: true,

          padding: 20,

          color: "#475569",

          font: {
            size: 13,
          },
        },
      },

      tooltip: {
        backgroundColor: "#0F172A",

        padding: 12,

        cornerRadius: 8,

        displayColors: false,

        callbacks: {
          label: function (context) {
            return ` Predicted Marks: ${context.raw}%`;
          },
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#64748B",

          font: {
            size: 11,
          },
        },
      },

      y: {
        beginAtZero: true,

        max: 100,

        grid: {
          color: "#E2E8F0",
        },

        ticks: {
          color: "#64748B",

          callback: function (value) {
            return `${value}%`;
          },
        },
      },
    },
  };

  // ==========================================
  // PIE CHART OPTIONS
  // ==========================================

  const pieOptions = {
    responsive: true,

    maintainAspectRatio: true,

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          usePointStyle: true,

          padding: 18,

          color: "#475569",

          font: {
            size: 13,
          },
        },
      },

      tooltip: {
        backgroundColor: "#0F172A",

        padding: 12,

        cornerRadius: 8,

        callbacks: {
          label: function (context) {
            const value = context.raw;

            return ` ${context.label}: ${value}`;
          },
        },
      },
    },
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* ======================================
          TOP PERFORMERS
      ====================================== */}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7">

        <div className="mb-6">

          <p className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">
            Performance
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-1">
            Top Performers
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Students with the highest predicted marks
          </p>

        </div>

        {topPerformers.length > 0 ? (

          <Bar
            data={barData}
            options={barOptions}
          />

        ) : (

          <div className="py-12 text-center">

            <p className="text-slate-400">
              No performance data available.
            </p>

          </div>

        )}

      </div>

      {/* ======================================
          RISK DISTRIBUTION
      ====================================== */}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7">

        <div className="mb-6">

          <p className="text-rose-500 text-sm font-semibold uppercase tracking-wide">
            Student Risk
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-1">
            Risk Distribution
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Current academic risk levels
          </p>

        </div>

        {(dashboard?.low_risk ?? 0) +
          (dashboard?.medium_risk ?? 0) +
          (dashboard?.high_risk ?? 0) >
        0 ? (

          <div className="max-w-sm mx-auto">

            <Pie
              data={pieData}
              options={pieOptions}
            />

          </div>

        ) : (

          <div className="py-12 text-center">

            <p className="text-slate-400">
              No risk data available.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default DashboardCharts;
