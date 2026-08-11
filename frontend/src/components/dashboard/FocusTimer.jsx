import { useEffect, useState } from "react";

function FocusTimer() {
  const [mode, setMode] = useState("focus");
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  const [sessions, setSessions] = useState(() => {
    return Number(
      localStorage.getItem("edupilot_focus_sessions") || 0
    );
  });

  // ==========================================
  // TIMER
  // ==========================================

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setSeconds((previous) => {
        if (previous <= 1) {
          setRunning(false);

          if (mode === "focus") {
            setSessions((previousSessions) => {
              const newSessions = previousSessions + 1;

              localStorage.setItem(
                "edupilot_focus_sessions",
                String(newSessions)
              );

              return newSessions;
            });

            setMode("break");

            return 5 * 60;
          }

          setMode("focus");

          return 25 * 60;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running, mode]);

  // ==========================================
  // TIME FORMAT
  // ==========================================

  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");

  const remainingSeconds = (seconds % 60)
    .toString()
    .padStart(2, "0");

  // ==========================================
  // RESET
  // ==========================================

  const resetTimer = () => {
    setRunning(false);
    setMode("focus");
    setSeconds(25 * 60);
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="p-7">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-purple-600 font-semibold">
            Focus Mode
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            Deep Focus Timer
          </h2>

          <p className="text-gray-500 mt-1">
            Use focused sessions to study without distractions.
          </p>

        </div>

        <div className="text-4xl">
          {mode === "focus" ? "📚" : "☕"}
        </div>

      </div>

      {/* Timer */}

      <div className="text-center mt-8">

        <div className="text-6xl font-bold text-gray-800 tracking-wider">
          {minutes}:{remainingSeconds}
        </div>

        <p className="text-gray-500 mt-3">
          {mode === "focus"
            ? "25-minute focus session"
            : "5-minute break"}
        </p>

      </div>

      {/* Controls */}

      <div className="flex justify-center gap-3 mt-7">

        <button
          onClick={() => setRunning((previous) => !previous)}
          className={`px-7 py-3 rounded-xl text-white font-semibold transition ${
            running
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {running ? "Pause" : "Start Focus"}
        </button>

        <button
          onClick={resetTimer}
          className="px-7 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"
        >
          Reset
        </button>

      </div>

      {/* Sessions */}

      <div className="mt-7 bg-purple-50 rounded-xl p-5 text-center">

        <p className="text-gray-500 text-sm">
          Focus Sessions Completed
        </p>

        <p className="text-3xl font-bold text-purple-600 mt-1">
          {sessions}
        </p>

      </div>

      {/* AI Insight */}

      <div className="mt-5 bg-gray-50 rounded-xl p-4">

        <p className="font-semibold text-gray-800">
          EduPilot Focus Tip
        </p>

        <p className="text-gray-600 mt-2">
          {mode === "focus"
            ? "Choose one topic before starting. Avoid switching between tasks during the session."
            : "Take a short break, relax, and return ready for your next focused session."}
        </p>

      </div>

    </div>
  );
}

export default FocusTimer;

