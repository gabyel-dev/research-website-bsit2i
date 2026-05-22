import { useState, useEffect } from "react";
import { researchApi } from "../../services/research.service.js";

import { ResearchCardSkeleton } from "../skeletons/ResearchCardSkeleton.js";

export const ResearchArticles = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return (
      <section
        id="articles"
        className="mt-24 mx-auto w-full max-w-7xl px-6 md:px-16"
      >
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-emerald-400/80 font-semibold">
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
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-emerald-400/80 font-semibold">
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
          className="hidden md:flex items-center gap-2 border border-white/20 bg-white/5 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-white/70 hover:bg-white/10 hover:border-white/30 transition-all"
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
            className="group flex h-full flex-col justify-between  bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300"
          >
            <div>
              <h3 className="text-xl font-bold  text-emerald-300 transition-colors leading-snug mb-4">
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
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm ring-2 ring-white/10">
                    {article.author.charAt(0)}
                  </div>
                )}
                <span className="text-xs text-mist/60 flex flex-col">
                  <p className="text-xs  tracking-[0.2em] text-mist/60">
                    {article.author}
                  </p>
                  <time className="text-[10px] text-mist/50">
                    {new Date(article.upload_date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </span>
              </div>

              <p className="text-[10px] text-mist/70 leading-relaxed text-justify">
                {article.summary}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={article.pdf_url || article.pdf_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2  border border-white/30 bg-emerald-600 px-4 py-3 text-sm font-medium text-white/80 transition hover:emerald-emerald-500/50 hover:bg-emerald-500/10 hover:text-white group-hover:scale-[1.02]"
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
                className="px-4 py-3 border border-white/30 bg-white/5 text-white/80 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all"
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
    </section>
  );
};
