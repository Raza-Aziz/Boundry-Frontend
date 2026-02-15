import React from "react";
import { useGetUserQuery } from "./store/api/baseApi";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { data: user, isLoading, isError } = useGetUserQuery();
  const location = useLocation();

  if (isLoading) {
    // TODO: Add a luxury loading spinner component here
    return <div>Luxury Loading Spinner...</div>;
  }

  if (isError || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function AdminRoute({ children }) {
  const { data: user, isLoading, isError } = useGetUserQuery();
  const location = useLocation();

  if (isLoading) {
    // TODO: Add a luxury loading spinner component here
    return <div>Luxury Loading Spinner...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isError || !user.isAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

function PublicRoute({ children }) {
  const { data: user, isLoading } = useGetUserQuery();
  const location = useLocation();

  if (isLoading) {
    // TODO: Add a luxury loading spinner component here
    return <div>Luxury Loading Spinner...</div>;
  }

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // NOTE : isError not needed as ::
  // NOTE : If there is an error (meaning no user is found), that is actually exactly what we want—it means they are allowed to see the login page.

  return children;
}

export default { ProtectedRoute, PublicRoute, AdminRoute };
