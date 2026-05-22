import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import { useState } from "react";
import { TopNavLogin } from "../components/layout/TopNavLogin.js";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  return (
    <>
      <TopNavLogin />
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-mist">
        <div className="mx-auto flex max-w-lg flex-col items-center gap-6 px-6 py-24">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-mist/60">
              BSIT Research Hub
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-white">
              Sign in to upload your research
            </h1>
            <p className="mt-3 text-sm text-mist/70">
              Use your Pateros Technological College email to continue.
            </p>
          </div>

          {error && (
            <div className="w-full rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="rounded-2xl  p-6">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  if (credentialResponse.credential) {
                    await login(credentialResponse.credential);
                    navigate("/upload");
                  }
                } catch (err: any) {
                  setError(err.response?.data?.error || "Login failed");
                }
              }}
              onError={() => {
                setError("Google login failed");
              }}
              hosted_domain={`${import.meta.env.VITE_ALLOWED_EMAIL_DOMAIN}`}
            />
          </div>
        </div>
      </div>
    </>
  );
};
