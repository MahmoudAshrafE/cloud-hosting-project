import { TiTick } from "react-icons/ti"
import { getTranslations } from 'next-intl/server';

const WebHostingPlan = async () => {
    const t = await getTranslations('HomePage');
    return (
        <div className="group relative flex flex-col items-center justify-center w-full max-w-sm rounded-[3rem] p-12 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm glow-hover hover:-translate-y-4 transition-all duration-700 overflow-hidden mb-10">
            {/* Decorative background element */}
            <div className="hidden dark:block absolute top-0 right-0 w-32 h-32 bg-purple-500/10 dark:bg-purple-400/10 blur-3xl rounded-full"></div>
            <div className="hidden dark:block absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 dark:bg-blue-400/10 blur-3xl rounded-full"></div>

            <div className="relative z-10 w-full flex flex-col items-center">
                <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-6 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase">
                    {t('premium')}
                </h3>
                <div className="flex items-baseline justify-center gap-1 mb-6">
                    <span className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter group-hover:scale-110 transition-transform duration-500">{t('price')}</span>
                </div>

                <div className="inline-flex items-center gap-3 bg-gray-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full px-6 py-2 font-black text-sm mb-10 border border-red-100 dark:border-red-800/50 shadow-sm">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse"></span>
                    {t('discount')}
                </div>

                <div className="space-y-5 mb-12 text-left w-full">
                    <h5 className="text-sm font-black text-gray-400 dark:text-gray-500 mb-6 px-2 uppercase tracking-widest">
                        {t('top_features')}
                    </h5>
                    {[
                        t('feature_websites'),
                        t('feature_storage'),
                        t('feature_backups'),
                        t('feature_bandwidth'),
                        t('feature_ssl'),
                        t('feature_email')
                    ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-4 text-gray-700 dark:text-gray-300 font-bold px-2 group/item">
                            <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gray-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover/item:scale-110 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all duration-500 border border-gray-100 dark:border-transparent shadow-sm">
                                <TiTick className="text-2xl" />
                            </div>
                            <span className="text-[17px] tracking-tight">{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="w-full">
                    <button className="w-full relative overflow-hidden group/btn px-10 py-5 bg-blue-600 dark:bg-blue-700 text-white font-black rounded-2xl shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 active:scale-95 text-lg uppercase tracking-wider">
                        <span className="relative z-10 font-black">{t('buy_now')}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                    </button>
                    <p className="text-center mt-5 text-gray-400 dark:text-gray-500 text-xs font-black uppercase tracking-[0.2em]">
                        {t('no_card')}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default WebHostingPlan