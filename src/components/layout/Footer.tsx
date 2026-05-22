export const Footer = () => {
  return (
    <footer
      id="footer"
      className="border-t border-white/10 px-6 py-10 text-sm text-mist/70 md:px-16"
    >
      <div className="mx-auto w-full max-w-7xl flex flex-col items-start justify-between gap-6 md:flex-row">
        <div>
          <p className="text-white">BSIT Research Hub</p>
          <p className="mt-2 max-w-md">
            A curated space for BSIT students to share research, collaborate,
            and spotlight innovations from our department.
          </p>
        </div>
        <div className="flex gap-10">
          <div>
            <p className="mb-2 text-white">Email</p>
            <p>@paterostechnologicalcollege.edu.ph</p>
          </div>
        </div>
      </div>
      <p className="mt-6 text-xs text-mist/40">
        © 2026 BSIT2I Research Web. All rights reserved.
      </p>
    </footer>
  );
};
