import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || {};

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const isAdminRoute =
    window.location.pathname.startsWith("/dashboard") ||
    window.location.pathname.startsWith("/events") ||
    window.location.pathname.startsWith("/create-category") ||
    window.location.pathname.startsWith("/category-views") ||
    window.location.pathname.startsWith("/edit-category") ||
    window.location.pathname.startsWith("/create-event-registrations") ||
    window.location.pathname.startsWith("/views-event-registrations") ||
    window.location.pathname.startsWith("/edit-event-registrations") ||
    window.location.pathname.startsWith("/create-participatein") ||
    window.location.pathname.startsWith("/view-participatein") ||
    window.location.pathname.startsWith("/edit-participatein");

  if (isAdminRoute && user.isAdmin !== 1) {
    return <Navigate to="/user/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
