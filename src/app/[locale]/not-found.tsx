'use client';
import React from 'react'
import { Link } from "@/i18n/navigation";
import { useTranslations } from 'next-intl';
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';

const NotFoundPage = () => {
  const t = useTranslations('NotFound');

  return (
    <section className='min-h-screen flex items-center justify-center p-6 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors'>
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-2xl p-12 md:p-20 rounded-[3.5rem] border border-gray-100 dark:border-slate-800 shadow-2xl flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-3xl flex items-center justify-center text-5xl mb-10 animate-bounce">
          <FaExclamationTriangle />
        </div>

        <h1 className='text-6xl md:text-8xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter uppercase'>
          {t('title')}
        </h1>

        <p className='text-gray-500 dark:text-slate-400 text-xl font-medium mb-12 max-w-md italic leading-relaxed'>
          {t('desc')}
        </p>

        <Link
          href='/'
          className='flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-xl font-black rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all uppercase tracking-widest'
        >
          <FaArrowLeft className="text-lg" />
          {t('back_home')}
        </Link>

        <div className="mt-16 text-[100px] font-black text-gray-100 dark:text-slate-800/20 select-none absolute -bottom-10 opacity-50 z-[-1] tracking-tighter">
          404
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage
