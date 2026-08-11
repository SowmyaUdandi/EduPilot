import { useEffect, useState } from "react";

function FocusCard({ student }) {
  const [target, setTarget] = useState(3);
  const [completed, setCompleted] = useState(0);

  const [editing, setEditing] = useState(false);
  const [inputTarget, setInputTarget] = useState(3);

  // ==========================================
  // Load Today's Focus Goal
  // ==========================================

  useEffect(() => {
    try {
      const today = new Date().toDateString();

      const savedDate =
        localStorage.getItem("edupilot_focus_goal_date");

      const savedTarget = Number(
        localStorage.getItem("edupilot_focus_goal_target") || 3
      );

      const savedCompleted = Number(
        localStorage.getItem("edupilot_focus_goal_completed") || 0
      );

      setTarget(savedTarget);
      setInputTarget(savedTarget);

      // New day → reset completed focus hours
      if (savedDate !== today) {
        localStorage.setItem(
          "edupilot_focus_goal_date",
          today
        );

        localStorage.setItem(
          "edupilot_focus_goal_completed",
          "0"
        );

        setCompleted(0);
      } else {
        setCompleted(
          Math.min(savedCompleted, savedTarget)
        );
      }
    } catch (error) {
      console.error(
        "Focus Goal Error:",
        error
      );
    }
  }, []);

  // ==========================================
  // Student Data
  // ==========================================

  const studyHours =
    Number(student?.study_hours) || 0;

  const predictedMarks =
    Number(student?.predicted_marks) || 0;

  const risk =
    student?.prediction_risk || "";

  // ==========================================
  // Complete One Focus Hour
  // ==========================================

  const addFocusHour = () => {
    if (completed >= target) {
      return;
    }

    const newCompleted = Math.min(
      completed + 1,
      target
    );

    setCompleted(newCompleted);

    localStorage.setItem(
      "edupilot_focus_goal_completed",
      String(newCompleted)
    );

    localStorage.setItem(
      "edupilot_focus_goal_date",
      new Date().toDateString()
    );
  };

  // ==========================================
  // Save Target
  // ==========================================

  const saveTarget = () => {
    const value = Number(inputTarget);

    if (!Number.isFinite(value)) {
      return;
    }

    if (value < 1 || value > 12) {
      return;
    }

    setTarget(value);

    localStorage.setItem(
      "edupilot_focus_goal_target",
      String(value)
    );

    const adjustedCompleted =
      Math.min(completed, value);

    setCompleted(adjustedCompleted);

    localStorage.setItem(
      "edupilot_focus_goal_completed",
      String(adjustedCompleted)
    );

    localStorage.setItem(
      "edupilot_focus_goal_date",
      new Date().toDateString()
    );

    setEditing(false);
  };

  // ==========================================
  // Progress
  // ==========================================

  const progress =
    target > 0
      ? Math.round(
          (completed / target) * 100
        )
      : 0;

  const remaining = Math.max(
    target - completed,
    0
  );

  // ==========================================
  // AI Focus Recommendation
  // ==========================================

  let recommendation =
    "Choose one important academic task and give it your full attention.";

  if (risk === "High") {
    recommendation =
      "Your focus goal should prioritize your weakest academic area.";
  } else if (studyHours < 3) {
    recommendation =
      "Start with shorter focused sessions and gradually build your study habit.";
  } else if (predictedMarks >= 85) {
    recommendation =
      "Your performance is strong. Use focused time to build projects and career skills.";
  } else if (progress >= 75) {
    recommendation =
      "You're close to your daily goal. Finish your remaining focus time with one important task.";
  }

  return (
    <div className="p-7">

      {/* ======================================
          Header
      ====================================== */}

      <div className="flex items-start justify-between">

        <div>
          <p className="text-emerald-600 font-semibold">
            🎯 Daily Focus Goal
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            Build Your Focus Habit
          </h2>

          <p className="text-gray-500 mt-1">
            Set a daily target and track your focused
            study time.
          </p>
        </div>

        <button
          onClick={() => setEditing(!editing)}
          className="text-emerald-600 font-medium hover:text-emerald-800"
        >
          {editing ? "Cancel" : "Edit Goal"}
        </button>

      </div>

      {/* ======================================
          Goal Editor
      ====================================== */}

      {editing && (
        <div className="mt-5 bg-emerald-50 rounded-xl p-4">

          <p className="text-sm text-gray-600 mb-3">
            Set your daily focus target
          </p>

          <div className="flex gap-3">

            <input
              type="number"
              min="1"
              max="12"
              value={inputTarget}
              onChange={(e) =>
                setInputTarget(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <button
              onClick={saveTarget}
              className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-emerald-700"
            >
              Save
            </button>

          </div>

          <p className="text-xs text-gray-500 mt-2">
            Choose between 1 and 12 focused hours.
          </p>

        </div>
      )}

      {/* ======================================
          Today's Goal
      ====================================== */}

      <div className="mt-6 bg-emerald-50 rounded-2xl p-5">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-gray-500 text-sm">
              Today's Focus Goal
            </p>

            <p className="text-4xl font-bold text-emerald-600 mt-1">
              {completed} / {target} hrs
            </p>
          </div>

          <div className="text-4xl">
            {progress === 100 ? "🏆" : "🎯"}
          </div>

        </div>

        {/* Progress */}

        <div className="w-full bg-white rounded-full h-3 mt-5">

          <div
            className="bg-emerald-600 h-3 rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <div className="flex justify-between mt-2">

          <p className="text-sm text-gray-500">
            {progress}% completed
          </p>

          <p className="text-sm font-medium text-emerald-600">
            {remaining > 0
              ? `${remaining}h remaining`
              : "Goal completed"}
          </p>

        </div>

      </div>

      {/* ======================================
          Quick Statistics
      ====================================== */}

      <div className="grid grid-cols-2 gap-4 mt-5">

        <div className="bg-green-50 rounded-xl p-4">

          <p className="text-gray-500 text-sm">
            Completed Today
          </p>

          <p className="text-3xl font-bold text-green-600 mt-1">
            {completed}h
          </p>

        </div>

        <div className="bg-purple-50 rounded-xl p-4">

          <p className="text-gray-500 text-sm">
            Daily Target
          </p>

          <p className="text-3xl font-bold text-purple-600 mt-1">
            {target}h
          </p>

        </div>

      </div>

      {/* ======================================
          Manual Completion
      ====================================== */}

      <button
        onClick={addFocusHour}
        disabled={completed >= target}
        className={`mt-5 w-full py-3 rounded-xl text-white font-semibold transition ${
          completed >= target
            ? "bg-green-600 cursor-default"
            : "bg-emerald-600 hover:bg-emerald-700"
        }`}
      >
        {completed >= target
          ? "✓ Daily Goal Completed"
          : "+ Log 1 Focus Hour"}
      </button>

      {/* ======================================
          AI Recommendation
      ====================================== */}

      <div className="mt-5 bg-gray-50 rounded-xl p-4">

        <p className="font-semibold text-gray-800">
          🤖 Focus Recommendation
        </p>

        <p className="text-gray-600 mt-2 leading-relaxed">
          {recommendation}
        </p>

      </div>

      {/* ======================================
          Timer Hint
      ====================================== */}

      <div className="mt-4 text-center">

        <p className="text-sm text-gray-400">
          Use the Focus Timer beside this card to
          complete a focused session.
        </p>

      </div>

    </div>
  );
}

export default FocusCard;

