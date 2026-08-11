import { useEffect, useState } from "react";

function StudyStreak() {
  const [streak, setStreak] = useState(0);
  const [completed, setCompleted] = useState(false);

  // ==========================================
  // Load Streak
  // ==========================================

  useEffect(() => {
    const savedStreak = Number(
      localStorage.getItem("edupilot_streak") || 0
    );

    const completedDate = localStorage.getItem(
      "edupilot_challenge_completed"
    );

    const today = new Date().toDateString();

    setStreak(savedStreak);

    setCompleted(completedDate === today);
  }, []);

  // ==========================================
  // Complete Today's Challenge
  // ==========================================

  const completeChallenge = () => {
    if (completed) return;

    const newStreak = streak + 1;
    const today = new Date().toDateString();

    setStreak(newStreak);
    setCompleted(true);

    localStorage.setItem(
      "edupilot_streak",
      newStreak
    );

    localStorage.setItem(
      "edupilot_challenge_completed",
      today
    );
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* ======================================
          Study Streak
      ====================================== */}

      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl shadow-lg p-7">

        <p className="text-orange-100 font-semibold">
          🔥 Study Streak
        </p>

        <h2 className="text-5xl font-bold mt-3">
          {streak} days
        </h2>

        <p className="text-orange-100 mt-2">
          Keep showing up and build your learning habit.
        </p>

        <div className="mt-5 bg-white/20 rounded-xl p-4">

          <p className="text-sm text-orange-100">
            Current streak
          </p>

          <p className="text-2xl font-bold mt-1">
            {streak} 🔥
          </p>

        </div>

      </div>

      {/* ======================================
          Daily Challenge
      ====================================== */}

      <div className="bg-white rounded-2xl shadow-lg p-7 border border-gray-100">

        <p className="text-purple-600 font-semibold">
          ⚡ Today's Challenge
        </p>

        <h2 className="text-xl font-bold text-gray-800 mt-3">
          Complete 3 focused study hours
        </h2>

        <p className="text-gray-500 mt-2">
          Small consistent actions can improve your
          academic performance.
        </p>

        <button
          onClick={completeChallenge}
          disabled={completed}
          className={`mt-5 px-6 py-3 rounded-lg text-white font-semibold transition ${
            completed
              ? "bg-green-600 cursor-default"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {completed
            ? "✓ Challenge Completed"
            : "Complete Challenge"}
        </button>

        {completed && (
          <p className="text-green-600 text-sm font-medium mt-3">
            Great job! Come back tomorrow to continue your streak.
          </p>
        )}

      </div>

    </div>
  );
}

export default StudyStreak;

