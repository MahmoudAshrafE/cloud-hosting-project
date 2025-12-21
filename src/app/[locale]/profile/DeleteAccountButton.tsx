'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import ConfirmationModal from '@/components/ConfirmationModal';
import { useTranslations } from 'next-intl';

interface DeleteAccountButtonProps {
    userId: number;
}

const DeleteAccountButton = ({ userId }: DeleteAccountButtonProps) => {
    const t = useTranslations('Profile');
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const deleteAccountHandler = async () => {
        try {
            setIsDeleting(true);
            await axios.delete(`/api/users/${userId}`);
            await axios.get(`/api/users/logout`);

            toast.success(t('success_delete'));
            router.replace('/');
            router.refresh();
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "Internal server error");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="w-full mt-10 pt-10 border-t border-gray-100 dark:border-slate-700">
            <div className="text-center mb-6">
                <h4 className="text-rose-600 dark:text-rose-400 font-black uppercase tracking-widest text-sm mb-2">
                    {t('delete_account')}
                </h4>
                <p className="text-gray-500 dark:text-gray-400 text-xs italic">
                    {t('delete_account_desc')}
                </p>
            </div>

            <button
                onClick={() => setShowConfirm(true)}
                className="w-full py-4 bg-rose-50 dark:bg-rose-900/10 text-rose-600 dark:text-rose-500 font-black rounded-2xl hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white transition-all active:scale-95 border border-rose-100 dark:border-rose-900/20 uppercase tracking-widest text-xs"
            >
                {t('delete_account')}
            </button>

            <ConfirmationModal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={deleteAccountHandler}
                title={t('delete_account')}
                message={t('delete_account_confirm')}
                isLoading={isDeleting}
                confirmText={t('delete_account')}
            />
        </div>
    );
};

export default DeleteAccountButton;
