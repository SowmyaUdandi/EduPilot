import { useMemo } from "react";

import GoalCard from "./GoalCard";
import StudyStreak from "./StudyStreak";
import FocusCard from "./FocusCard";
import FocusTimer from "./FocusTimer";
import DailyTasks from "./DailyTasks";
import ProgressAnalytics from "./ProgressAnalytics";

function StudentDashboard({ user, students = [] }) {
  // ==========================================
  // Find Logged-in Student
  // ==========================================

  const student = useMemo(() => {
    if (!user || !students.length) {
      return null;
    }

    return (
      students.find(
        (s) =>
          s.email?.toLowerCase() ===
          user.email?.toLowerCase()
      ) || null
    );
  }, [user, students]);

  // ==========================================
  // Student Data
  // ==========================================

  const predictedMarks =
    Number(student?.predicted_marks) || 0;

  const attendance =
    Number(student?.attendance) || 0;

  const studyHours =
    Number(student?.study_hours) || 0;

  const assignmentScore =
    Number(student?.assignment_score) || 0;

  const previousGpa =
    Number(student?.previous_gpa) || 0;

  const risk =
    student?.prediction_risk || "Not Available";

  // ==========================================
  // EduPilot Performance Score
  // ==========================================

  const performanceScore = Math.min(
    Math.round(
      predictedMarks * 0.5 +
        attendance * 0.2 +
        assignmentScore * 0.15 +
        Math.min(studyHours * 10, 100) * 0.15
    ),
    100
  );

  // ==========================================
  // AI Insight
  // ==========================================

  let aiInsight =
    "Complete your profile and prediction to receive personalized AI insights.";

  if (student) {
    if (risk === "High") {
      aiInsight =
        "Your performance needs attention. Focus on your weakest areas and build a consistent study routine.";
    } else if (risk === "Medium") {
      aiInsight =
        "You're making progress. A little more consistency could significantly improve your academic performance.";
    } else if (predictedMarks >= 85) {
      aiInsight =
        "Excellent work! You're performing strongly. Now focus on consistency, projects and placement preparation.";
    } else {
      aiInsight =
        "You're on the right track. Keep improving your attendance, assignments and daily study consistency.";
    }
  }

  // ==========================================
  // Today's Focus
  // ==========================================

  let todayFocus =
    "Complete your EduPilot profile";

  if (student) {
    if (attendance < 75) {
      todayFocus = "Improve your attendance";
    } else if (studyHours < 3) {
      todayFocus =
        "Study for at least 3 focused hours";
    } else if (assignmentScore < 70) {
      todayFocus =
        "Complete pending assignments";
    } else if (risk === "High") {
      todayFocus =
        "Revise your weakest subject";
    } else {
      todayFocus =
        "Learn something new for your career";
    }
  }

  // ==========================================
  // Risk Styling
  // ==========================================

  const riskColor =
    risk === "Low"
      ? "text-emerald-600"
      : risk === "Medium"
      ? "text-amber-600"
      : risk === "High"
      ? "text-rose-600"
      : "text-slate-400";

  const riskBg =
    risk === "Low"
      ? "bg-emerald-50 border-emerald-100"
      : risk === "Medium"
      ? "bg-amber-50 border-amber-100"
      : risk === "High"
      ? "bg-rose-50 border-rose-100"
      : "bg-slate-50 border-slate-100";

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="space-y-6">

      {/* ==========================================
          WELCOME
      ========================================== */}

      <div>
        <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide">
          Student Dashboard
        </p>

        <h1 className="text-4xl font-bold text-slate-800 mt-2">
          Welcome back, {user?.full_name || "Student"}
        </h1>

        <p className="text-slate-500 text-lg mt-2">
          Your academic journey, powered by AI.
        </p>
      </div>

      {/* ==========================================
          PERFORMANCE OVERVIEW
      ========================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* EduPilot Score */}

        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-slate-500 font-medium">
                🎯 EduPilot Score
              </p>

              <h2 className="text-4xl font-bold text-emerald-600 mt-3">
                {student
                  ? `${performanceScore}%`
                  : "—"}
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                Overall performance
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              🎯
            </div>

          </div>

        </div>

        {/* Predicted Marks */}

        <div className="bg-white rounded-2xl shadow-sm border border-violet-100 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-slate-500 font-medium">
                📈 Predicted Marks
              </p>

              <h2 className="text-4xl font-bold text-violet-600 mt-3">
                {student
                  ? `${predictedMarks.toFixed(1)}%`
                  : "—"}
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                AI prediction
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
              📈
            </div>

          </div>

        </div>

        {/* Attendance */}

        <div className="bg-white rounded-2xl shadow-sm border border-teal-100 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-slate-500 font-medium">
                📅 Attendance
              </p>

              <h2 className="text-4xl font-bold text-teal-600 mt-3">
                {student
                  ? `${attendance.toFixed(1)}%`
                  : "—"}
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                Keep it consistent
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
              📅
            </div>

          </div>

        </div>

        {/* Risk */}

        <div
          className={`rounded-2xl shadow-sm border p-6 ${riskBg} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
        >

          <div className="flex items-start justify-between">

            <div>
              <p className="text-slate-500 font-medium">
                🚦 Risk Level
              </p>

              <h2
                className={`text-3xl font-bold mt-4 ${riskColor}`}
              >
                {risk}
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                Academic risk indicator
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-white/70 flex items-center justify-center text-xl">
              🚦
            </div>

          </div>

        </div>

      </div>

      {/* ==========================================
          TODAY'S FOCUS + AI INSIGHT
      ========================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Today's Focus */}

        <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-2xl shadow-lg p-7">

          <p className="text-emerald-100 font-medium">
            ⚡ Today's Focus
          </p>

          <h2 className="text-2xl font-bold mt-3">
            {todayFocus}
          </h2>

          <p className="text-emerald-100 mt-3">
            One focused improvement every day can
            make a big difference.
          </p>

        </div>

        {/* AI Insight */}

        <div className="bg-white rounded-2xl shadow-sm border border-violet-100 p-7">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
              🤖
            </div>

            <p className="text-violet-600 font-semibold">
              EduPilot AI Insight
            </p>

          </div>

          <p className="text-slate-700 text-lg mt-4 leading-relaxed">
            {aiInsight}
          </p>

        </div>

      </div>

      {/* ==========================================
          ACADEMIC GOAL + STUDY STREAK
      ========================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7 hover:shadow-md transition">

          <div className="flex items-center gap-3 mb-4">

            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              🎯
            </div>

            <div>
              <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">
                Goals
              </p>

              <h2 className="text-lg font-bold text-slate-800">
                Academic Goal
              </h2>
            </div>

          </div>

          <GoalCard
            predictedMarks={predictedMarks}
          />

        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7 hover:shadow-md transition">

          <div className="flex items-center gap-3 mb-4">

            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              🔥
            </div>

            <div>
              <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide">
                Consistency
              </p>

              <h2 className="text-lg font-bold text-slate-800">
                Study Streak
              </h2>
            </div>

          </div>

          <StudyStreak />

        </div>

      </div>

      {/* ==========================================
          TODAY'S STUDY TASKS
      ========================================== */}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7 hover:shadow-md transition">

        <div className="flex items-center gap-3 mb-5">

          <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
            📚
          </div>

          <div>
            <p className="text-xs text-cyan-600 font-semibold uppercase tracking-wide">
              Productivity
            </p>

            <h2 className="text-xl font-bold text-slate-800">
              Today's Study Tasks
            </h2>
          </div>

        </div>

        <DailyTasks student={student} />

      </div>

      {/* ==========================================
          DAILY FOCUS + FOCUS TIMER
      ========================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7 hover:shadow-md transition">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
              ⚡
            </div>

            <div>
              <p className="text-xs text-teal-600 font-semibold uppercase tracking-wide">
                Focus
              </p>

              <h2 className="text-xl font-bold text-slate-800">
                Daily Focus
              </h2>
            </div>

          </div>

          <FocusCard />

        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-7 hover:shadow-md transition">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              ⏱️
            </div>

            <div>
              <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">
                Productivity
              </p>

              <h2 className="text-xl font-bold text-slate-800">
                Focus Timer
              </h2>
            </div>

          </div>

          <FocusTimer />

        </div>

      </div>

      {/* ==========================================
          PROGRESS ANALYTICS
      ========================================== */}

      <div className="bg-white rounded-2xl shadow-sm border border-violet-100 p-7 hover:shadow-md transition">

        <div className="flex items-center gap-3 mb-5">

          <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
            📊
          </div>

          <div>
            <p className="text-xs text-violet-600 font-semibold uppercase tracking-wide">
              Analytics
            </p>

            <h2 className="text-xl font-bold text-slate-800">
              Progress Analytics
            </h2>
          </div>

        </div>

        <ProgressAnalytics
          predictedMarks={predictedMarks}
          attendance={attendance}
          assignmentScore={assignmentScore}
          studyHours={studyHours}
          previousGpa={previousGpa}
        />

      </div>

      {/* ==========================================
          STUDENT SNAPSHOT
      ========================================== */}

      {student && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7">

          <div className="mb-6">

            <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide">
              Academic Overview
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-1">
              Your Snapshot
            </h2>

            <p className="text-slate-500 mt-1">
              A quick look at your current academic habits.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <Snapshot
              title="Study Hours"
              value={`${studyHours.toFixed(1)} hrs/day`}
              icon="📚"
            />

            <Snapshot
              title="Assignments"
              value={`${assignmentScore.toFixed(1)}%`}
              icon="📝"
            />

            <Snapshot
              title="Previous GPA"
              value={previousGpa.toFixed(2)}
              icon="🎓"
            />

          </div>

        </div>
      )}

    </div>
  );
}

// ==========================================
// Snapshot Component
// ==========================================

function Snapshot({ title, value, icon }) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-4 hover:bg-emerald-50 hover:border-emerald-100 transition">

      <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center text-lg">
        {icon}
      </div>

      <div>
        <p className="text-sm text-slate-500">
          {title}
        </p>

        <p className="text-lg font-bold text-slate-800 mt-1">
          {value}
        </p>
      </div>

    </div>
  );
}

export default StudentDashboard;

