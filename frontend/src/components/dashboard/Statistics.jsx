import {
  FaUserGraduate,
  FaChartLine,
  FaAward,
  FaExclamationTriangle,
} from "react-icons/fa";

function Statistics({ dashboard }) {

  const statistics = [
    {
      title: "Total Students",
      value: dashboard?.total_students || 0,
      icon: <FaUserGraduate />,
      bg: "bg-emerald-600",
    },

    {
      title: "Average Marks",
      value: `${dashboard?.average_marks || 0}%`,
      icon: <FaChartLine />,
      bg: "bg-green-600",
    },

    {
      title: "High Performers",
      value: dashboard?.high_performers || 0,
      icon: <FaAward />,
      bg: "bg-purple-600",
    },

    {
      title: "At Risk Students",
      value: dashboard?.at_risk || 0,
      icon: <FaExclamationTriangle />,
      bg: "bg-red-600",
    },
  ];


  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      {statistics.map((item, index) => (

        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center"
        >

          <div>

            <p className="text-gray-500 text-sm font-semibold">
              {item.title}
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {item.value}
            </h2>

          </div>


          <div
            className={`${item.bg} text-white rounded-full p-4 text-3xl`}
          >
            {item.icon}
          </div>


        </div>

      ))}

    </div>

  );
}


export default Statistics;
