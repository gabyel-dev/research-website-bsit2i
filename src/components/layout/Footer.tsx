import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer
      id="footer"
      className="border-t mx-auto max-w-7xl border-white/10 px-6 py-12 text-sm text-gray-400 md:px-16"
    >
      <div className="mx-auto w-full flex flex-col items-start justify-between gap-10 md:flex-row">
        <div className="max-w-md">
          <p className="text-lg font-semibold text-white">BSIT Research Hub</p>
          <p className="mt-3 leading-relaxed text-xs ">
            A repository platform for BSIT 2I students to share and explore
            academic research papers.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-10 sm:gap-20 text-xs">
          <div>
            <p className="mb-4 font-medium text-white">Quick Links</p>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/researches"
                  className="hover:text-white transition-colors"
                >
                  All Researches
                </Link>
              </li>
              <li>
                <Link
                  to="/upload"
                  className="hover:text-white transition-colors"
                >
                  Upload Research
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 font-medium text-white">Contact</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:info@paterostechnologicalcollege.edu.ph"
                  className="hover:text-white transition-colors"
                >
                  @paterostechnologicalcollege.edu.ph
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8">
        <p className="text-xs">
          © {new Date().getFullYear()} BSIT2I Research Web. All rights reserved.
        </p>
        <div className="mt-4 md:mt-0 flex gap-4 text-xs">
          <Link to="#" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link to="#" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};
