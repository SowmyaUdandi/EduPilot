import {
  FaUserGraduate,
  FaChartLine,
  FaAward,
  FaExclamationTriangle,
} from "react-icons/fa";

function StatisticsCards({ dashboard }) {
  const cards = [
    {
      title: "Total Students",
      value: dashboard?.total_students || 0,
      icon: <FaUserGraduate />,
      color: "bg-emerald-600",
    },
    {
      title: "Average Marks",
      value: `${dashboard?.average_marks || 0}%`,
      icon: <FaChartLine />,
      color: "bg-green-600",
    },
    {
      title: "High Performers",
      value: dashboard?.high_performers || 0,
      icon: <FaAward />,
      color: "bg-purple-600",
    },
    {
      title: "At Risk Students",
      value: dashboard?.at_risk || 0,
      icon: <FaExclamationTriangle />,
      color: "bg-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center"
        >
          <div>
            <h3 className="text-gray-500 text-sm">
              {card.title}
            </h3>

            <h2 className="text-4xl font-bold mt-2">
              {card.value}
            </h2>
          </div>

          <div
            className={`${card.color} text-white p-4 rounded-full text-3xl`}
          >
            {card.icon}
          </div>
        </div>
      ))}

    </div>
  );
}

export default StatisticsCards;
