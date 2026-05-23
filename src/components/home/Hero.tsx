import { useEffect, useRef } from "react";
import { animate } from "animejs";

import { IoIosCloudUpload } from "react-icons/io";

export const Hero = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      !gridRef.current ||
      !glowRef.current ||
      !contentRef.current ||
      !titleRef.current ||
      !textRef.current ||
      !buttonRef.current
    )
      return;

    // Background animation
    const gridAnim = animate(gridRef.current, {
      opacity: [0.12, 0.3],
      scale: [1, 1.04],
      easing: "inOutSine",
      duration: 4000,
      direction: "alternate",
      loop: true,
    });

    const glowAnim = animate(glowRef.current, {
      scale: [0.95, 1.08],
      opacity: [0.2, 0.5],
      easing: "inOutQuad",
      duration: 3000,
      direction: "alternate",
      loop: true,
    });

    // Hero container fade
    animate(contentRef.current, {
      opacity: [0, 1],
      translateY: [40, 0],
      easing: "outExpo",
      duration: 1200,
    });

    // Title animation
    animate(titleRef.current, {
      opacity: [0, 1],
      translateY: [60, 0],
      filter: ["blur(12px)", "blur(0px)"],
      easing: "outExpo",
      duration: 1400,
      delay: 200,
    });

    // Paragraph animation
    animate(textRef.current, {
      opacity: [0, 1],
      translateY: [25, 0],
      easing: "outExpo",
      duration: 1000,
      delay: 500,
    });

    // Button animation
    animate(buttonRef.current, {
      opacity: [0, 1],
      translateY: [20, 0],
      scale: [0.9, 1],
      easing: "outBack",
      duration: 1000,
      delay: 800,
    });

    return () => {
      gridAnim.pause();
      glowAnim.pause();
    };
  }, []);
  return (
    <main
      id="hero"
      className=" relative w-full flex h-[100vh]  flex-col md:items-center justify-center overflow-hidden bg-[#0A0710]  md:text-center pb-10 "
    >
      {/* Abstract Animated Backgrounds */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_30%,transparent_100%)]" />
      <div className=" fixed md:absolute w-full h-[110vh] opacity-10 md:opacity-40">
        <img
          src="/bg.webp"
          alt="background image hero section"
          className="  bg-cover w-full h-full"
        />
      </div>

      <div
        ref={glowRef}
        className="absolute hidden md:block left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/20 mix-blend-screen blur-[120px]"
      />
      <div className="absolute left-[20%] hidden md:block top-[20%] h-[400px] w-[400px] rounded-full bg-emerald-600/20 mix-blend-screen blur-[100px]" />
      <div className="absolute right-[20%] hidden md:block top-[30%] h-[500px] w-[500px] rounded-full bg-green-500/10 mix-blend-screen blur-[120px]" />

      {/* Black Vignette overlay */}
      <div className="pointer-events-none hidden md:block absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0710_80%)] opacity-90" />

      {/* Bottom Gradient for smooth transition */}
      <div className="pointer-events-none absolute  bottom-0 left-0 right-0 hidden md:block h-48 bg-gradient-to-t from-[#0A0710] to-transparent z-2" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative  flex max-w-4xl flex-col  md:items-center px-6 z-21 mt-20  "
      >
        <h1
          ref={titleRef}
          className=" text-5xl font-semibold leading-[1.1] tracking-tighter text-slate-400/90 md:text-[72px]"
        >
          Academic
          <span className="text-emerald-400 italic"> Research Compiler</span>
          <br />
          for <span className="text-emerald-100">BSIT 2I</span> Students
        </h1>

        <p
          ref={textRef}
          className="md:mt-8 mt-5 max-w-2xl md:text-[15px] text-xs leading-relaxed text-white/50"
        >
          Elevate your studies, maximize knowledge sharing, and gain powerful
          insights with our curated BSIT research repository.
        </p>

        <div ref={buttonRef} className="mt-10 flex items-center gap-2">
          <div className="    flex z-21 relative w-fit items-center gap-2 rounded-full border border-white/20 bg-transparent  px-5 py-3 text-sm font-medium text-white transition hover:bg-white/5">
            <a href="#articles" className="">
              View Articles
            </a>
          </div>
          <a
            href="/upload"
            className="flex w-fit items-center gap-2 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-600 px-5 py-3 text-sm font-medium text-slate-100 transition hover:opacity-90 shadow-[0_0_20px_rgba(59,130,246,0.3)] z-21 relative"
          >
            <IoIosCloudUpload className="text-lg" />
          </a>
        </div>
      </div>
    </main>
  );
};
