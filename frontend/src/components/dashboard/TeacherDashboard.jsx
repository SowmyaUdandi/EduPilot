import DashboardStats from "./DashboardStats";
import StatCard from "./StatCard";
import NotificationCard from "./NotificationCard";
import DashboardCharts from "./DashboardCharts";

function TeacherDashboard({
  dashboard,
  students,
  highRiskStudents,
  topPerformers,
}) {
  return (
    <div className="space-y-7">

      {/* ==========================================
          WELCOME
      ========================================== */}

      <div>
        <p className="text-teal-600 font-semibold text-sm uppercase tracking-wide">
          Teacher Dashboard
        </p>

        <h1 className="text-4xl font-bold text-slate-800 mt-2">
          Welcome Teacher
        </h1>

        <p className="text-slate-500 text-lg mt-2">
          Monitor student performance and AI predictions.
        </p>
      </div>

      {/* ==========================================
          QUICK STATS
      ========================================== */}

      <DashboardStats students={students} />

      {/* ==========================================
          OVERVIEW CARDS
      ========================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        <StatCard
          title="Total Students"
          value={dashboard?.total_students ?? 0}
          color="text-emerald-600"
        />

        <StatCard
          title="High Performers"
          value={dashboard?.high_performers ?? 0}
          color="text-teal-600"
        />

        <StatCard
          title="At Risk Students"
          value={dashboard?.at_risk ?? 0}
          color="text-rose-600"
        />

        <StatCard
          title="Average Marks"
          value={`${dashboard?.average_marks ?? 0}%`}
          color="text-violet-600"
        />

      </div>

      {/* ==========================================
          RECENT ACTIVITY
      ========================================== */}

      <div>
        <NotificationCard />
      </div>

      {/* ==========================================
          PERFORMANCE CHARTS
      ========================================== */}

      <DashboardCharts
        dashboard={dashboard}
        highRiskStudents={highRiskStudents}
        topPerformers={topPerformers}
      />

    </div>
  );
}

export default TeacherDashboard;
