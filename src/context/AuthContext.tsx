import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { api } from "../services/research.service";

/* const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; */

type AuthUser = {
  id: string;
  name: string;
  email: string;
  profile_image_url?: string;
};

type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/auth/me`);
        setUser(response.data.user);
      } catch (error) {
        // Try to refresh session
        try {
          const refreshResponse = await api.post(`/api/auth/refresh`, {});
          setUser(refreshResponse.data.user);
        } catch (refreshError) {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    // Set up auto-refresh every 4 minutes (before 5-minute expiry)
    if (!user) return;

    const refreshInterval = setInterval(
      async () => {
        try {
          const response = await api.post(
            `/api/auth/refresh`,
            {},
            { withCredentials: true },
          );
          setUser(response.data.user);
        } catch (error) {
          console.error("Session refresh failed:", error);
          setUser(null);
        }
      },
      4 * 60 * 1000,
    ); // 4 minutes

    return () => clearInterval(refreshInterval);
  }, [user?.id]);

  const login = async (token: string) => {
    try {
      const response = await api.post(`/api/auth/google`, { token });
      setUser(response.data.user);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post(`/api/auth/logout`);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = useMemo(
    () => ({ user, loading, login, logout }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
