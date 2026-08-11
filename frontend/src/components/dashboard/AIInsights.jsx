function AIInsights({ students = [] }) {
  const total = students.length;

  const highRisk = students.filter(
    (s) => s.prediction_risk === "High"
  ).length;

  const mediumRisk = students.filter(
    (s) => s.prediction_risk === "Medium"
  ).length;

  const lowRisk = students.filter(
    (s) => s.prediction_risk === "Low"
  ).length;

  const average =
    total > 0
      ? (
          students.reduce(
            (sum, s) =>
              sum + Number(s.predicted_marks || 0),
            0
          ) / total
        ).toFixed(2)
      : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="flex items-center gap-3 mb-6">

        <div className="w-11 h-11 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center text-xl">
          🤖
        </div>

        <div>
          <p className="text-violet-600 text-sm font-semibold uppercase tracking-wide">
            Artificial Intelligence
          </p>

          <h2 className="text-2xl font-bold text-slate-800">
            AI Insights
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Intelligent overview of student performance
          </p>
        </div>

      </div>

      {/* ==========================================
          INSIGHT CARDS
      ========================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Average Prediction */}

        <div className="bg-violet-50 border border-violet-100 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <p className="font-semibold text-violet-700">
              Average Prediction
            </p>

            <span className="text-xl">
              📈
            </span>

          </div>

          <p className="text-3xl font-bold text-violet-700 mt-3">
            {average}%
          </p>

          <p className="text-sm text-violet-600 mt-1">
            Overall predicted performance
          </p>

        </div>

        {/* Low Risk */}

        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <p className="font-semibold text-emerald-700">
              Low Risk
            </p>

            <span className="text-xl">
              ✓
            </span>

          </div>

          <p className="text-3xl font-bold text-emerald-700 mt-3">
            {lowRisk}
          </p>

          <p className="text-sm text-emerald-600 mt-1">
            Students performing well
          </p>

        </div>

        {/* Medium Risk */}

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <p className="font-semibold text-amber-700">
              Medium Risk
            </p>

            <span className="text-xl">
              !
            </span>

          </div>

          <p className="text-3xl font-bold text-amber-700 mt-3">
            {mediumRisk}
          </p>

          <p className="text-sm text-amber-600 mt-1">
            Students needing attention
          </p>

        </div>

        {/* High Risk */}

        <div className="bg-rose-50 border border-rose-100 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <p className="font-semibold text-rose-700">
              High Risk
            </p>

            <span className="text-xl">
              ⚠
            </span>

          </div>

          <p className="text-3xl font-bold text-rose-700 mt-3">
            {highRisk}
          </p>

          <p className="text-sm text-rose-600 mt-1">
            Students needing support
          </p>

        </div>

      </div>

    </div>
  );
}

export default AIInsights;

