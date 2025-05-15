import { useAuth } from "@/app/provider/authProvider";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {

  const { token } = useAuth();


  if (!token) {

    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};