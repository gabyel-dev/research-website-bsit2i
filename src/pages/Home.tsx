import { TopNav } from "../components/layout/TopNav.js";
import { Hero } from "../components/home/Hero.js";
import { ResearchArticles } from "../components/home/ResearchArticles.js";
import { ResearchersLoggedIn } from "../components/home/ResearchersLoggedIn.js";
import { Contributors } from "../components/home/Contributors.js";
import { Footer } from "../components/layout/Footer.js";
import { motion, type Variants } from "framer-motion";

export const Home = () => {
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
      </main>

      <Footer />
    </div>
  );
};
