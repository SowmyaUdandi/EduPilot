import { useMemo } from "react";

function ProgressAnalytics({
  predictedMarks = 0,
  attendance = 0,
  assignmentScore = 0,
  studyHours = 0,
  previousGpa = 0,
}) {
  const currentMarks =
    Number(predictedMarks) || 0;

  const currentAttendance =
    Number(attendance) || 0;

  const currentAssignmentScore =
    Number(assignmentScore) || 0;

  const currentStudyHours =
    Number(studyHours) || 0;

  const currentPreviousGpa =
    Number(previousGpa) || 0;

  // ==========================================
  // Previous Performance Estimate
  // ==========================================

  const estimatedPreviousPerformance =
    Math.min(currentPreviousGpa * 10, 100);

  // ==========================================
  // Improvement
  // ==========================================

  const improvement = useMemo(() => {
    return (
      currentMarks -
      estimatedPreviousPerformance
    ).toFixed(1);
  }, [
    currentMarks,
    estimatedPreviousPerformance,
  ]);

  // ==========================================
  // Study Performance Level
  // ==========================================

  let performanceLevel = "Needs Improvement";

  if (currentMarks >= 85) {
    performanceLevel = "Excellent";
  } else if (currentMarks >= 70) {
    performanceLevel = "Good";
  } else if (currentMarks >= 50) {
    performanceLevel = "Developing";
  }

  // ==========================================
  // AI Insight
  // ==========================================

  let insight =
    "Keep building consistency across your academic habits.";

  if (currentAttendance < 75) {
    insight =
      "Attendance is currently your biggest improvement area. Try to maintain regular class participation.";
  } else if (currentAssignmentScore < 70) {
    insight =
      "Your assignment performance can improve. Completing assignments consistently can strengthen your overall performance.";
  } else if (currentStudyHours < 3) {
    insight =
      "Increasing your focused study time could help you strengthen your academic performance.";
  } else if (currentMarks >= 85) {
    insight =
      "Your performance is strong. Focus on maintaining consistency while building projects and placement skills.";
  } else if (Number(improvement) > 0) {
    insight =
      "Your current predicted performance is above your previous GPA-based performance. Keep maintaining this progress.";
  }

  return (
    <div className="p-7">

      {/* ======================================
          Header
      ====================================== */}

      <div>
        <p className="text-emerald-600 font-semibold">
          📊 Personal Progress Analytics
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-2">
          Understand your academic progress
        </h2>

        <p className="text-gray-500 mt-1">
          A quick view of the factors influencing
          your current performance.
        </p>
      </div>

      {/* ======================================
          Performance Level
      ====================================== */}

      <div className="mt-6 bg-gray-50 rounded-xl p-5">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-gray-500 text-sm">
              Current Performance
            </p>

            <p className="text-2xl font-bold text-gray-800 mt-1">
              {performanceLevel}
            </p>
          </div>

          <div className="text-4xl">
            {currentMarks >= 85
              ? "🚀"
              : currentMarks >= 70
              ? "📈"
              : "🎯"}
          </div>

        </div>

      </div>

      {/* ======================================
          Metrics
      ====================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">

        {/* Predicted Marks */}

        <div className="bg-green-50 rounded-xl p-5">

          <p className="text-gray-500 text-sm">
            AI Predicted Marks
          </p>

          <p className="text-3xl font-bold text-green-600 mt-2">
            {currentMarks.toFixed(1)}%
          </p>

        </div>

        {/* Attendance */}

        <div className="bg-purple-50 rounded-xl p-5">

          <p className="text-gray-500 text-sm">
            Attendance
          </p>

          <p className="text-3xl font-bold text-purple-600 mt-2">
            {currentAttendance.toFixed(1)}%
          </p>

        </div>

        {/* Assignment */}

        <div className="bg-emerald-50 rounded-xl p-5">

          <p className="text-gray-500 text-sm">
            Assignment Score
          </p>

          <p className="text-3xl font-bold text-emerald-600 mt-2">
            {currentAssignmentScore.toFixed(1)}%
          </p>

        </div>

        {/* Study Hours */}

        <div className="bg-orange-50 rounded-xl p-5">

          <p className="text-gray-500 text-sm">
            Study Hours
          </p>

          <p className="text-3xl font-bold text-orange-600 mt-2">
            {currentStudyHours.toFixed(1)}h
          </p>

        </div>

      </div>

      {/* ======================================
          Previous GPA Comparison
      ====================================== */}

      <div className="mt-6 bg-gray-50 rounded-xl p-5">

        <p className="font-semibold text-gray-800">
          📈 Performance Comparison
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

          <div>
            <p className="text-sm text-gray-500">
              Previous GPA
            </p>

            <p className="text-xl font-bold text-gray-800 mt-1">
              {currentPreviousGpa || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Previous Performance Estimate
            </p>

            <p className="text-xl font-bold text-gray-800 mt-1">
              {estimatedPreviousPerformance.toFixed(1)}%
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Change
            </p>

            <p
              className={`text-xl font-bold mt-1 ${
                Number(improvement) > 0
                  ? "text-green-600"
                  : Number(improvement) < 0
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {Number(improvement) > 0
                ? `+${improvement}%`
                : `${improvement}%`}
            </p>
          </div>

        </div>

      </div>

      {/* ======================================
          AI Insight
      ====================================== */}

      <div className="mt-6 bg-emerald-50 rounded-xl p-5">

        <p className="font-semibold text-emerald-800">
          🤖 EduPilot AI Insight
        </p>

        <p className="text-gray-600 mt-2 leading-relaxed">
          {insight}
        </p>

      </div>

    </div>
  );
}

export default ProgressAnalytics;

