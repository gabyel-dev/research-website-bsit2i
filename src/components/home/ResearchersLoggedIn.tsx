import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

type Researcher = {
  id: string;
  full_name: string;
  profile_image_url?: string;
};

export const ResearchersLoggedIn = () => {
  const [researchers, setResearchers] = useState<Researcher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResearchers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users`);
        setResearchers(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResearchers();
  }, []);

  if (loading) {
    return (
      <section
        id="researchers"
        className="mt-24 mx-auto w-full max-w-7xl px-6 md:px-16"
      >
        <div className="text-center text-mist/60">Loading researchers...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="researchers"
        className="mt-24 mx-auto w-full max-w-7xl px-6 md:px-16"
      >
        <div className="text-center text-red-400">Error: {error}</div>
      </section>
    );
  }

  if (researchers.length === 0) {
    return (
      <section
        id="researchers"
        className="mt-24 mx-auto w-full max-w-7xl px-6 md:px-16"
      >
        <div className="text-center text-mist/60">No researchers yet.</div>
      </section>
    );
  }

  return (
    <section
      id="researchers"
      className="mt-24 mx-auto w-full max-w-7xl px-6 md:px-16"
    >
      <div className="mb-10">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-purple-400/80 font-semibold">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          Our Researchers
        </span>
        <h2 className="mt-3 text-3xl font-bold text-white">BSIT 2I Students</h2>
        <p className="mt-2 text-sm text-mist/60">
          Meet the researchers contributed
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {researchers.map((researcher) => (
          <div key={researcher.id} className="group flex flex-col items-center">
            <div className="relative mb-3">
              {researcher.profile_image_url ? (
                <img
                  src={researcher.profile_image_url}
                  alt={researcher.full_name}
                  className="w-20 h-20 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-purple-500/30 transition-all"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center ring-2 ring-white/10 group-hover:ring-purple-500/30 transition-all">
                  <span className="text-2xl font-bold text-purple-400">
                    {researcher.full_name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h3 className="text-sm font-semibold text-white text-center group-hover:text-purple-300 transition-colors line-clamp-2">
              {researcher.full_name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};
