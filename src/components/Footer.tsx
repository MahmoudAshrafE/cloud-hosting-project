import React from 'react'
import { getTranslations } from 'next-intl/server';

const Footer = async () => {
  const t = await getTranslations('Footer');
  return (
    <footer className="w-full py-12 flex items-center justify-center bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800 transition-colors">
      <p className="text-sm font-black text-gray-400 dark:text-slate-600 uppercase tracking-[0.3em]">
        {t('copyright')}
      </p>
    </footer>
  )
}

export default Footer