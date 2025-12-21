'use client'

import { useRouter, Link } from "@/i18n/navigation"
import { useState, useEffect, useRef } from "react"
import { useTranslations } from 'next-intl';
import { FiSearch, FiFileText, FiLoader, FiX, FiArrowRight } from 'react-icons/fi';
import axios from "axios";

import { Article } from "@/generated/prisma/client";

const SearchArticleInput = () => {
    const router = useRouter()
    const t = useTranslations('ArticlesPage');
    const [searchText, setSearchText] = useState('')
    const [results, setResults] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Live Search Logic with Debounce
    useEffect(() => {
        const fetchResults = async () => {
            if (searchText.trim().length < 2) {
                setResults([]);
                return;
            }

            try {
                setIsLoading(true);
                const { data } = await axios.get(`/api/articles/search?textSearch=${searchText}`);
                setResults(data);
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchResults, 400);
        return () => clearTimeout(timeoutId);
    }, [searchText]);

    // Handle clicks outside to close search results
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchText.trim()) {
            setIsFocused(false);
            router.push(`/articles/search?searchText=${searchText}`)
        }
    }

    const showResults = (isFocused || searchText.length > 0) && (results.length > 0 || isLoading || (searchText.length >= 2 && !isLoading));

    return (
        <>
            {/* Backdrop for focus/active state */}
            {(isFocused || searchText.length > 0) && (
                <div
                    className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[60] animate-in fade-in duration-500"
                    onClick={() => {
                        setIsFocused(false);
                        setSearchText('');
                    }}
                />
            )}

            <div ref={containerRef} className={`max-w-2xl mx-auto w-full group relative mb-12 transition-all duration-500 ${(isFocused || searchText.length > 0) ? 'z-[70] scale-[1.02]' : 'z-10'}`}>
                <form onSubmit={formSubmitHandler} className="relative">
                    {/* Animated Background Glow */}
                    <div className={`absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur-xl transition-all duration-700 ${(isFocused || searchText.length > 0) ? 'opacity-30' : 'opacity-0 group-hover:opacity-10'}`}></div>

                    <div className={`relative flex items-center bg-white dark:bg-slate-900 border transition-all duration-500 p-1.5 
                        ${(isFocused || searchText.length > 0)
                            ? 'rounded-t-[1.8rem] rounded-b-none border-blue-500/50 dark:border-blue-400/30 shadow-2xl'
                            : 'rounded-[1.8rem] border-gray-100 dark:border-slate-800 hover:border-gray-200 dark:hover:border-slate-700'
                        }`}>

                        <div className={`pl-5 md:pl-7 transition-colors duration-300 ${(isFocused || searchText.length > 0) ? 'text-blue-500' : 'text-gray-400'}`}>
                            {isLoading ? <FiLoader className="text-xl md:text-2xl animate-spin" /> : <FiSearch className="text-xl md:text-2xl" />}
                        </div>

                        <input
                            type="search"
                            onFocus={() => setIsFocused(true)}
                            className="w-full bg-transparent px-4 py-4 md:px-6 md:py-5 text-lg md:text-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 font-bold outline-none border-none selection:bg-blue-500/30"
                            placeholder={t('search_placeholder')}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />

                        {searchText && (
                            <button
                                type="button"
                                onClick={() => setSearchText('')}
                                className="p-1 md:p-2 text-gray-400 hover:text-rose-500 transition-colors mr-1"
                            >
                                <FiX className="text-xl md:text-2xl" />
                            </button>
                        )}

                        <div className="pr-1.5 md:pr-3">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-black transition-all shadow-lg shadow-blue-500/10 active:scale-95 uppercase tracking-widest hidden sm:block"
                            >
                                {t('search_btn')}
                            </button>
                        </div>
                    </div>

                    {/* Live Results - The "Modal bellow it" */}
                    {showResults && (
                        <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-x border-b border-gray-100 dark:border-slate-800 rounded-b-[1.8rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden animate-in slide-in-from-top-2 duration-300">
                            <div className="max-h-[50vh] overflow-y-auto custom-scrollbar p-3 md:p-6">

                                {isLoading && searchText.length >= 2 && (
                                    <div className="py-8 flex flex-col items-center justify-center gap-3">
                                        <FiLoader className="text-3xl text-blue-500 animate-spin" />
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] animate-pulse">
                                            {t('searching')}
                                        </p>
                                    </div>
                                )}

                                {!isLoading && results.length > 0 && (
                                    <div className="flex flex-col gap-2">
                                        <div className="px-3 pb-3 border-b border-gray-50 dark:border-slate-800/50 mb-1 flex justify-between items-center">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('live_search_title')}</span>
                                            <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{results.length} Found</span>
                                        </div>
                                        {results.map(article => (
                                            <Link
                                                key={article.id}
                                                href={`/articles/${article.id}`}
                                                onClick={() => setIsFocused(false)}
                                                className="flex items-center gap-5 p-5 rounded-3xl bg-gray-50/50 dark:bg-slate-800/30 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all group/item"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl shadow-sm border border-gray-100 dark:border-slate-700 shrink-0 group-hover/item:scale-105 transition-transform">
                                                    <FiFileText />
                                                </div>
                                                <div className="flex flex-col flex-1 min-w-0">
                                                    <span className="font-black text-base text-gray-900 dark:text-white truncate uppercase tracking-tight group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                                                        {article.title}
                                                    </span>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-1">
                                                            View Details <FiArrowRight />
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {!isLoading && results.length === 0 && searchText.length >= 2 && (
                                    <div className="py-12 text-center flex flex-col items-center">
                                        <div className="w-14 h-14 bg-rose-50 dark:bg-rose-900/10 text-rose-500 rounded-full flex items-center justify-center mb-4 text-xl">
                                            <FiSearch />
                                        </div>
                                        <p className="text-gray-500 dark:text-slate-400 font-black uppercase tracking-widest text-[10px]">
                                            {t('no_results_found')}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-gray-50 dark:bg-slate-800/50 p-4 text-center border-t border-gray-100 dark:border-slate-800">
                                <button
                                    onClick={() => {
                                        setIsFocused(false);
                                        router.push(`/articles/search?searchText=${searchText}`);
                                    }}
                                    className="group/btn flex items-center justify-center gap-2 mx-auto text-blue-600 dark:text-blue-400 font-black uppercase text-[10px] tracking-widest hover:text-blue-700 transition-all"
                                >
                                    Browse all results
                                    <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    )}
                </form>

                <div className={`mt-4 flex flex-wrap gap-3 justify-center transition-all duration-500 ${isFocused ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                        <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-[9px] font-black text-white">ENTER</kbd>
                        <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">Search</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                        <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-[9px] font-black text-white">ESC</kbd>
                        <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">Close</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchArticleInput

