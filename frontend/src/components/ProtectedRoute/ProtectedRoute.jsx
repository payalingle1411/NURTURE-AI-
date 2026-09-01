import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function normalizeRole(role) {
  return String(role || "")
    .trim()
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\s+/g, " ");
}

function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const location = useLocation();

  // =========================================================
  // GET LOGIN INFORMATION
  // =========================================================

  const userId = localStorage.getItem("userId");
  const storedRole = localStorage.getItem("role");

  const role = normalizeRole(storedRole);

  // =========================================================
  // USER NOT LOGGED IN
  // =========================================================

  if (
    !userId ||
    userId === "null" ||
    userId === "undefined" ||
    !role
  ) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  // =========================================================
  // CHECK ROLE
  // =========================================================

  const normalizedAllowedRoles = allowedRoles.map(
    (allowedRole) => normalizeRole(allowedRole)
  );

  // =========================================================
  // ROLE NOT ALLOWED
  // =========================================================

  if (
    normalizedAllowedRoles.length > 0 &&
    !normalizedAllowedRoles.includes(role)
  ) {
    // -------------------------------------------------------
    // FAMILY MEMBER
    // -------------------------------------------------------

    if (role === "family member") {
      return (
        <Navigate
          to="/family-dashboard"
          replace
        />
      );
    }

    // -------------------------------------------------------
    // MOTHER
    // -------------------------------------------------------

    if (role === "mother") {
      return (
        <Navigate
          to="/dashboard"
          replace
        />
      );
    }

    // -------------------------------------------------------
    // UNKNOWN ROLE
    // -------------------------------------------------------

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // =========================================================
  // ACCESS GRANTED
  // =========================================================

  return children;
}

export default ProtectedRoute;