import Skeleton from "@/components/Skeleton";

const ProfileLoading = () => {
    return (
        <section className="container m-auto px-5 py-20 max-w-4xl">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full"></div>

                <div className="flex flex-col items-center mb-12 relative z-10">
                    <Skeleton className="w-32 h-32 rounded-full mb-6" />
                    <Skeleton className="h-10 w-48 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </div>

                <div className="space-y-10 relative z-10">
                    <div className="p-8 rounded-3xl bg-gray-50 dark:bg-slate-800/30 border border-gray-100 dark:border-slate-800/50">
                        <Skeleton className="h-8 w-48 mb-8" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <Skeleton className="h-4 w-20 mb-2 ml-1" />
                                <Skeleton className="h-14 w-full rounded-2xl" />
                            </div>
                            <div>
                                <Skeleton className="h-4 w-20 mb-2 ml-1" />
                                <Skeleton className="h-14 w-full rounded-2xl" />
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-gray-50 dark:bg-slate-800/30 border border-gray-100 dark:border-slate-800/50">
                        <Skeleton className="h-8 w-64 mb-8" />
                        <div className="space-y-6">
                            <div>
                                <Skeleton className="h-4 w-32 mb-2 ml-1" />
                                <Skeleton className="h-14 w-full rounded-2xl" />
                            </div>
                            <div>
                                <Skeleton className="h-4 w-32 mb-2 ml-1" />
                                <Skeleton className="h-14 w-full rounded-2xl" />
                            </div>
                            <Skeleton className="h-14 w-full rounded-2xl mt-4" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileLoading;
