'use client'

import { useRouter, Link } from "@/i18n/navigation"
import { useState, useEffect } from "react"
import { useTranslations } from 'next-intl';
import { FiSearch, FiFileText, FiLoader } from 'react-icons/fi';
import Modal from "../Modal";
import axios from "axios";

import { Article } from "@/generated/prisma/client";

const SearchArticleInput = () => {
    const router = useRouter()
    const t = useTranslations('ArticlesPage');
    const [searchText, setSearchText] = useState('')
    const [results, setResults] = useState<Article[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
                if (data.length > 0) {
                    setIsModalOpen(true);
                }
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchResults, 500);
        return () => clearTimeout(timeoutId);
    }, [searchText]);

    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        setIsModalOpen(false);
        router.push(`/articles/search?searchText=${searchText}`)
    }

    return (
        <div className="max-w-3xl mx-auto w-full group relative mb-16">
            <form onSubmit={formSubmitHandler} className="relative z-10">
                {/* Animated Background Glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] blur-xl opacity-20 group-focus-within:opacity-50 transition duration-1000 group-focus-within:duration-200"></div>

                <div className="relative flex items-center bg-white dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-2xl transition-all duration-300 group-focus-within:border-blue-500/50 p-1.5">
                    <div className="pl-8 md:pl-10 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                        {isLoading ? <FiLoader className="text-2xl md:text-3xl animate-spin" /> : <FiSearch className="text-2xl md:text-3xl" />}
                    </div>

                    <input
                        type="search"
                        className="w-full bg-transparent px-6 py-6 md:px-10 md:py-8 text-xl md:text-2xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 font-extrabold outline-none border-none selection:bg-blue-500/30"
                        placeholder={t('search_placeholder')}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />

                    <div className="pr-4 md:pr-6">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-[1.8rem] text-lg font-black transition-all shadow-xl shadow-blue-500/20 active:scale-95 uppercase tracking-widest hidden sm:block"
                        >
                            {t('search_btn')}
                        </button>
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3 justify-center opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 translate-y-2 group-focus-within:translate-y-0">
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-widest px-1">{t('press_enter')}</span>
                </div>
            </form>

            {/* Live Results Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={t('live_search_title')}
            >
                <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {results.length > 0 ? (
                        results.map(article => (
                            <Link
                                key={article.id}
                                href={`/articles/${article.id}`}
                                onClick={() => setIsModalOpen(false)}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all group/item"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl shrink-0 group-hover/item:scale-110 transition-transform">
                                    <FiFileText />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="font-black text-gray-900 dark:text-white truncate uppercase tracking-tight">
                                        {article.title}
                                    </span>
                                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
                                        Click to view article
                                    </span>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="py-10 text-center">
                            <p className="text-gray-500 dark:text-slate-400 font-bold italic">
                                {t('no_results_found')}
                            </p>
                        </div>
                    )}
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800 text-center">
                    <button
                        onClick={() => {
                            setIsModalOpen(false);
                            router.push(`/articles/search?searchText=${searchText}`);
                        }}
                        className="text-blue-600 dark:text-blue-400 font-black uppercase text-xs tracking-[0.2em] hover:underline"
                    >
                        View all results in search page →
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default SearchArticleInput
