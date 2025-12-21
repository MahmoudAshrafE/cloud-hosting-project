'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import ButtonSpiner from '@/components/ButtonSpiner';
import { Link } from '@/i18n/navigation';

const ForgotPasswordForm = () => {
    const t = useTranslations('Auth');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            return toast.error(t('email_required'));
        }

        try {
            setLoading(true);
            const { data } = await axios.post('/api/users/forgot-password', { email });
            toast.success(data.message);
            setIsSent(true);
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (isSent) {
        return (
            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-3xl border border-blue-100 dark:border-blue-800 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-xl shadow-blue-500/30">
                    ✉️
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">
                    {t('check_email_title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium italic">
                    {t.rich('check_email_desc', {
                        email: email,
                        email_tag: (chunks) => <span className="text-blue-600 dark:text-blue-400 font-bold">{chunks}</span>
                    })}
                </p>
                <button
                    onClick={() => setIsSent(false)}
                    className="mt-8 text-blue-600 dark:text-blue-400 font-black uppercase text-xs tracking-widest hover:underline"
                >
                    {t('didnt_receive_email')}
                </button>

                {/* Developer / Testing Link */}
                <div className="mt-10 pt-6 border-t border-gray-100 dark:border-slate-800/50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Developer Preview</p>
                    <Link
                        href={`/reset-password?email=${email}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 text-rose-500 rounded-full text-xs font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all border border-rose-500/20"
                    >
                        Test Reset Page Directly →
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest px-1">
                    {t('email_label')}
                </label>
                <input
                    type="email"
                    className="rounded-2xl p-4 text-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                    placeholder={t('email_placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                        <span>{t('processing')}</span>
                    </div>
                ) : t('reset_password_btn')}
            </button>
        </form>
    );
};

export default ForgotPasswordForm;
