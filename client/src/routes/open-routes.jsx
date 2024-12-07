import { Navigate, Outlet } from "react-router-dom";

function OpenRoute() {
  const token = sessionStorage.getItem("api_token");
  console.log(token);
  if (token ) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}

export default OpenRoute;
