import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isLoggedIn, children, allowedRoles = [] }) {
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  // Prevent double alert
  const alertShown = sessionStorage.getItem("alertShown");

  const showAlertOnce = (msg) => {
    if (!alertShown) {
      alert(msg);
      sessionStorage.setItem("alertShown", "true");

      // Clear alert flag after 500ms so it doesn't block future routes
      setTimeout(() => {
        sessionStorage.removeItem("alertShown");
      }, 500);
    }
  };

  // Not logged in → show alert + redirect
  if (!userId) {
    showAlertOnce("Access denied! Please login.");
    return <Navigate to="/" replace />;
  }

  // Wrong role → show alert + redirect
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    showAlertOnce("Access denied! You do not have permission.");
    return <Navigate to="/" replace />;
  }

 if (!isLoggedIn) {
    return <Navigate to="/adminDashboard/login" replace />;
  }
  return children;
}
