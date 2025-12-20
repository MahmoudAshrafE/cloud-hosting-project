import { useTranslations } from 'next-intl'
import React from 'react'
import { FaRocket, FaShieldAlt, FaClock, FaCloud, FaCogs, FaChartLine } from 'react-icons/fa'

const FeaturesSection = () => {
    const t = useTranslations('HomePage');
    const features = [
        { icon: <FaRocket />, title: t('feat_fast_title'), desc: t('feat_fast_desc') },
        { icon: <FaShieldAlt />, title: t('feat_secure_title'), desc: t('feat_secure_desc') },
        { icon: <FaClock />, title: t('feat_uptime_title'), desc: t('feat_uptime_desc') },
        { icon: <FaCloud />, title: t('feat_cloud_title'), desc: t('feat_cloud_desc') },
        { icon: <FaCogs />, title: t('feat_manage_title'), desc: t('feat_manage_desc') },
        { icon: <FaChartLine />, title: t('feat_stats_title'), desc: t('feat_stats_desc') },
    ];

    return (
        <section className='container mx-auto px-5 py-32'>
            <div className='text-center max-w-3xl mx-auto mb-20'>
                <h2 className='text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight'>
                    {t('features_title')}
                </h2>
                <p className='text-xl text-gray-600 dark:text-gray-400 font-bold leading-relaxed'>
                    {t('features_desc')}
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
                {features.map((feature, i) => (
                    <div key={i} className='premium-card group p-12 rounded-[2.5rem] relative overflow-hidden bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500'>
                        <div className='hidden dark:block absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-400/5 blur-3xl rounded-full group-hover:bg-blue-500/10 transition-colors'></div>

                        <div className='relative z-10'>
                            <div className='w-20 h-20 bg-gray-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center rounded-2xl text-4xl mb-10 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm border border-gray-100 dark:border-transparent'>
                                {feature.icon}
                            </div>
                            <h3 className='text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                                {feature.title}
                            </h3>
                            <p className='text-gray-800 dark:text-gray-400 font-bold leading-relaxed text-lg'>
                                {feature.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FeaturesSection
