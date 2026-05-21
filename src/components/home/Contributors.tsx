const contributors = [
  {
    id: 1,
    name: "Ariela Cruz",
    role: "Lead Editor",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop",
    bio: "Oversees research quality and publication standards",
    linkedin: "#",
    github: "#",
  },
  {
    id: 2,
    name: "Paolo Cortez",
    role: "Research Coordinator",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=800&fit=crop",
    bio: "Manages research projects and team collaboration",
    linkedin: "#",
    github: "#",
  },
  {
    id: 3,
    name: "Rin Delgado",
    role: "UI Specialist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop",
    bio: "Designs intuitive interfaces and user experiences",
    linkedin: "#",
    github: "#",
  },
  {
    id: 4,
    name: "Jana Molina",
    role: "Faculty Advisor",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=800&fit=crop",
    bio: "Provides academic guidance and mentorship",
    linkedin: "#",
    github: "#",
  },
];

export const Contributors = () => {
  return (
    <section
      id="contributors"
      className="mt-24 mx-auto w-full max-w-7xl px-6 md:px-16 pb-10"
    >
      <div className="mb-12 text-center">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-purple-400/80 font-semibold">
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
            className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] overflow-hidden backdrop-blur hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={contributor.image}
                alt={contributor.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                {contributor.name}
              </h3>
              <p className="text-sm text-purple-400/80 font-semibold mb-2">
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
