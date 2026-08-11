function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <h1
        className={`text-4xl font-bold mt-3 ${color}`}
      >
        {value}
      </h1>

      <div className="mt-4 h-1 w-12 rounded-full bg-slate-100">
        <div
          className={`h-1 w-8 rounded-full ${color.replace(
            "text-",
            "bg-"
          )}`}
        />
      </div>

    </div>
  );
}

export default StatCard;
