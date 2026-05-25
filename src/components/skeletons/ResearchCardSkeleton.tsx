export const ResearchCardSkeleton = () => {
  return (
    <div className=" bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur animate-pulse">
      <div className="h-6 bg-white/10 rounded w-3/4 mb-4"></div>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-white/10"></div>
        <div className="h-3 bg-white/10 rounded w-24"></div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="h-3 bg-white/10 rounded w-full"></div>
        <div className="h-3 bg-white/10 rounded w-full"></div>
        <div className="h-3 bg-white/10 rounded w-2/3"></div>
      </div>

      <div className="h-3 bg-white/10 rounded w-20 mb-6"></div>

      <div className="h-10 bg-white/10 rounded-lg"></div>
    </div>
  );
};
