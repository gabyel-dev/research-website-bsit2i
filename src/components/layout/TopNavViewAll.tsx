import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import { IoIosArrowBack } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";

export const TopNavViewAll = () => {
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
      <header className=" absolute inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-6 md:px-16 bg-black/20 md:bg-transparent backdrop-blur-sm md:border-none">
        <div className=" md:hidden gap-2">
          <Link to="/" className="flex items-center gap-3 text-2xl">
            <IoIosArrowBack className="text-mist/60 hover:text-mist cursor-pointer  transition-colors" />
          </Link>
        </div>

        <div className="flex gap-2">
          <Link to="/" className="w-10 h-10 hidden md:block">
            <img src="/logo.png" alt="website logo" />
          </Link>
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-white flex items-center gap-2 z-50"
          >
            BSIT 2I
          </Link>
        </div>
        <Link to="/" className="w-10 h-10 md:hidden">
          <img src="/logo.png" alt="website logo" />
        </Link>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/upload"
                className="rounded-full border border-white/20 bg-emerald-600 px-5 py-2.5 text-xs font-medium tracking-wide text-white transition hover:bg-white/5 flex items-center gap-2"
              >
                Upload Research
              </Link>
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(true)}
                className="rounded-full border border-white/20 bg-transparent p-2 text-xs font-medium tracking-wide text-white transition hover:bg-white/5"
              >
                <IoLogOut className="inline-block pl-1 text-2xl text-red-500" />
              </button>
            </>
          ) : (
            <Link
              to="/upload"
              className="rounded-full border border-white/20 bg-emerald-600 px-5 py-2.5 text-xs font-medium tracking-wide text-white transition hover:bg-white/5 flex items-center gap-2"
            >
              Upload Research
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black backdrop-blur-lg border-b border-white/10 p-6 flex flex-col gap-6 md:hidden text-center z-40">
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
            <img src="/logout.svg" alt="logout-img" />
            <h3 className="mb-2 text-xl font-semibold text-white">
              Confirm Logout
            </h3>
            <p className="mb-6 text-sm text-zinc-400">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={handleLogoutConfirm}
                className="flex-1 rounded-xl bg-transparent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/5"
              >
                Log out
              </button>
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 rounded-xl border border-white/10  bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
