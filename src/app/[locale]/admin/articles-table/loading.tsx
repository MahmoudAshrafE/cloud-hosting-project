import Skeleton from "@/components/Skeleton";

const AdminArticlesLoading = () => {
    return (
        <section className='flex flex-col gap-10'>
            <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-64 rounded-full" />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden">
                <div className="bg-gray-50 dark:bg-slate-800/50 p-8 border-b border-gray-100 dark:border-slate-800">
                    <div className="flex gap-8">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-1/4 hidden lg:block" />
                        <Skeleton className="h-4 w-1/4" />
                    </div>
                </div>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="p-8 border-b border-gray-100 dark:border-slate-800/50 flex items-center gap-8">
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-4 w-1/4 hidden lg:block" />
                        <div className="flex gap-3">
                            <Skeleton className="h-12 w-12 rounded-2xl" />
                            <Skeleton className="h-12 w-12 rounded-2xl" />
                        </div>
                        <div className="ml-auto hidden lg:block">
                            <Skeleton className="h-12 w-32 rounded-2xl" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-6">
                <Skeleton className="h-14 w-80 rounded-2xl" />
            </div>
        </section>
    );
};

export default AdminArticlesLoading;
