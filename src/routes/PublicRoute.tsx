import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";

type PublicRouteProps = {
  children: React.ReactNode;
};

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user } = useAuth();
  if (user) return <Navigate to="/upload" replace />;
  return <>{children}</>;
};
