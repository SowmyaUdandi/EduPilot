import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AnalyticsCharts({ analytics }) {

  const COLORS = [
    "#22c55e",
    "#facc15",
    "#ef4444",
  ];

  const riskData = [
    {
      name: "Low",
      value: analytics.low_risk,
    },
    {
      name: "Medium",
      value: analytics.medium_risk,
    },
    {
      name: "High",
      value: analytics.high_risk,
    },
  ];

  const barData = analytics.department_marks.map((item) => ({
    department: item.department,
    average: item.marks,
  }));

  const lineData = analytics.department_marks.map((item) => ({
    name: item.department,
    marks: item.marks,
  }));

  return (

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

      {/* Department Average Marks */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-4">
          Department Average Marks
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={barData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="department" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="average"
              fill="#2563eb"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Risk Distribution */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-4">
          Risk Distribution
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <PieChart>

            <Pie
              data={riskData}
              dataKey="value"
              outerRadius={100}
              label
            >

              {riskData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* Department Marks Trend */}

      <div className="bg-white rounded-xl shadow-lg p-6 xl:col-span-2">

        <h2 className="text-xl font-bold mb-4">
          Department Marks Trend
        </h2>

        <ResponsiveContainer width="100%" height={350}>

          <LineChart data={lineData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="marks"
              stroke="#16a34a"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}

export default AnalyticsCharts;
