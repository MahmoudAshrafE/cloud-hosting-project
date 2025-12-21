import { IoCloudCircle } from "react-icons/io5";

const loading = () => {
    return (
        <section className='min-h-[calc(100vh-140px)] flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-950 px-5 transition-colors duration-300'>
            <div className="relative">
                {/* Outer glow rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>

                {/* Center Icon */}
                <div className="relative z-10 animate-bounce duration-[2000ms]">
                    <IoCloudCircle className="text-8xl text-blue-600 dark:text-blue-400 drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
                </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-3">
                <div className="flex gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
                </div>
            </div>
        </section>
    );
};

export default loading;