'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import ButtonSpiner from '@/components/ButtonSpiner';

interface Props {
    email: string;
}

const ResetPasswordForm = ({ email }: Props) => {
    const t = useTranslations('Profile');
    const authT = useTranslations('Auth');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            return toast.error(t('error_required'));
        }

        if (newPassword !== confirmPassword) {
            return toast.error(t('error_mismatch'));
        }

        try {
            setLoading(true);
            await axios.post('/api/users/reset-password', { email, newPassword });
            toast.success("Password reset successfully!");
            setTimeout(() => {
                router.replace('/login');
            }, 2000);
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest px-1">
                    {t('new_password')}
                </label>
                <input
                    type="password"
                    className="rounded-2xl p-4 text-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={loading}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest px-1">
                    {t('confirm_password')}
                </label>
                <input
                    type="password"
                    className="rounded-2xl p-4 text-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="text-xl font-black text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-2xl p-4 cursor-pointer shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-1 transition-all active:scale-95 uppercase tracking-wide disabled:opacity-70 disabled:pointer-events-none"
            >
                {loading ? (
                    <div className="flex items-center justify-center gap-2">
                        <ButtonSpiner />
                        <span>{authT('resetting')}</span>
                    </div>
                ) : authT('reset_password_btn')}
            </button>
        </form>
    );
};

export default ResetPasswordForm;
