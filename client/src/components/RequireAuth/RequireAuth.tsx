import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthentication from "../../hook/useAuthentication";

const RequireAuth = () => {
  const { isLoggedIn, isLogin } = useAuthentication();

  return (
    <>
      {isLoggedIn || isLogin ? (
        <Outlet />
      ) : (
        <Navigate to={"/signin"} replace state={{ path: location.pathname }} />
      )}
    </>
  );
};

export default RequireAuth;
