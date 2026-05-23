import { useState, useEffect } from "react";
import axios from "axios";
import { TopNav } from "../components/layout/TopNav.js";
import { Footer } from "../components/layout/Footer.js";
import { AnimatePresence, motion, type Variants } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const MyResearches = () => {
  const [researches, setResearches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const modalOverlay: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const modalPanel: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
    exit: { opacity: 0, y: 10, scale: 0.98, transition: { duration: 0.3 } },
  };

  const fetchMyResearches = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/researches/my`, {
        withCredentials: true,
      });
      setResearches(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyResearches();
  }, []);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      await axios.delete(`${API_URL}/api/researches/${id}`, {
        withCredentials: true,
      });
      setResearches(researches.filter((r) => r.id !== id));
      setDeleteModal(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0710] text-mist">
        <TopNav />
        <div className="pt-24 text-center">Loading...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0710] text-mist">
      <TopNav />
      <main className="pt-24 pb-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={headerVariants}
          >
            <h1 className="text-4xl font-bold text-white mb-3">
              My Research Papers
            </h1>
            <p className="text-mist/60 mb-10">Manage your published research</p>
          </motion.div>

          {researches.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial="hidden"
              animate="visible"
              variants={headerVariants}
            >
              <p className="text-mist/60 mb-6">
                You haven't uploaded any research yet.
              </p>
              <a
                href="/upload"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-500 transition-colors"
              >
                Upload Research
              </a>
            </motion.div>
          ) : (
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              animate="visible"
              variants={gridVariants}
            >
              {researches.map((research) => (
                <motion.article
                  key={research.id}
                  variants={cardVariants}
                  className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur"
                >
                  <div>
                    <h3 className="text-xl font-bold text-white leading-snug mb-4">
                      {research.title}
                    </h3>

                    <p className="text-sm text-mist/70 leading-relaxed line-clamp-3 mb-4">
                      {research.summary}
                    </p>

                    <div className="text-xs text-mist/50">
                      <time>
                        {new Date(research.upload_date).toLocaleDateString()}
                      </time>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-2">
                    <a
                      href={research.pdf_url || research.pdf_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      View
                    </a>
                    <button
                      onClick={() => setDeleteModal(research.id)}
                      className="px-4 py-2 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </main>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalOverlay}
          >
            <motion.div
              className="bg-[#0A0710] border border-white/10 rounded-2xl p-6 max-w-md w-full mx-4"
              variants={modalPanel}
            >
              <h3 className="text-xl font-bold text-white mb-3">
                Delete Research?
              </h3>
              <p className="text-mist/70 mb-6">
                Are you sure you want to delete this research? This action
                cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal(null)}
                  disabled={deleting}
                  className="flex-1 px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteModal)}
                  disabled={deleting}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition-all disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};
