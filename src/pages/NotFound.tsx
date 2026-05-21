import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-ink text-mist">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-mist/60">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-mist/70">
          The page you are looking for does not exist yet.
        </p>
        <Link
          to="/"
          className="mt-8 rounded-full border border-white/20 px-6 py-3 text-sm text-white/80 transition hover:border-white/60 hover:text-white"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};
