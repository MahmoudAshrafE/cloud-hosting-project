import { cookies } from 'next/headers'
import { Link } from '@/i18n/navigation'
import Navbar from './Navbar'
import { verifyTokenBerPage } from '@/utils/verifyToken'
import HeaderContent from './HeaderContent'
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { getTranslations } from 'next-intl/server';

const Header = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const payload = verifyTokenBerPage(token)
  const t = await getTranslations('Navbar');


  return (
    <header className="sticky top-0 h-24 flex items-center justify-between px-6 lg:px-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 shadow-sm z-50 transition-all duration-500">
      <Navbar isAdmin={payload?.isAdmin} isLoggedIn={!!payload} translations={{
        logo_cloud: t('logo_cloud'),
        logo_hosting: t('logo_hosting'),
        home: t('home'),
        articles: t('articles'),
        about: t('about'),
        dashboard: t('dashboard'),
        login: t('login'),
        register: t('register')
      }} />
      <div className="flex items-center gap-3 lg:gap-8">
        <div className="flex items-center gap-2 lg:gap-4 pr-3 lg:pr-6 border-r border-gray-200 dark:border-slate-800">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
        {
          payload ? (
            <HeaderContent payload={payload} />
          ) : (
            <div className="hidden md:flex items-center gap-2 lg:gap-4">
              <Link className="px-4 py-2 lg:px-5 lg:py-2.5 text-gray-700 dark:text-white font-black hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-widest text-[12px] lg:text-[13px]" href='/login'>{t('login')}</Link>
              <Link className="px-5 py-2.5 lg:px-8 lg:py-3 bg-blue-600 dark:bg-blue-700 text-white font-black rounded-xl lg:rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 dark:hover:bg-blue-600 transition-all hover:-translate-y-0.5 active:scale-95 uppercase tracking-widest text-[12px] lg:text-[13px]" href='/register'>{t('register')}</Link>
            </div>)
        }
      </div>
    </header>
  )
}

export default Header