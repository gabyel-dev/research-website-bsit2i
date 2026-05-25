import { Link } from "react-router-dom";

export const CallToAction = () => {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 md:px-16 mb-20">
      <div className="relative overflow-hidden px-1 py-5 sm:text-center  sm:px-16 md:py-20 lg:px-24">
        <div className="relative z-10 flex flex-col sm:items-center">
          <span className="inline-flex sm:items-center gap-2 text-xs uppercase tracking-[0.28em] text-emerald-500 font-semibold mb-4">
            Upload & Share
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl mb-6">
            Upload your research
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              to="/upload"
              className="inline-flex text-white  items-center justify-center rounded-full bg-emerald-500 px-8 py-3.5 text-sm font-semibold transition-all hover:bg-emerald-600 hover:scale-105 active:scale-95"
            >
              Upload Research
            </Link>
            <Link
              to="/researches"
              className="inline-flex items-center justify-center rounded-full border border-mist/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-mist/40 active:scale-95"
            >
              Explore Papers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
