import Skeleton from "@/components/Skeleton";

const EditArticleLoading = () => {
    return (
        <section className="flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-400/5 blur-[100px] rounded-full"></div>

                <h2 className="text-3xl font-black text-white mb-10 text-center tracking-tight relative z-10 flex items-center justify-center gap-2">
                    <Skeleton className="h-10 w-48" />
                </h2>

                <div className="space-y-6 relative z-10">
                    {/* Title Input */}
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-16 mb-1 ml-1" />
                        <Skeleton className="h-14 w-full rounded-2xl" />
                    </div>

                    {/* Description Textarea */}
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-32 mb-1 ml-1" />
                        <Skeleton className="h-40 w-full rounded-2xl" />
                    </div>

                    {/* Image Input */}
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-24 mb-1 ml-1" />
                        <Skeleton className="h-14 w-full rounded-2xl" />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <Skeleton className="h-14 w-full rounded-2xl shadow-lg shadow-blue-500/10" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditArticleLoading;
