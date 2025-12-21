'use client'

import { useState, useEffect, useRef } from 'react'
import { BsThreeDots, BsPencil, BsTrash } from 'react-icons/bs'
import Link from 'next/link'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl';
import ConfirmationModal from '@/components/ConfirmationModal'

interface ArticleActionMenuProps {
    articleId: number;
    text: {
        edit: string;
        delete: string;
        deleteConfirmTitle: string;
        deleteConfirmMessage: string;
        articleDeleted: string;
        error: string;
    }
}

const ArticleActionMenu = ({ articleId, text }: ArticleActionMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const deleteArticleHandler = async () => {
        setIsDeleting(true);
        try {
            await axios.delete(`/api/articles/${articleId}`);
            router.push('/articles/search?searchText='); // Redirect to articles list or home
            router.refresh();
            toast.success(text.articleDeleted);
            setShowConfirm(false);
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || text.error);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="relative inline-block" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-400 transition-colors"
                aria-label="Options"
            >
                <BsThreeDots className="text-2xl" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <ul className="py-2">
                        <li>
                            <Link
                                href={`/admin/articles-table/edit/${articleId}`}
                                className="flex items-center gap-3 px-6 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <BsPencil className="text-blue-500 text-lg" />
                                {text.edit}
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    setShowConfirm(true);
                                }}
                                className="w-full flex items-center gap-3 px-6 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-colors"
                            >
                                <BsTrash className="text-lg" />
                                {text.delete}
                            </button>
                        </li>
                    </ul>
                </div>
            )}

            <ConfirmationModal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={deleteArticleHandler}
                title={text.deleteConfirmTitle}
                message={text.deleteConfirmMessage}
                isLoading={isDeleting}
                confirmText={text.delete}
            />
        </div>
    )
}

export default ArticleActionMenu
