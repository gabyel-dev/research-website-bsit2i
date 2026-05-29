import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { researchApi } from "../../services/research.service.js";

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
  const [activeResearcher, setActiveResearcher] = useState<Researcher | null>(
    null,
  );
  const [researches, setResearches] = useState<any[]>([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState("");

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

  useEffect(() => {
    if (!activeResearcher) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeResearcher]);

  const openResearchModal = async (researcher: Researcher) => {
    setActiveResearcher(researcher);
    setModalLoading(true);
    setModalError("");
    try {
      const data = await researchApi.getByAuthorId(researcher.id);
      setResearches(data);
    } catch (err: any) {
      setModalError(err?.message || "Failed to load researches");
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => {
    setActiveResearcher(null);
    setResearches([]);
    setModalError("");
  };

  if (loading) {
    return (
      <section
        id="researchers"
        className="mt-24 mx-auto w-full max-w-7xl px-6 md:px-16"
      >
        <div className="mb-10 animate-pulse">
          <div className="h-4 w-40 rounded bg-white/10 mb-4" />
          <div className="h-8 w-72 rounded bg-white/10 mb-3" />
          <div className="h-4 w-52 rounded bg-white/10" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center animate-pulse"
            >
              <div className="w-20 h-20 rounded-full bg-white/10 mb-3" />

              <div className="h-4 w-20 rounded bg-white/10 mb-2" />

              <div className="h-3 w-14 rounded bg-white/5" />
            </div>
          ))}
        </div>
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

  const modalContent = activeResearcher ? (
    <div
      className="fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={closeModal}
      role="presentation"
    >
      <div
        className="w-full max-w-3xl max-h-[85vh] overflow-y-auto border border-white/10 bg-[#0A0710] px-6 py-8 md:px-10"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-end ">
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close modal"
            className="self-start md:self-auto  px-3 py-2 text-white/70 transition hover:bg-white/10 hover:border-white/30"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="M6 6 18 18" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            {activeResearcher.profile_image_url ? (
              <img
                src={activeResearcher.profile_image_url}
                alt={activeResearcher.full_name}
                className="h-16 w-16 object-cover border border-white/10"
              />
            ) : (
              <div className="h-16 w-16 bg-gradient-to-br from-emerald-500/40 to-emerald-300/10 border border-white/10 flex items-center justify-center text-lg font-semibold text-white">
                {activeResearcher.full_name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h3 className="text-2xl font-bold text-white">
                {activeResearcher.full_name}
              </h3>
              <p className="text-xs uppercase tracking-[0.28em] text-emerald-300/70 font-semibold">
                BSIT 2I
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          {modalLoading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="h-28 border border-white/10 bg-white/5 animate-pulse"
                />
              ))}
            </div>
          ) : modalError ? (
            <p className="text-red-400">Error: {modalError}</p>
          ) : researches.length === 0 ? (
            <p className="text-mist/60">No research uploaded yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {researches.map((research) => (
                <article
                  key={research.id}
                  className="border border-white/10 bg-white/5 p-5"
                >
                  <h4 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                    {research.title}
                  </h4>
                  <p className="text-sm text-mist/70 line-clamp-2">
                    {research.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={research.pdf_url || research.pdf_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="flex-1 inline-flex items-center justify-center gap-2 border border-white/30 bg-emerald-600 px-4 py-3 text-xs font-medium text-white/80 transition hover:emerald-emerald-500/50 hover:bg-emerald-500/10 hover:text-white"
                    >
                      Download PDF
                    </a>
                    <Link
                      to={`/researches?highlight=${research.id}`}
                      className="px-4 py-3 border border-white/30 bg-white/5 text-white/80 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/10 active:scale-95"
                    >
                      View
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <section
        id="researchers"
        className="mt-20 md:24 mx-auto w-full max-w-7xl px-6 md:px-16"
      >
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-emerald-400/80 font-semibold">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            Our Researchers
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white">Students</h2>
          <p className="mt-2 text-sm text-mist/60">
            Meet the researchers contributed
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {researchers.map((researcher) => (
            <button
              key={researcher.id}
              type="button"
              onClick={() => openResearchModal(researcher)}
              className="group flex flex-col items-center text-left"
            >
              <div className="relative mb-3">
                {researcher.profile_image_url ? (
                  <img
                    src={researcher.profile_image_url}
                    alt={researcher.full_name}
                    className="w-20 h-20 rounded-full object-cover ring-emerald-700 ring-2 border-2 border-transparent transition-all"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center ring-2 ring-white/10 group-hover:ring-emerald-500/30 transition-all">
                    <span className="text-2xl font-bold text-emerald-400">
                      {researcher.full_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-sm font-semibold text-white text-center group-hover:text-emerald-300 transition-colors line-clamp-2">
                {researcher.full_name}
              </h3>
            </button>
          ))}
        </div>
      </section>

      {modalContent &&
        (typeof document === "undefined"
          ? null
          : createPortal(modalContent, document.body))}
    </>
  );
};
