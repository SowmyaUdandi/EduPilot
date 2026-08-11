function DashboardCard({
  title,
  value,
  icon,
  color = "bg-emerald-600",
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center">

      {/* Text Section */}
      <div>

        <h3 className="text-gray-500 text-sm font-medium">
          {title}
        </h3>

        <h2 className="text-4xl font-bold mt-2 text-gray-800">
          {value}
        </h2>

      </div>


      {/* Icon Section */}
      <div
        className={`${color} text-white p-4 rounded-full text-3xl`}
      >
        {icon}
      </div>


    </div>
  );
}

export default DashboardCard;
