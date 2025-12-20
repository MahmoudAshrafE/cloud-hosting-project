import Skeleton from "@/components/Skeleton";

const SingleArticleLoading = () => {
  return (
    <section className="container m-auto w-full px-5 py-20 md:w-2/3">
      {/* Article Content Skeleton */}
      <div className="bg-slate-900 p-10 rounded-[2.5rem] mb-12 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full"></div>

        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/4 mb-8" />
        <Skeleton className="w-full h-[400px] mb-10 rounded-2xl" />

        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>

      {/* Add Comment Input Skeleton */}
      <div className="mb-12">
        <Skeleton className="h-[120px] rounded-[2rem]" />
      </div>

      {/* Comments List Skeleton */}
      <div className="space-y-6">
        <Skeleton className="h-8 w-40 mb-8" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-8 rounded-[2rem] bg-slate-900/50 border border-slate-800 shadow-sm">
            <div className="flex justify-between mb-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SingleArticleLoading;