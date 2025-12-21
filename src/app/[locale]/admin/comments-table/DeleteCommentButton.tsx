"use client"

import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

import { useTranslations } from 'next-intl';

import { useState } from 'react';
import ConfirmationModal from '@/components/ConfirmationModal';

interface DeleteCommentButtonProps {
    commentId: number
}
const DeleteCommentButton = ({ commentId }: DeleteCommentButtonProps) => {
    const router = useRouter();
    const t = useTranslations('Admin');
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const deleteCommentHandler = async () => {
        setIsDeleting(true);
        try {
            await axios.delete(`/api/comments/${commentId}`);
            router.refresh();
            toast.success(t('comment_deleted'));
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
                className="px-6 py-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 font-bold rounded-2xl hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white transition-all shadow-sm active:scale-95 uppercase text-xs tracking-widest"
            >
                {t('delete_btn')}
            </button>

            <ConfirmationModal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={deleteCommentHandler}
                title={t('delete_confirm_comment')}
                message={t('delete_confirm_comment')}
                isLoading={isDeleting}
                confirmText={t('delete_btn')}
            />
        </>
    )
}

export default DeleteCommentButton