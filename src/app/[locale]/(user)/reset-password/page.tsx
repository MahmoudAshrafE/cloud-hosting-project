import { getTranslations } from 'next-intl/server';
import React from 'react';
import ResetPasswordForm from './ResetPasswordForm';
import { redirect } from '@/i18n/navigation';

interface Props {
    searchParams: { email?: string };
}

const ResetPasswordPage = async ({ searchParams }: Props) => {
    const t = await getTranslations('Auth');
    const email = searchParams?.email;

    if (!email) {
        // @ts-ignore
        redirect('/login');
    }

    return (
        <section className="flex flex-col items-center justify-center py-20 px-6">
            <div className="w-full max-w-lg bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl relative overflow-hidden transition-all duration-500">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 dark:bg-blue-400/5 blur-[80px] rounded-full"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-6 tracking-tight text-center">
                        {t('reset_password_btn')}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-10 text-center font-bold">
                        {t.rich('reset_password_for', {
                            email: email!,
                            email_tag: (chunks) => <span className="text-blue-600 dark:text-blue-400 font-black">{chunks}</span>
                        })}
                    </p>
                    <ResetPasswordForm email={email!} />
                </div>
            </div>
        </section>
    );
};

export default ResetPasswordPage;
