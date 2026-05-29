import { useEffect, useState } from "react";
import { TopNav } from "../components/layout/TopNav.js";
import { Hero } from "../components/home/Hero.js";

import { ResearchArticles } from "../components/home/ResearchArticles.js";
import { ResearchersLoggedIn } from "../components/home/ResearchersLoggedIn.js";
import { Contributors } from "../components/home/Contributors.js";
import { CallToAction } from "../components/home/CallToAction.js";
import { Footer } from "../components/layout/Footer.js";
import { motion, type Variants } from "framer-motion";

export const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 360);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const sectionVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0A0710] text-mist pb-20 overflow-hidden">
      <TopNav />

      <main className="flex flex-col gap-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <Hero />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionVariants}
          transition={{ delay: 0.1 }}
        >
          <ResearchArticles />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionVariants}
          transition={{ delay: 0.2 }}
        >
          <ResearchersLoggedIn />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionVariants}
          transition={{ delay: 0.3 }}
        >
          <Contributors />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionVariants}
          transition={{ delay: 0.4 }}
        >
          <CallToAction />
        </motion.div>
      </main>

      <Footer />

      {showScrollTop && (
        <button
          type="button"
          onClick={handleScrollTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 shadow-lg backdrop-blur transition hover:border-white/40 hover:bg-white/20"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 15 6-6 6 6" />
          </svg>
        </button>
      )}
    </div>
  );
};
