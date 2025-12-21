import Image from 'next/image'
import CloudImage from '../../../public/cloud-hosting.png'
import { TiTick } from 'react-icons/ti'
import { getTranslations } from 'next-intl/server';

const Hero = async () => {
    const t = await getTranslations('HomePage');
    return (
        <div className="relative overflow-hidden flex flex-col md:flex-row items-center justify-around px-8 py-20 md:py-32 bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:to-slate-900 transition-all duration-700">
            {/* Background Light Effect - Dark Mode Only */}
            <div className="hidden dark:block absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none animate-pulse"></div>
            <div className="hidden dark:block absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>

            <div className="flex-1 max-w-3xl relative z-10">
                <div className="inline-flex items-center gap-2 px-6 py-2 mb-10 text-xs font-black tracking-[0.3em] text-blue-600 dark:text-blue-400 uppercase bg-gray-50 dark:bg-blue-900/30 rounded-full border border-gray-100 dark:border-blue-800 shadow-sm">
                    <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping"></span>
                    {t('premium_badge')}
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white mb-6 leading-[1.1] tracking-tighter">
                    {t('hero_title').split(' ').map((word, i) => (
                        <span key={i} className={word.toLowerCase() === 'cloud' || word.toLowerCase() === 'hosting' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200' : ''}>
                            {word}{' '}
                        </span>
                    ))}
                </h1>
                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl leading-relaxed font-bold">
                    {t('hero_desc')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[t('easy_panel'), t('secure_hosting'), t('website_maintenance'), t('support_badge')].map((service, i) => (
                        <div key={i} className="flex items-center text-[19px] font-black text-gray-900 dark:text-gray-100 group uppercase tracking-tight">
                            <div className="flex items-center justify-center w-10 h-10 mr-4 bg-gray-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl border border-gray-100 dark:border-transparent group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                                <TiTick className="text-2xl" />
                            </div>
                            {service}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-20 md:mt-0 relative z-10 flex justify-center">
                <div className="relative animate-float transition-all duration-1000">
                    {/* Floating image decoration - Dark Mode Only */}
                    <div className="hidden dark:block absolute -top-10 -right-10 w-24 h-24 bg-blue-500/20 blur-3xl rounded-full"></div>
                    <div className="hidden dark:block absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 blur-[100px] rounded-full"></div>

                    <Image
                        src={CloudImage}
                        alt='Cloud Hosting Dashboard'
                        width={650}
                        height={650}
                        className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 brightness-105 dark:brightness-100 dark:contrast-110"
                        priority
                    />
                </div>
            </div>
        </div>
    )
}

export default Hero