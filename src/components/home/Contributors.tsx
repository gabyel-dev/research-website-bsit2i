const contributors = [
  {
    id: 1,
    name: "Gabriel S. Guban",
    role: "Lead Developer",
    image: "/web_dev.avif",
    bio: "develops and maintains the research platform, ensuring a seamless user experience",
  },
  {
    id: 2,
    name: "John Patrick Pestada",
    role: "Frontend Developer",
    image: "/icon_editor.avif",
    bio: "Designs and implements the user interface, creating an intuitive and visually appealing experience",
  },
  {
    id: 3,
    name: "Janmark Celmar",
    role: "UI Specialist",
    image: "/ui_specialist.avif",
    bio: "Designs intuitive interfaces and user experiences",
    linkedin: "#",
    github: "#",
  },
  {
    id: 4,
    name: "Lancz Cristofer Arceo",
    role: "Tester",
    image: "/icon_provider.avif",
    bio: "Tests and evaluates the website to ensure functionality, security, and a smooth user experience.",
    linkedin: "#",
    github: "#",
  },
];

export const Contributors = () => {
  return (
    <section
      id="contributors"
      className="mt-20 md:mt-24 mx-auto w-full max-w-7xl px-6 md:px-16 pb-10"
    >
      <div className="mb-12 text-center">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-emerald-400/80 font-semibold">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          Our Team
        </span>
        <h2 className="mt-3 text-4xl font-bold text-white">
          Meet the Contributors
        </h2>
        <p className="mt-3 text-sm text-mist/60 max-w-2xl mx-auto">
          The dedicated team behind this platform, working to provide the best
          research experience
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {contributors.map((contributor) => (
          <div
            key={contributor.id}
            className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] overflow-hidden backdrop-blur hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300"
          >
            <div className=" overflow-hidden">
              <img
                src={contributor.image}
                alt={contributor.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                {contributor.name}
              </h3>
              <p className="text-sm text-emerald-400/80 font-semibold mb-2">
                {contributor.role}
              </p>
              <p className="text-xs text-mist/60 leading-relaxed mb-4">
                {contributor.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
