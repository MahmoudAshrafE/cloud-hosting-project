import React from 'react'
import { getTranslations } from 'next-intl/server';

const Footer = async () => {
  const t = await getTranslations('Footer');
  return (
    <footer className="w-full py-16 bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800 transition-colors">
      <div className="container mx-auto px-6 flex flex-col items-center gap-8">
        <div className="flex items-center gap-1 text-2xl md:text-3xl font-black mb-2 transition-all hover:scale-105 duration-500">
          <span className="text-blue-600 dark:text-blue-400">CLOUD</span>
          <span className="text-gray-900 dark:text-white">HOSTING</span>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-[10px] md:text-xs font-black text-gray-400 dark:text-slate-600 uppercase tracking-[0.4em] text-center">
            {t('copyright')}
          </p>
          <div className="h-1 w-12 bg-blue-600/20 dark:bg-blue-400/10 rounded-full"></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer