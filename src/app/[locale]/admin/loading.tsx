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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="p-8 rounded-[2.5rem] bg-slate-900 border border-slate-800 shadow-xl overflow-hidden relative">
                        <Skeleton className="w-16 h-16 rounded-2xl mb-6" />
                        <Skeleton className="h-10 w-24 mb-2" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                ))}
            </div>

            {/* Add Article Form Skeleton */}
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full"></div>
                <h2 className="text-3xl font-black text-white mb-10 text-center tracking-tight relative z-10">
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
