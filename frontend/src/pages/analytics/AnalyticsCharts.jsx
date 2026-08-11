import { Bar, Pie } from "react-chartjs-2";

function AnalyticsCharts({ analytics }) {
  const performanceData = {
    labels:
      analytics.department_marks?.map((item) => item.department) || [],

    datasets: [
      {
        label: "Average Marks",
        data:
          analytics.department_marks?.map(
            (item) => item.average_marks
          ) || [],
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
        ],
      },
    ],
  };

  const riskData = {
    labels: ["Low", "Medium", "High"],

    datasets: [
      {
        data: [
          analytics.low_risk,
          analytics.medium_risk,
          analytics.high_risk,
        ],

        backgroundColor: [
          "#22C55E",
          "#FACC15",
          "#EF4444",
        ],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          Department Performance
        </h2>

        <Bar data={performanceData} />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          Student Risk Distribution
        </h2>

        <Pie data={riskData} />
      </div>

    </div>
  );
}

export default AnalyticsCharts;
