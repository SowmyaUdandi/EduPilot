import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import AdminDashboard from "../../components/dashboard/AdminDashboard";
import TeacherDashboard from "../../components/dashboard/TeacherDashboard";
import StudentDashboard from "../../components/dashboard/StudentDashboard";

import {
  getStudents,
  getDashboard,
  getHighRiskStudents,
  getTopPerformers,
} from "../../services/dashboardService";


function Dashboard() {

  // ==========================================
  // Logged-in User
  // ==========================================

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const role = (
    user?.role || ""
  ).toLowerCase();


  // ==========================================
  // State
  // ==========================================

  const [students, setStudents] = useState([]);

  const [highRiskStudents, setHighRiskStudents] = useState([]);

  const [topPerformers, setTopPerformers] = useState([]);

  const [loading, setLoading] = useState(true);


  // ==========================================
  // Dashboard Statistics
  // ==========================================

  const [dashboard, setDashboard] = useState({

    total_students: 0,

    low_risk: 0,

    medium_risk: 0,

    high_risk: 0,

    average_marks: 0,

    high_performers: 0,

    at_risk: 0,

  });


  // ==========================================
  // Load Dashboard Data
  // ==========================================

  useEffect(() => {

    loadData();

  }, []);


  const loadData = async () => {

    try {

      setLoading(true);


      // --------------------------------------
      // Get Students + Dashboard
      // --------------------------------------

      const [
        studentsResponse,
        dashboardResponse,
      ] = await Promise.all([

        getStudents(),

        getDashboard(),

      ]);


      // --------------------------------------
      // Students
      // --------------------------------------

      if (
        studentsResponse &&
        studentsResponse.success
      ) {

        setStudents(
          studentsResponse.students || []
        );

      } else {

        setStudents([]);

      }


      // --------------------------------------
      // Dashboard Statistics
      // --------------------------------------

      if (
        dashboardResponse &&
        dashboardResponse.success
      ) {

        setDashboard({

          total_students:
            dashboardResponse.total_students ?? 0,

          low_risk:
            dashboardResponse.low_risk ?? 0,

          medium_risk:
            dashboardResponse.medium_risk ?? 0,

          high_risk:
            dashboardResponse.high_risk ?? 0,

          average_marks:
            dashboardResponse.average_marks ?? 0,

          high_performers:
            dashboardResponse.high_performers ?? 0,

          at_risk:
            dashboardResponse.at_risk ?? 0,

        });

      }


      // --------------------------------------
      // High Risk Students
      // --------------------------------------

      const risk =
        await getHighRiskStudents();

      setHighRiskStudents(
        risk || []
      );


      // --------------------------------------
      // Top Performers
      // --------------------------------------

      const top =
        await getTopPerformers();

      setTopPerformers(
        top || []
      );


    } catch (error) {

      console.error(
        "Dashboard Error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // Loading Screen
  // ==========================================

  if (loading) {

    return (

      <DashboardLayout>

        <LoadingSpinner />

      </DashboardLayout>

    );

  }


  // ==========================================
  // Dashboard
  // ==========================================

  return (

    <DashboardLayout>


      {/* ======================================
          ADMIN DASHBOARD
      ====================================== */}

      {role === "admin" && (

        <AdminDashboard

          dashboard={dashboard}

          students={students}

          highRiskStudents={highRiskStudents}

          topPerformers={topPerformers}

        />

      )}


      {/* ======================================
          TEACHER DASHBOARD
      ====================================== */}

      {role === "teacher" && (

        <TeacherDashboard

          dashboard={dashboard}

          students={students}

          highRiskStudents={highRiskStudents}

          topPerformers={topPerformers}

        />

      )}


      {/* ======================================
          STUDENT DASHBOARD
      ====================================== */}

      {role === "student" && (

        <StudentDashboard
  user={user}
  students={students}
/>

      )}


      {/* ======================================
          INVALID ROLE
      ====================================== */}

      {![
        "admin",
        "teacher",
        "student",
      ].includes(role) && (

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">

          <h1 className="text-2xl font-bold text-red-600">

            Invalid User Role

          </h1>

          <p className="text-gray-600 mt-3">

            Your account does not have a valid dashboard role.

          </p>

        </div>

      )}

    </DashboardLayout>

  );

}


export default Dashboard;
