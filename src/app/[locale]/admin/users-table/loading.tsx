import Skeleton from "@/components/Skeleton";

const AdminUsersLoading = () => {
    return (
        <section className='flex flex-col gap-10'>
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-12 w-64" />
                    <Skeleton className="h-6 w-48" />
                </div>
                <Skeleton className="h-[72px] w-32 rounded-2xl" />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden">
                <div className="bg-gray-50 dark:bg-slate-800/50 p-8 border-b border-gray-100 dark:border-slate-800">
                    <div className="flex gap-8">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/4 hidden md:block" />
                        <Skeleton className="h-4 w-1/6" />
                        <Skeleton className="h-4 w-1/6 hidden lg:block" />
                    </div>
                </div>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="p-8 border-b border-gray-100 dark:border-slate-800/50 flex items-center gap-8">
                        <div className="flex items-center gap-4 w-1/4">
                            <Skeleton className="w-12 h-12 rounded-2xl" />
                            <Skeleton className="h-6 w-32" />
                        </div>
                        <Skeleton className="h-4 w-1/4 hidden md:block" />
                        <Skeleton className="h-8 w-24 rounded-full" />
                        <Skeleton className="h-4 w-1/6 hidden lg:block" />
                        <div className="ml-auto">
                            <Skeleton className="h-14 w-14 rounded-2xl" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AdminUsersLoading;
