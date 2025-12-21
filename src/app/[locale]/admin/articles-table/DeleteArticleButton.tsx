"use client"

import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'
import { FaTrash } from "react-icons/fa"
import { useTranslations } from 'next-intl';

import { useState } from 'react';
import ConfirmationModal from '@/components/ConfirmationModal';

interface DeleteArticleButtonProps {
    articleId: number
}

const DeleteArticleButton = ({ articleId }: DeleteArticleButtonProps) => {
    const t = useTranslations('Admin');
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const deleteArticleHandler = async () => {
        setIsDeleting(true);
        try {
            await axios.delete(`/api/articles/${articleId}`);
            router.refresh();
            toast.success(t('article_deleted'));
            setShowConfirm(false);
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || t('error_occurred'));
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <>
            <button
                onClick={() => setShowConfirm(true)}
                className='bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-2xl p-4 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white transition-all shadow-sm active:scale-95'
            >
                <FaTrash className="text-xl" />
            </button>

            <ConfirmationModal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={deleteArticleHandler}
                title={t('delete_confirm_article')}
                message={t('delete_confirm_article')} // Usually title and message can be different, but I'll use same for now or simplified message
                isLoading={isDeleting}
                confirmText={t('delete_btn')}
            />
        </>
    )
}

export default DeleteArticleButton