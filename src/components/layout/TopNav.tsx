import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";

export const TopNav = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutConfirm = () => {
    logout();
    setIsLogoutModalOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-8 py-6 md:px-16 bg-black/50 backdrop-blur-md border-b border-white/10 md:bg-transparent md:backdrop-blur-none md:border-none">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-white flex items-center gap-2 z-50"
        >
          BSIT 2I
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-white/70">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
          <a href="#docs" className="transition hover:text-white">
            Docs
          </a>
          <a href="#about" className="transition hover:text-white">
            About us
          </a>
          <a href="#contact" className="transition hover:text-white">
            Contact us
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(true)}
                className="rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-xs font-medium tracking-wide text-white transition hover:bg-white/5"
              >
                Log out
              </button>
              <Link
                to="/upload"
                className="rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-xs font-medium tracking-wide text-white transition hover:bg-white/5 flex items-center gap-2"
              >
                Upload Research →
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-xs font-medium tracking-wide text-white transition hover:bg-white/5 flex items-center gap-2"
            >
              Log in →
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden z-50 text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-white/10 p-6 flex flex-col gap-6 md:hidden text-center z-40">
            <nav className="flex flex-col gap-4 text-sm font-medium text-white/70">
              <a
                href="#features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="transition hover:text-white py-2"
              >
                Features
              </a>
              <a
                href="#docs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="transition hover:text-white py-2"
              >
                Docs
              </a>
              <a
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="transition hover:text-white py-2"
              >
                About us
              </a>
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="transition hover:text-white py-2"
              >
                Contact us
              </a>
            </nav>
            <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
              {user ? (
                <>
                  <Link
                    to="/upload"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-full border border-white/20 bg-white/5 py-3 text-sm font-medium tracking-wide text-white transition hover:bg-white/10 flex items-center justify-center gap-2"
                  >
                    Upload Research →
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="rounded-full border border-red-500/50 bg-red-500/10 py-3 text-sm font-medium tracking-wide text-red-400 transition hover:bg-red-500/20"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-full border border-white/20 bg-white/5 py-3 text-sm font-medium tracking-wide text-white transition hover:bg-white/10 flex items-center justify-center gap-2"
                >
                  Log in →
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-950 p-6 text-center shadow-2xl">
            <h3 className="mb-2 text-xl font-semibold text-white">
              Confirm Logout
            </h3>
            <p className="mb-6 text-sm text-zinc-400">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 rounded-xl border border-white/10 bg-transparent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogoutConfirm}
                className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-600"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
