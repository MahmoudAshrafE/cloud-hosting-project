import { useTranslations } from 'next-intl'
import React from 'react'
import { FaServer, FaUsers, FaGlobe, FaHeadset } from 'react-icons/fa'

const StatsSection = () => {
    const t = useTranslations('HomePage');
    const stats = [
        { icon: <FaServer />, label: t('stat_servers'), value: '25+' },
        { icon: <FaUsers />, label: t('stat_clients'), value: '100k+' },
        { icon: <FaGlobe />, label: t('stat_presence'), value: '50+' },
        { icon: <FaHeadset />, label: t('stat_support'), value: '24/7' },
    ];

    return (
        <section className='py-24 bg-gray-50/50 dark:bg-slate-900/50 border-y border-gray-100 dark:border-slate-800/50'>
            <div className='container mx-auto px-5'>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
                    {stats.map((stat, i) => (
                        <div key={i} className='group flex flex-col items-center p-10 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-blue-500/30 transition-all duration-500'>
                            <div className='text-5xl text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-125 transition-transform duration-500'>
                                {stat.icon}
                            </div>
                            <h3 className='text-5xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter'>
                                {stat.value}
                            </h3>
                            <p className='text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]'>
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default StatsSection
