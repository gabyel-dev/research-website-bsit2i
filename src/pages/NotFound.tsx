import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

export const NotFound = () => {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="min-h-screen bg-ink text-mist">
      <motion.div
        className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <motion.p
          className="text-xs uppercase tracking-[0.28em] text-mist/60"
          variants={fadeUp}
        >
          404
        </motion.p>
        <motion.h1
          className="mt-4 text-4xl font-semibold text-white"
          variants={fadeUp}
        >
          Page not found
        </motion.h1>
        <motion.p className="mt-3 text-sm text-mist/70" variants={fadeUp}>
          The page you are looking for does not exist yet.
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link
            to="/"
            className="mt-8 rounded-full border border-white/20 px-6 py-3 text-sm text-white/80 transition hover:border-white/60 hover:text-white"
          >
            Back to home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};
