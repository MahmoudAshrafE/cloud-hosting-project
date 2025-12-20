import Skeleton from "@/components/Skeleton";

const AuthLoading = () => {
    return (
        <section className="flex flex-col items-center justify-center py-20 px-6">
            <div className="w-full max-w-lg bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl relative overflow-hidden transition-all duration-500">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 dark:bg-blue-400/5 blur-[80px] rounded-full"></div>

                <div className="relative z-10 flex flex-col items-center">
                    {/* Title Skeleton */}
                    <Skeleton className="h-12 w-48 mb-8" />

                    <div className="w-full space-y-6">
                        {/* Input 1 */}
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-4 w-20 mb-1 ml-1" />
                            <Skeleton className="h-14 w-full rounded-2xl" />
                        </div>

                        {/* Input 2 */}
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-4 w-20 mb-1 ml-1" />
                            <Skeleton className="h-14 w-full rounded-2xl" />
                        </div>

                        {/* Optional Text/Links */}
                        <div className="flex justify-between items-center px-1">
                            <Skeleton className="h-4 w-32" />
                        </div>

                        {/* Button Skeleton */}
                        <div className="pt-4">
                            <Skeleton className="h-14 w-full rounded-2xl" />
                        </div>

                        {/* Footer Link Skeleton */}
                        <Skeleton className="h-4 w-48 mx-auto mt-4" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuthLoading;
