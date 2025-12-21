import Skeleton from "@/components/Skeleton";

const AdminCommentsLoading = () => {
    return (
        <section className='flex flex-col gap-10'>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <Skeleton className="h-12 w-64" />
                    <Skeleton className="h-6 w-48" />
                </div>
                <Skeleton className="h-[72px] w-32 rounded-2xl" />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden">
                <div className="bg-gray-50 dark:bg-slate-800/50 p-8 border-b border-gray-100 dark:border-slate-800">
                    <div className="flex gap-8">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/4 hidden lg:block" />
                        <Skeleton className="h-4 w-1/4" />
                    </div>
                </div>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="p-8 border-b border-gray-100 dark:border-slate-800/50 flex items-center gap-8">
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-4 w-1/4 hidden lg:block" />
                        <div className="ml-auto">
                            <Skeleton className="h-12 w-24 rounded-2xl" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AdminCommentsLoading;
