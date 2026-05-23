import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import Loader from "../components/loader/loader.js";

type PublicRouteProps = {
  children: React.ReactNode;
};

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <Loader />;
  }
  if (user) return <Navigate to="/upload" replace />;
  return <>{children}</>;
};
