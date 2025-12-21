import Skeleton from "@/components/Skeleton";

const AdminLoading = () => {
    return (
        <div className="flex flex-col gap-10">
            {/* Page Header Skeleton */}
            <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-10 w-48 rounded-full" />
            </div>

            {/* Dashboard Stats Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-4 md:gap-6">
                        <Skeleton className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl" />
                        <div className="flex-1">
                            <Skeleton className="h-2 w-12 md:w-16 mb-2" />
                            <Skeleton className="h-8 w-16 md:w-20" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Article Form Skeleton */}
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full"></div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-10 text-center tracking-tight relative z-10">
                    <Skeleton className="h-10 w-48 mx-auto" />
                </h2>
                <div className="space-y-6 relative z-10">
                    <div>
                        <Skeleton className="h-4 w-20 mb-2 ml-1" />
                        <Skeleton className="h-14 w-full rounded-2xl" />
                    </div>
                    <div>
                        <Skeleton className="h-4 w-20 mb-2 ml-1" />
                        <Skeleton className="h-32 w-full rounded-2xl" />
                    </div>
                    <div>
                        <Skeleton className="h-4 w-20 mb-2 ml-1" />
                        <Skeleton className="h-14 w-full rounded-2xl" />
                    </div>
                    <Skeleton className="h-14 w-full rounded-2xl mt-4" />
                </div>
            </div>
        </div>
    );
};

export default AdminLoading;
