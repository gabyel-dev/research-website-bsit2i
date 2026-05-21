import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { Link } from "react-router-dom";

export const Hero = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!gridRef.current || !glowRef.current) return;

    const gridAnim = animate(
      gridRef.current,
      { opacity: [0.15, 0.4] },
      {
        easing: "inOutSine",
        duration: 2000,
        direction: "alternate",
        loop: true,
      },
    );

    const glowAnim = animate(
      glowRef.current,
      { opacity: [0.3, 0.7], scale: [0.95, 1.05] },
      {
        easing: "inOutSine",
        duration: 2000,
        direction: "alternate",
        loop: true,
      },
    );

    return () => {
      gridAnim.pause();
      glowAnim.pause();
    };
  }, []);

  return (
    <section className="relative w-full flex min-h-[100vh] flex-col md:items-center justify-center overflow-hidden bg-[#0A0710] px-6 md:text-center pt-20">
      {/* Abstract Animated Backgrounds */}
      <div
        ref={gridRef}
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_30%,transparent_100%)]"
      />

      <div
        ref={glowRef}
        className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 mix-blend-screen blur-[120px]"
      />
      <div className="absolute left-[20%] top-[20%] h-[400px] w-[400px] rounded-full bg-purple-600/10 mix-blend-screen blur-[100px]" />
      <div className="absolute right-[20%] top-[30%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 mix-blend-screen blur-[120px]" />

      {/* Black Vignette overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0710_80%)] opacity-90" />

      {/* Bottom Gradient for smooth transition */}
      <div className="pointer-events-none absolute -bottom-1 left-0 right-0 h-48 bg-gradient-to-t from-[#0A0710] to-transparent z-2" />

      {/* Content */}
      <div className="relative z-10 flex max-w-4xl flex-col  md:items-center z-21 ">
        <h1 className=" text-5xl font-semibold leading-[1.1] tracking-tight text-white/70 md:text-[72px]">
          Website{" "}
          <span className="text-blue-400 italic">Academic Research </span>
          <br />
          Compiler for <span className="text-blue-200">BSIT 2I</span> Students
        </h1>

        <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-white/50">
          Elevate your studies, maximize knowledge sharing, and gain powerful
          insights with our curated BSIT research repository.
        </p>

        <div className="mt-10 flex flex-wrap w-full items-center justify-center gap-4 z-21 relative">
          <div className="hidden md:block">
            <Link
              to="/upload"
              className="flex   z-21 relative w-full md:w-fit items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-medium text-white transition hover:bg-white/5"
            >
              View Researches
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          <a
            href="#articles"
            className="flex w-full md:w-fit items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 px-6 py-3 text-sm font-medium text-slate-900 transition hover:opacity-90 shadow-[0_0_20px_rgba(59,130,246,0.3)] z-21 relative"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 12 7-7 7 7"></path>
              <path d="M12 19V5"></path>
            </svg>
            Explore Researches
          </a>
        </div>
      </div>
    </section>
  );
};
