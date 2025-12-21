import Skeleton from "@/components/Skeleton";

const ArticlesLoading = () => {
    return (
        <section className="container m-auto px-5 py-20">
            {/* Search Input Skeleton */}
            <div className="mb-12 w-full md:w-2/3 m-auto">
                <Skeleton className="h-[60px] rounded-2xl" />
            </div>

            {/* Articles Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden relative">
                        {/* Image Placeholder */}
                        <Skeleton className="w-full h-52 mb-6 rounded-2xl" />

                        {/* Content */}
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <div className="pt-4">
                                <Skeleton className="h-12 w-full rounded-2xl" />
                            </div>
                        </div>

                        {/* Decorative glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full"></div>
                    </div>
                ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex items-center justify-center mt-16 mb-10">
                <Skeleton className="w-80 h-14 rounded-2xl" />
            </div>
        </section>
    );
};

export default ArticlesLoading;