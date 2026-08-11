import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getAnalytics } from "../../services/dashboardService";
import AnalyticsCharts from "../../components/analytics/AnalyticsCharts";

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

function Analytics() {

  const [analytics, setAnalytics] = useState({
    total_students: 0,
    average_marks: 0,
    high_performers: 0,
    at_risk: 0,
    low_risk: 0,
    medium_risk: 0,
    high_risk: 0,
    department_marks: [],
    department_distribution: []
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {

    try {

      const response = await getAnalytics();

      if (response.success) {
        setAnalytics(response);
      }

    } catch (error) {

      console.error("Analytics Error:", error);

    }

  };

  return (

    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-8">
        Analytics Dashboard
      </h1>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500">Total Students</h2>

          <p className="text-4xl font-bold text-emerald-600 mt-2">
            {analytics.total_students}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500">Average Marks</h2>

          <p className="text-4xl font-bold text-green-600 mt-2">
            {analytics.average_marks}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500">High Performers</h2>

          <p className="text-4xl font-bold text-purple-600 mt-2">
            {analytics.high_performers}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500">At Risk</h2>

          <p className="text-4xl font-bold text-red-600 mt-2">
            {analytics.at_risk}
          </p>
        </div>

      </div>

      {/* Risk Summary */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-green-100 rounded-xl p-6 text-center">

          <h2 className="text-lg font-bold text-green-700">
            Low Risk
          </h2>

          <p className="text-4xl font-bold text-green-700 mt-2">
            {analytics.low_risk}
          </p>

        </div>

        <div className="bg-yellow-100 rounded-xl p-6 text-center">

          <h2 className="text-lg font-bold text-yellow-700">
            Medium Risk
          </h2>

          <p className="text-4xl font-bold text-yellow-700 mt-2">
            {analytics.medium_risk}
          </p>

        </div>

        <div className="bg-red-100 rounded-xl p-6 text-center">

          <h2 className="text-lg font-bold text-red-700">
            High Risk
          </h2>

          <p className="text-4xl font-bold text-red-700 mt-2">
            {analytics.high_risk}
          </p>

        </div>

      </div>

      {/* Charts */}

      <AnalyticsCharts analytics={analytics} />

    </DashboardLayout>

  );

}

export default Analytics;
