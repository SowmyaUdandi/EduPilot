import { Routes, Route, Navigate } from "react-router-dom";

// ==========================================
// Authentication
// ==========================================
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Logout from "./pages/auth/Logout";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";

// ==========================================
// Dashboard
// ==========================================
import Dashboard from "./pages/dashboard/Dashboard";

// ==========================================
// Students
// ==========================================
import Students from "./pages/students/Students";
import AddStudent from "./pages/students/AddStudent";
import EditStudent from "./pages/students/EditStudent";
import StudentView from "./pages/students/StudentView";
import StudentComparison from "./pages/students/StudentComparison";

// ==========================================
// Profile
// ==========================================
import StudentProfile from "./pages/students/StudentProfile";
import ChangePassword from "./pages/profile/ChangePassword";

// ==========================================
// Prediction
// ==========================================
import Prediction from "./pages/prediction/Prediction";

// ==========================================
// Recommendation
// ==========================================
import Recommendation from "./pages/recommendation/Recommendation";

// ==========================================
// History
// ==========================================
import History from "./pages/history/History";

// ==========================================
// Analytics
// ==========================================
import Analytics from "./pages/analytics/Analytics";

// ==========================================
// Export
// ==========================================
import Export from "./pages/export/Export";

// ==========================================
// Chatbot
// ==========================================
import Chatbot from "./pages/chatbot/Chatbot";

// ==========================================
// Role Protection
// ==========================================
import RoleProtectedRoute from "./pages/auth/RoleProtectedRoute";


function App() {
  return (
    <Routes>

      {/* ==========================================
          AUTHENTICATION
      ========================================== */}

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/verify-email/:token"
        element={<VerifyEmail />}
      />


      {/* ==========================================
          DASHBOARD
          Admin + Teacher + Student
      ========================================== */}

      <Route
        path="/dashboard"
        element={
          <RoleProtectedRoute
            roles={["admin", "teacher", "student"]}
          >
            <Dashboard />
          </RoleProtectedRoute>
        }
      />


      {/* ==========================================
          STUDENT MANAGEMENT
      ========================================== */}

      {/* Students List
          Admin + Teacher */}
      <Route
        path="/students"
        element={
          <RoleProtectedRoute
            roles={["admin", "teacher"]}
          >
            <Students />
          </RoleProtectedRoute>
        }
      />


      {/* Add Student
          Admin + Teacher */}
      <Route
        path="/students/add"
        element={
          <RoleProtectedRoute
            roles={["admin", "teacher"]}
          >
            <AddStudent />
          </RoleProtectedRoute>
        }
      />


      {/* View Student
          Admin + Teacher + Student */}
      <Route
        path="/students/view/:id"
        element={
          <RoleProtectedRoute
            roles={["admin", "teacher", "student"]}
          >
            <StudentView />
          </RoleProtectedRoute>
        }
      />


      {/* Edit Student
          Admin + Teacher */}
      <Route
        path="/students/edit/:id"
        element={
          <RoleProtectedRoute
            roles={["admin", "teacher"]}
          >
            <EditStudent />
          </RoleProtectedRoute>
        }
      />


      {/* Student Comparison
          Admin + Teacher */}
      <Route
        path="/students/comparison"
        element={
          <RoleProtectedRoute
            roles={["admin", "teacher"]}
          >
            <StudentComparison />
          </RoleProtectedRoute>
        }
      />


      {/* ==========================================
          STUDENT PROFILE
          Admin + Teacher + Student
      ========================================== */}

      <Route
        path="/students/profile"
        element={
          <RoleProtectedRoute
            roles={["admin", "teacher", "student"]}
          >
            <StudentProfile />
          </RoleProtectedRoute>
        }
      />


      {/* ==========================================
          CHANGE PASSWORD
          Admin + Teacher + Student
      ========================================== */}

      <Route
        path="/change-password"
        element={
          <RoleProtectedRoute
            roles={["admin", "teacher", "student"]}
          >
            <ChangePassword />
          </RoleProtectedRoute>
        }
      />


      {/* ==========================================
          PREDICTION
          Admin + Teacher + Student
      ========================================== */}

      <Route
        path="/prediction"
        element={
          <RoleProtectedRoute
            roles={["admin", "teacher", "student"]}
          >
            <Prediction />
          </RoleProtectedRoute>
        }
      />


      {/* ==========================================
          RECOMMENDATION
          Admin + Teacher + Student
      ========================================== */}

      <Route
        path="/recommendation"
        element={
          <RoleProtectedRoute
            roles={["admin", "teacher", "student"]}
          >
            <Recommendation />
          </RoleProtectedRoute>
        }
      />


      {/* ==========================================
          HISTORY
          Admin + Teacher + Student
      ========================================== */}

      <Route
        path="/history"
        element={
          <RoleProtectedRoute
            roles={["admin", "teacher", "student"]}
          >
            <History />
          </RoleProtectedRoute>
        }
      />


      {/* ==========================================
          ANALYTICS
          Admin ONLY
      ========================================== */}

      <Route
        path="/analytics"
        element={
          <RoleProtectedRoute
            roles={["admin"]}
          >
            <Analytics />
          </RoleProtectedRoute>
        }
      />


      {/* ==========================================
          EXPORT
          Admin ONLY
      ========================================== */}

      <Route
        path="/export"
        element={
          <RoleProtectedRoute
            roles={["admin"]}
          >
            <Export />
          </RoleProtectedRoute>
        }
      />


      {/* ==========================================
          AI CHATBOT
          Admin + Teacher + Student
      ========================================== */}

      <Route
        path="/chatbot"
        element={
          <RoleProtectedRoute
            roles={["admin", "teacher", "student"]}
          >
            <Chatbot />
          </RoleProtectedRoute>
        }
      />


      {/* ==========================================
          LOGOUT
          Admin + Teacher + Student
      ========================================== */}

      <Route
        path="/logout"
        element={
          <RoleProtectedRoute
            roles={["admin", "teacher", "student"]}
          >
            <Logout />
          </RoleProtectedRoute>
        }
      />


      {/* ==========================================
          INVALID URL
      ========================================== */}

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default App;
