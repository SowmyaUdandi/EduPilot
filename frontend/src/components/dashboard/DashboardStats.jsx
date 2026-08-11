import {
  FaUserGraduate,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaChartLine,
} from "react-icons/fa";

function DashboardStats({ students }) {
  if (!students || students.length === 0) {
    return null;
  }

  const totalStudents = students.length;

  const lowRisk = students.filter(
    (student) => student.prediction_risk === "Low"
  ).length;

  const mediumRisk = students.filter(
    (student) => student.prediction_risk === "Medium"
  ).length;

  const highRisk = students.filter(
    (student) => student.prediction_risk === "High"
  ).length;

  const averageMarks = (
    students.reduce(
      (sum, student) =>
        sum + Number(student.predicted_marks || 0),
      0
    ) / totalStudents
  ).toFixed(2);

  const cards = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: <FaUserGraduate />,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      border: "border-emerald-100",
    },
    {
      title: "Low Risk",
      value: lowRisk,
      icon: <FaCheckCircle />,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      border: "border-green-100",
    },
    {
      title: "Medium Risk",
      value: mediumRisk,
      icon: <FaExclamationTriangle />,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      border: "border-amber-100",
    },
    {
      title: "High Risk",
      value: highRisk,
      icon: <FaTimesCircle />,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
      border: "border-rose-100",
    },
    {
      title: "Average Marks",
      value: `${averageMarks}%`,
      icon: <FaChartLine />,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      border: "border-violet-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">

      {cards.map((card) => (
        <div
          key={card.title}
          className={`bg-white rounded-2xl shadow-sm border ${card.border} p-6
          transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
        >
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-3">
                {card.value}
              </h2>
            </div>

            <div
              className={`w-12 h-12 rounded-xl ${card.iconBg}
              ${card.iconColor}
              flex items-center justify-center text-xl`}
            >
              {card.icon}
            </div>

          </div>
        </div>
      ))}

    </div>
  );
}

export default DashboardStats;
