import Hero from "@/components/home/Hero"
import WebHostingPlan from "@/components/home/WebHostingPlan"
import StatsSection from "@/components/home/StatsSection"
import FeaturesSection from "@/components/home/FeaturesSection"
import { getTranslations } from 'next-intl/server';


const HomePage = async () => {
  const t = await getTranslations('HomePage');
  return (
    <section className="bg-white dark:bg-slate-950 transition-colors pb-20">
      <Hero />
      <StatsSection />

      <div className="container mx-auto px-5 mt-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            {t('choose_plan')}
          </h2>
          <div className="w-24 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
        </div>

        <div className="flex justify-center items-stretch my-7 flex-wrap gap-10">
          <WebHostingPlan />
          <WebHostingPlan />
          <WebHostingPlan />
        </div>
      </div>

      <FeaturesSection />
    </section>
  )
}

export default HomePage