import { getTranslations } from 'next-intl/server';

const AboutPage = async () => {
  const t = await getTranslations('AboutPage');
  return (
    <section className="min-h-[calc(100vh-140px)] bg-white dark:bg-slate-950 py-20 px-6 transition-colors duration-300">
      <div className="container m-auto max-w-4xl">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter">
            {t('title')}
          </h1>
          <p className="text-gray-600 dark:text-slate-400 text-xl md:text-2xl leading-relaxed italic max-w-2xl m-auto">
            {t('desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-gray-50 dark:bg-slate-900/50 p-10 rounded-[2.5rem] border border-gray-200 dark:border-slate-800 hover:border-blue-500/30 transition-all duration-500 shadow-sm dark:shadow-none">
            <h2 className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-6 tracking-tight uppercase">
              {t('about_mission_title')}
            </h2>
            <p className="text-gray-700 dark:text-slate-300 text-lg leading-relaxed font-medium">
              {t('about_mission_desc')}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-slate-900/50 p-10 rounded-[2.5rem] border border-gray-200 dark:border-slate-800 hover:border-purple-500/30 transition-all duration-500 shadow-sm dark:shadow-none">
            <h2 className="text-3xl font-black text-purple-600 dark:text-purple-400 mb-6 tracking-tight uppercase">
              {t('about_vision_title')}
            </h2>
            <p className="text-gray-700 dark:text-slate-300 text-lg leading-relaxed font-medium">
              {t('about_vision_desc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage;