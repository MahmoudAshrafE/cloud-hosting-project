import { getTranslations } from 'next-intl/server';
import React from 'react';

const ForgotPasswordPage = async () => {
    const t = await getTranslations('Auth');
    return (
        <section className="flex flex-col items-center justify-center py-20 px-6">
            <div className="w-full max-w-lg bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl relative overflow-hidden transition-all duration-500">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 dark:bg-blue-400/5 blur-[80px] rounded-full"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-6 tracking-tight text-center">
                        {t('forgot_password_title')}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-10 text-center font-bold leading-relaxed">
                        {t('forgot_password_desc')}
                    </p>
                    <form className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest px-1">
                                {t('email_placeholder')}
                            </label>
                            <input
                                type="email"
                                className="rounded-2xl p-4 text-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder={t('email_placeholder')}
                            />
                        </div>
                        <button type="submit" className="text-xl font-black text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-2xl p-4 cursor-pointer shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-1 transition-all active:scale-95 uppercase tracking-wide">
                            {t('reset_password_btn')}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ForgotPasswordPage;
