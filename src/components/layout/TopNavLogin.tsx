import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

export const TopNavLogin = () => {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-6 md:px-16  backdrop-blur-md md:bg-transparent md:backdrop-blur-none md:border-none">
        <div className="flex gap-2 justify-start items-center w-full">
          <div className=" md:hidden gap-2">
            <Link to="/" className="flex  gap-3 text-2xl">
              <IoIosArrowBack className="text-mist/60 hover:text-mist cursor-pointer  transition-colors" />
            </Link>
          </div>
          <Link to="/" className="w-10 h-10 hidden md:block ">
            <img src="/logo.png" alt="website logo" />
          </Link>
          <Link
            to="/"
            className="text-2xl font-bold w-full tracking-tight text-white flex items-center gap-2 z-50"
          >
            BSIT 2I
          </Link>

          <div className="w-full justify-end flex md:hidden">
            <Link to="/" className="w-10 h-10 block md:hidden  ">
              <img src="/logo.png" alt="website logo" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};
