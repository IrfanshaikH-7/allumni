import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
//   const token = sessionStorage.getItem("api_token");
//   console.log(token);

  if (false) {
    return <Navigate to={"/sign-in"} replace />;
  }
  return <Outlet />;
}
