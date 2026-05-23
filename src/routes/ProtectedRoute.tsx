import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import Loader from "../components/loader/loader.js";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <Loader />;
  }
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};
