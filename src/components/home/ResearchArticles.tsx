import { useState, useEffect, type FormEvent } from "react";
import { researchApi } from "../../services/research.service.js";

import { ResearchCardSkeleton } from "../skeletons/ResearchCardSkeleton.js";

export const ResearchArticles = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
        setArticles(data.slice(0, 3));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResearches();
  }, []);

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

      setArticles((prev) =>
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
      setArticles((prev) => prev.filter((item) => item.id !== id));
      setDeleteModal(null);
    } catch (err: any) {
      setActionError(err?.message || "Failed to delete research");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <section
        id="articles"
        className="mt-24 mx-auto w-full max-w-7xl px-6 md:px-16"
      >
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-purple-400/80 font-semibold">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              Research Articles
            </span>
            <h2 className="mt-3 text-3xl font-bold text-white">
              Featured Papers
            </h2>
            <p className="mt-2 text-sm text-mist/60 max-w-xl">
              Latest research from Students
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResearchCardSkeleton />
          <ResearchCardSkeleton />
          <ResearchCardSkeleton />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="articles"
        className="mt-24 mx-auto w-full max-w-7xl px-6 md:px-16"
      >
        <div className="text-center text-red-400">Error: {error}</div>
      </section>
    );
  }

  if (articles?.length === 0) {
    return (
      <section
        id="articles"
        className="mt-24 mx-auto w-full max-w-7xl px-6 md:px-16"
      >
        <div className="text-center text-mist/60">
          No researches available yet.
        </div>
      </section>
    );
  }

  return (
    <section
      id="articles"
      className="mt-10 mx-auto w-full max-w-7xl px-6 md:px-16"
    >
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-purple-400/80 font-semibold">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            Research Articles
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white">
            Featured Papers
          </h2>
          <p className="mt-2 text-sm text-mist/60 max-w-xl">
            Latest research from Students
          </p>
        </div>
        <a
          href="/researches"
          className="hidden md:flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-white/70 hover:bg-white/10 hover:border-white/30 transition-all"
        >
          View All
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles?.map((article) => (
          <article
            key={article.id}
            className="group flex h-full flex-col justify-between  bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
          >
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors leading-snug mb-4">
                {article.title}
              </h3>

              <div className="flex items-center gap-3 mb-4">
                {article.author_profile_image ? (
                  <img
                    src={article.author_profile_image}
                    alt={article.author}
                    className="w-8 h-8 rounded-full ring-2 ring-white/10 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm ring-2 ring-white/10">
                    {article.author.charAt(0)}
                  </div>
                )}
                <p className="text-xs uppercase tracking-[0.2em] text-mist/60">
                  {article.author}
                </p>
              </div>

              <p className="text-sm text-mist/70 leading-relaxed text-justify">
                {article.summary}
              </p>

              <div className="flex items-center gap-2 mt-4 text-xs text-mist/50">
                <time>
                  {new Date(article.upload_date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={article.pdf_url || article.pdf_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-white group-hover:scale-[1.02]"
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
              <a
                href="/researches"
                className="px-4 py-3 rounded-lg border border-white/30 bg-white/5 text-white/80 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                title="View All"
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#0A0710] border border-white/10 rounded-2xl p-6 max-w-lg w-full">
            <h3 className="text-xl font-bold text-white mb-2">
              Update Research
            </h3>
            <p className="text-sm text-mist/60 mb-6">
              Edit your research details below.
            </p>

            {actionError && (
              <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
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
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none"
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
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none"
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
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none"
                  placeholder="https://example.com/research.pdf"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  disabled={saving}
                  className="flex-1 rounded-lg border border-white/20 px-4 py-2 text-white hover:bg-white/5 transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-500 transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#0A0710] border border-white/10 rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-3">
              Delete Research?
            </h3>
            <p className="text-mist/70 mb-6">
              Are you sure you want to delete this research? This action cannot
              be undone.
            </p>
            {actionError && (
              <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {actionError}
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal(null)}
                disabled={deleting}
                className="flex-1 rounded-lg border border-white/20 px-4 py-2 text-white hover:bg-white/5 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal)}
                disabled={deleting}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500 transition disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
