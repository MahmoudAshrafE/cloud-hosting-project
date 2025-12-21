"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from 'next-intl';

interface ChangePasswordProps {
    userId: number;
}
interface ApiError {
    message: string;
}

const ChangePasswordForm = ({ userId }: ChangePasswordProps) => {
    const t = useTranslations('Profile');
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentPassword || !newPassword || !confirmPassword) {
            return toast.error(t('error_required'));
        }

        if (newPassword !== confirmPassword) {
            return toast.error(t('error_mismatch'));
        }

        try {
            setLoading(true);
            await axios.put(`/api/users/profile/${userId}`, {
                password: newPassword,
                currentPassword: currentPassword
            });

            toast.success(t('success_update'));
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            router.refresh();
        } catch (error: unknown) {
            const err = error as AxiosError<ApiError>;
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input
                    type="password"
                    className="p-3 border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                    placeholder={t('current_password')}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                    type="password"
                    className="p-3 border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                    placeholder={t('new_password')}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    type="password"
                    className="p-3 border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                    placeholder={t('confirm_password')}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white p-3 font-bold rounded-xl transition-all shadow-md active:scale-95 disabled:bg-gray-400 dark:disabled:bg-slate-600"
                >
                    {loading ? t('updating') : t('update_btn')}
                </button>
            </form>
        </div>
    );
};

export default ChangePasswordForm;
