'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLanguage = () => {
        const newLocale = locale === 'en' ? 'ar' : 'en';
        // Replace the locale in the pathname
        // Assuming pathname starts with /en or /ar. 
        // If using hidden locale for default, logic might differ, but with middleware config simple replace usually works or usage of next-intl navigation

        // Better approach: strip locale and append new one
        const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
        const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;

        router.replace(newPath);
    };

    return (
        <button
            onClick={switchLanguage}
            className="px-4 py-1.5 border border-slate-700 hover:border-blue-500 hover:text-blue-400 rounded-xl text-xs font-black transition-all uppercase tracking-widest text-slate-400"
        >
            {locale === 'en' ? 'AR' : 'EN'}
        </button>
    );
}
