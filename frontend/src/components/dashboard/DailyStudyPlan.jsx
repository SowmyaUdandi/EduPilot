import { useEffect, useState } from "react";

function DailyStudyPlan({ student }) {
  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(
        "edupilot_ai_study_tasks"
      );

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const tasks = [];

  // ==========================================
  // NO STUDENT DATA
  // ==========================================

  if (!student) {
    return (
      <div className="p-7">
        <p className="text-purple-600 font-semibold">
          🤖 EduPilot AI
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-2">
          Your AI Study Plan
        </h2>

        <p className="text-gray-500 mt-2">
          Complete your profile to receive your personalized
          study plan.
        </p>
      </div>
    );
  }

  // ==========================================
  // STUDENT DATA
  // ==========================================

  const attendance =
    Number(student.attendance) || 0;

  const studyHours =
    Number(student.study_hours) || 0;

  const assignmentScore =
    Number(student.assignment_score) || 0;

  const risk =
    student.prediction_risk || "";

  // ==========================================
  // GENERATE PERSONALIZED AI TASKS
  // ==========================================

  if (attendance < 75) {
    tasks.push({
      id: "attendance",
      time: "20 min",
      title: "Attendance Recovery",
      description:
        "Plan your upcoming classes and maintain regular attendance.",
      icon: "📅",
    });
  }

  if (studyHours < 3) {
    tasks.push({
      id: "study",
      time: "60 min",
      title: "Deep Study Session",
      description:
        "Choose one difficult topic and complete a focused study session.",
      icon: "📚",
    });
  }

  if (assignmentScore < 70) {
    tasks.push({
      id: "assignment",
      time: "45 min",
      title: "Assignment Sprint",
      description:
        "Complete or improve one pending assignment.",
      icon: "📝",
    });
  }

  if (risk === "High") {
    tasks.push({
      id: "revision",
      time: "45 min",
      title: "Weak Topic Revision",
      description:
        "Revise a topic where you need additional practice.",
      icon: "🎯",
    });
  }

  // ==========================================
  // DEFAULT TASK
  // ==========================================

  if (tasks.length === 0) {
    tasks.push({
      id: "career",
      time: "45 min",
      title: "Career Growth Session",
      description:
        "Work on a technical skill, project, or placement preparation.",
      icon: "🚀",
    });
  }

  // ==========================================
  // TOGGLE TASK
  // ==========================================

  const toggleTask = (taskId) => {
    setCompletedTasks((previous) => {
      const updated = previous.includes(taskId)
        ? previous.filter((id) => id !== taskId)
        : [...previous, taskId];

      localStorage.setItem(
        "edupilot_ai_study_tasks",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  // ==========================================
  // PROGRESS
  // ==========================================

  const completedCount = tasks.filter((task) =>
    completedTasks.includes(task.id)
  ).length;

  const progress =
    tasks.length > 0
      ? Math.round(
          (completedCount / tasks.length) * 100
        )
      : 0;

  // ==========================================
  // AI INSIGHT
  // ==========================================

  let insight =
    "These tasks are selected based on your current academic profile.";

  if (progress === 100) {
    insight =
      "Excellent! You completed your personalized AI study plan for today.";
  } else if (risk === "High") {
    insight =
      "EduPilot is prioritizing the areas that need the most attention.";
  } else if (studyHours < 3) {
    insight =
      "Building consistent focused study time can strengthen your academic performance.";
  } else if (attendance < 75) {
    insight =
      "Improving attendance is one of the quickest ways to strengthen your academic consistency.";
  }

  return (
    <div className="p-7">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <p className="text-purple-600 font-semibold">
            🤖 EduPilot AI
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            Your AI Study Plan
          </h2>

          <p className="text-gray-500 mt-1">
            Personalized recommendations based on your
            academic performance.
          </p>

        </div>

        <div className="text-4xl">
          🤖
        </div>

      </div>

      {/* Progress */}

      <div className="mt-6">

        <div className="flex justify-between text-sm mb-2">

          <span className="text-gray-500">
            AI Plan Progress
          </span>

          <span className="font-semibold text-purple-600">
            {completedCount} / {tasks.length}
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">

          <div
            className="bg-purple-600 h-3 rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <p className="text-sm text-gray-500 mt-2">
          {progress}% completed
        </p>

      </div>

      {/* AI Tasks */}

      <div className="mt-7 space-y-4">

        {tasks.map((task) => {

          const completed =
            completedTasks.includes(task.id);

          return (
            <div
              key={task.id}
              className={`border rounded-xl p-4 transition ${
                completed
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >

              <div className="flex items-start gap-4">

                <div className="text-3xl">
                  {task.icon}
                </div>

                <div className="flex-1">

                  <div className="flex items-center justify-between gap-3">

                    <h3
                      className={`font-bold text-lg ${
                        completed
                          ? "text-green-700 line-through"
                          : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </h3>

                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {task.time}
                    </span>

                  </div>

                  <p className="text-gray-500 mt-1">
                    {task.description}
                  </p>

                  <button
                    onClick={() =>
                      toggleTask(task.id)
                    }
                    className={`mt-3 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                      completed
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                  >
                    {completed
                      ? "✓ Completed"
                      : "Mark Complete"}
                  </button>

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* AI Insight */}

      <div className="mt-6 bg-purple-50 rounded-xl p-4">

        <p className="font-semibold text-purple-800">
          🤖 AI Study Insight
        </p>

        <p className="text-gray-600 mt-2 leading-relaxed">
          {insight}
        </p>

      </div>

    </div>
  );
}

export default DailyStudyPlan;

