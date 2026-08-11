import { useState } from "react";

function GoalCard({ predictedMarks = 0 }) {
  // ==========================================
  // Load Saved Goal
  // ==========================================

  const getSavedGoal = () => {
    const savedGoal = localStorage.getItem("edupilot_goal");
    const value = Number(savedGoal);

    if (value >= 1 && value <= 100) {
      return value;
    }

    return 85;
  };

  const [goal, setGoal] = useState(getSavedGoal);
  const [editing, setEditing] = useState(false);
  const [inputGoal, setInputGoal] = useState(getSavedGoal);

  // ==========================================
  // Current AI Prediction
  // ==========================================

  const current = Number(predictedMarks) || 0;

  // ==========================================
  // Goal Progress
  // ==========================================

  const progress =
    goal > 0
      ? Math.min(
          Math.round((current / goal) * 100),
          100
        )
      : 0;

  // ==========================================
  // Gap To Goal
  // ==========================================

  const gap = Math.max(goal - current, 0);

  // ==========================================
  // Save Goal
  // ==========================================

  const handleSave = () => {
    const value = Number(inputGoal);

    if (value >= 1 && value <= 100) {
      setGoal(value);

      localStorage.setItem(
        "edupilot_goal",
        value
      );

      setEditing(false);
    }
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <div>

      {/* ======================================
          Header
      ====================================== */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-emerald-600 font-semibold">
            🎯 My Academic Goal
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            Target: {goal}%
          </h2>

        </div>

        <button
          onClick={() =>
            setEditing(!editing)
          }
          className="text-emerald-600 font-medium hover:text-emerald-800"
        >
          {editing ? "Cancel" : "Edit"}
        </button>

      </div>

      {/* ======================================
          Goal Editor
      ====================================== */}

      {editing && (
        <div className="mt-5 flex gap-3">

          <input
            type="number"
            min="1"
            max="100"
            value={inputGoal}
            onChange={(e) =>
              setInputGoal(e.target.value)
            }
            className="border border-gray-300 rounded-lg px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            onClick={handleSave}
            className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition"
          >
            Save
          </button>

        </div>
      )}

      {/* ======================================
          Goal Statistics
      ====================================== */}

      <div className="grid grid-cols-2 gap-4 mt-6">

        {/* Current Prediction */}

        <div className="bg-emerald-50 rounded-xl p-4">

          <p className="text-gray-500 text-sm">
            Current AI Prediction
          </p>

          <p className="text-3xl font-bold text-emerald-600 mt-1">
            {current.toFixed(1)}%
          </p>

        </div>

        {/* Goal Gap */}

        <div className="bg-purple-50 rounded-xl p-4">

          <p className="text-gray-500 text-sm">
            {gap > 0
              ? "Marks to Goal"
              : "Goal Status"}
          </p>

          <p className="text-3xl font-bold text-purple-600 mt-1">

            {gap > 0
              ? gap.toFixed(1)
              : "🎉"}

          </p>

        </div>

      </div>

      {/* ======================================
          Progress Bar
      ====================================== */}

      <div className="mt-6">

        <div className="flex justify-between text-sm mb-2">

          <span className="text-gray-500">
            Goal Progress
          </span>

          <span className="font-semibold text-emerald-600">
            {progress}%
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">

          <div
            className="bg-emerald-600 h-3 rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* ======================================
          AI Goal Insight
      ====================================== */}

      <div className="mt-6 bg-gray-50 rounded-xl p-4">

        <p className="font-semibold text-gray-800">
          🤖 AI Goal Insight
        </p>

        <p className="text-gray-600 mt-2">

          {current >= goal
            ? "You're already at your target. Keep your consistency strong!"
            : gap <= 5
            ? "You're very close to your goal. A little extra consistency can help."
            : gap <= 10
            ? "You're making good progress. Focus on daily study consistency."
            : "Build a consistent study routine and improve your weaker areas step by step."}

        </p>

      </div>

    </div>
  );
}

export default GoalCard;

