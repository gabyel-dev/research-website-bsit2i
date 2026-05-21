import { Link } from "react-router-dom";

export const TopNavLogin = () => {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-8 py-6 md:px-16  backdrop-blur-md md:bg-transparent md:backdrop-blur-none md:border-none">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-white flex items-center gap-2 z-50"
        >
          BSIT 2I
        </Link>
      </header>
    </>
  );
};
