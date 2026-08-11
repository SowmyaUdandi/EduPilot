import { useEffect, useState } from "react";

const getDefaultTasks = (student) => {
  const studyHours = Number(student?.study_hours) || 0;
  const attendance = Number(student?.attendance) || 0;
  const assignmentScore =
    Number(student?.assignment_score) || 0;

  return [
    {
      id: 1,
      title:
        studyHours < 3
          ? "Complete 3 focused study hours"
          : "Complete 2 focused study hours",
      completed: false,
    },
    {
      id: 2,
      title:
        assignmentScore < 70
          ? "Complete one pending assignment"
          : "Review and improve one assignment",
      completed: false,
    },
    {
      id: 3,
      title:
        attendance < 75
          ? "Attend your next class regularly"
          : "Revise one weak topic",
      completed: false,
    },
  ];
};

function DailyTasks({ student }) {
  const [tasks, setTasks] = useState(() =>
    getDefaultTasks(student)
  );

  // ==========================================
  // Load Today's Tasks
  // ==========================================

  useEffect(() => {
    const today = new Date().toDateString();

    const savedDate = localStorage.getItem(
      "edupilot_tasks_date"
    );

    const savedTasks = localStorage.getItem(
      "edupilot_daily_tasks"
    );

    if (savedDate === today && savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);

        if (
          Array.isArray(parsedTasks) &&
          parsedTasks.length > 0
        ) {
          setTasks(parsedTasks);
          return;
        }
      } catch (error) {
        console.log("Could not load saved tasks.");
      }
    }

    // New day OR no valid saved tasks
    const newTasks = getDefaultTasks(student);

    setTasks(newTasks);

    localStorage.setItem(
      "edupilot_tasks_date",
      today
    );

    localStorage.setItem(
      "edupilot_daily_tasks",
      JSON.stringify(newTasks)
    );
  }, [student]);

  // ==========================================
  // Toggle Task
  // ==========================================

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
          }
        : task
    );

    setTasks(updatedTasks);

    localStorage.setItem(
      "edupilot_daily_tasks",
      JSON.stringify(updatedTasks)
    );

    localStorage.setItem(
      "edupilot_tasks_date",
      new Date().toDateString()
    );
  };

  // ==========================================
  // Statistics
  // ==========================================

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const totalTasks = tasks.length;

  const progress =
    totalTasks > 0
      ? Math.round(
          (completedTasks / totalTasks) * 100
        )
      : 0;

  // ==========================================
  // Render
  // ==========================================

  return (
    <div>
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <p className="text-emerald-600 font-semibold">
            Today's Tasks
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            Small steps. Better results.
          </h2>

          <p className="text-gray-500 mt-1">
            Complete these simple actions to stay consistent.
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-emerald-600">
            {completedTasks}/{totalTasks}
          </p>

          <p className="text-xs text-gray-500">
            completed
          </p>
        </div>
      </div>

      {/* Progress */}

      <div className="mt-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">
            Today's Progress
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

      {/* Tasks */}

      <div className="mt-6 space-y-3">
        {tasks.map((task) => (
          <button
            key={task.id}
            type="button"
            onClick={() => toggleTask(task.id)}
            className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border transition ${
              task.completed
                ? "bg-green-50 border-green-200"
                : "bg-gray-50 border-gray-200 hover:bg-emerald-50"
            }`}
          >
            {/* Checkbox */}

            <span
              className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                task.completed
                  ? "bg-green-600 border-green-600 text-white"
                  : "border-gray-400"
              }`}
            >
              {task.completed ? "✓" : ""}
            </span>

            {/* Task */}

            <span
              className={`font-medium ${
                task.completed
                  ? "text-green-700 line-through"
                  : "text-gray-700"
              }`}
            >
              {task.title}
            </span>
          </button>
        ))}
      </div>

      {/* Completion Message */}

      {progress === 100 && totalTasks > 0 && (
        <div className="mt-5 bg-green-100 text-green-700 rounded-xl p-4 font-semibold">
          Great job! You completed today's tasks.
        </div>
      )}
    </div>
  );
}

export default DailyTasks;

