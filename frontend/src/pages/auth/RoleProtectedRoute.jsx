import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ children, roles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // User not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const role = (user.role || "").toLowerCase();

  // Role not allowed
  if (!roles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RoleProtectedRoute;
