import { useEffect, useState, type FormEvent } from "react";
import { researchApi } from "../services/research.service.js";
import { useAuth } from "../context/AuthContext.js";

import { Footer } from "../components/layout/Footer.js";
import { ResearchCardSkeleton } from "../components/skeletons/ResearchCardSkeleton.js";

import { Link } from "react-router-dom";
import { TopNavViewAll } from "../components/layout/TopNavViewAll.js";
import { IoIosArrowBack } from "react-icons/io";
import { GoTrash } from "react-icons/go";

export const ViewAllResearches = () => {
  const { user } = useAuth();
  const [researches, setResearches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [actionError, setActionError] = useState("");
  const [editing, setEditing] = useState<any | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    summary: "",
    pdf_link: "",
  });
  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchResearches = async () => {
      try {
        const data = await researchApi.getAll();
        setResearches(data);
      } catch (err: any) {
        setFetchError(err.message || "Failed to load researches");
      } finally {
        setLoading(false);
      }
    };

    fetchResearches();
  }, []);

  const openEdit = (research: any) => {
    setEditing(research);
    setEditForm({
      title: research.title || "",
      summary: research.summary || "",
      pdf_link: research.pdf_link || "",
    });
    setActionError("");
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    setSaving(true);
    setActionError("");

    try {
      const updated = await researchApi.update(editing.id, {
        title: editForm.title.trim(),
        summary: editForm.summary.trim(),
        pdf_link: editForm.pdf_link.trim() || undefined,
      });

      setResearches((prev) =>
        prev.map((item) =>
          item.id === updated.id ? { ...item, ...updated } : item,
        ),
      );
      setEditing(null);
    } catch (err: any) {
      setActionError(err?.message || "Failed to update research");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    setActionError("");

    try {
      await researchApi.delete(id);
      setResearches((prev) => prev.filter((item) => item.id !== id));
      setDeleteModal(null);
    } catch (err: any) {
      setActionError(err?.message || "Failed to delete research");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0710] text-mist">
        <TopNavViewAll />
        <main className="pt-24 pb-20 px-6 md:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="h-10 bg-white/10 rounded w-64 mb-3 animate-pulse"></div>
            <div className="h-6 bg-white/10 rounded w-96 mb-10 animate-pulse"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ResearchCardSkeleton />
              <ResearchCardSkeleton />
              <ResearchCardSkeleton />
              <ResearchCardSkeleton />
              <ResearchCardSkeleton />
              <ResearchCardSkeleton />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-[#0A0710] text-mist">
        <TopNavViewAll />
        <div className="pt-24 text-center text-red-400">
          Error: {fetchError}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0710] text-mist">
      <TopNavViewAll />
      <main className="pt-24 pb-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="hidden md:block items-center gap-3 mb-6">
            <IoIosArrowBack className="text-mist/60 hover:text-mist cursor-pointer  transition-colors" />
          </Link>
          <h1 className="text-4xl font-bold text-white mb-3">
            All Research Papers
          </h1>
          <p className="text-mist/60 mb-10">
            Browse all published research from BSIT 2I Students
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {researches.map((research) => (
              <article
                key={research.id}
                className="group flex h-full flex-col justify-between  bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300"
              >
                <div>
                  <h3 className="text-xl font-bold text-emerald-300 transition-colors leading-snug mb-4">
                    {research.title}
                  </h3>

                  <div className="flex items-center gap-3 mb-4">
                    {research.author_profile_image ? (
                      <img
                        src={research.author_profile_image}
                        alt={research.author}
                        className="w-8 h-8 rounded-full ring-2 ring-white/10 object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm ring-2 ring-white/10">
                        {research.author?.charAt(0) || "R"}
                      </div>
                    )}
                    <span className="text-xs text-mist/60 flex flex-col">
                      <p className="text-xs  tracking-[0.2em] text-mist/60">
                        {research.author}
                      </p>
                      <time className="text-[10px] text-mist/50">
                        {new Date(research.upload_date).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </time>
                    </span>
                  </div>

                  <p className="text-[10px] text-mist/70 leading-relaxed line-clamp-4 text-justify">
                    {research.summary}
                  </p>
                </div>

                <div className="mt-6 md:flex flex flex-col gap-2">
                  <a
                    href={research.pdf_url || research.pdf_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2  border border-white/30 bg-emerald-600 px-4 py-3 text-sm font-medium text-white/80 transition hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-white group-hover:scale-[1.02]"
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
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download PDF
                  </a>
                  {user?.id === research.author_id && (
                    <>
                      <div className="flex gap-2  w-full">
                        <button
                          type="button"
                          onClick={() => openEdit(research)}
                          className="inline-flex items-center w-full justify-center gap-2  border border-white/20 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition hover:border-white/40 hover:bg-white/10"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteModal(research.id)}
                          className="inline-flex items-center justify-center border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
                        >
                          <GoTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0A0710] border border-white/10 rounded-2xl p-6 max-w-lg w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-2">
              Update Research
            </h3>
            <p className="text-sm text-mist/60 mb-6">
              Edit your research details below.
            </p>

            {actionError && (
              <div className="mb-4  border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {actionError}
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Title
                </label>
                <input
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  className="w-full  border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-emerald-500/50 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Summary
                </label>
                <textarea
                  value={editForm.summary}
                  onChange={(e) =>
                    setEditForm({ ...editForm, summary: e.target.value })
                  }
                  rows={5}
                  className="w-full  border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-emerald-500/50 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  PDF Link (optional)
                </label>
                <input
                  value={editForm.pdf_link}
                  onChange={(e) =>
                    setEditForm({ ...editForm, pdf_link: e.target.value })
                  }
                  className="w-full  border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-emerald-500/50 focus:outline-none"
                  placeholder="https://example.com/research.pdf"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  disabled={saving}
                  className="flex-1  border border-white/20 px-4 py-2 text-white hover:bg-white/5 transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500 transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0A0710] border border-white/10  p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-3">
              Delete Research?
            </h3>
            <p className="text-mist/70 mb-6">
              Are you sure you want to delete this research? This action cannot
              be undone.
            </p>
            {actionError && (
              <div className="mb-4 border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {actionError}
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal(null)}
                disabled={deleting}
                className="flex-1  border border-white/20 px-4 py-2 text-white hover:bg-white/5 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal)}
                disabled={deleting}
                className="flex-1  bg-red-600 px-4 py-2 text-white hover:bg-red-500 transition disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
