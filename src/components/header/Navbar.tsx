'use client'
import { Link } from '@/i18n/navigation'
import { useState } from 'react'
import { IoClose, IoCloudCircle } from 'react-icons/io5'
import { MdMenu } from 'react-icons/md'
import { useTranslations } from 'next-intl';

interface NavbarProps {
  isAdmin: boolean | undefined;
  translations: {
    logo_cloud: string;
    logo_hosting: string;
    home: string;
    articles: string;
    about: string;
    dashboard: string;
    login: string;
    register: string;
  }
  isLoggedIn: boolean;
}
const Navbar = ({ isAdmin, translations, isLoggedIn }: NavbarProps) => {
  const [toggle, setToggle] = useState(false)
  if (!translations) return null;

  return (
    <nav className="flex items-center justify-between w-full md:w-auto md:gap-10">
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link href="/" className="flex items-center gap-1 text-2xl font-black text-gray-900 dark:text-white">
          <IoCloudCircle className="text-4xl text-blue-600 dark:text-blue-400" />
          <span className="text-blue-600 dark:text-blue-400">{translations.logo_cloud}</span>
          <span className="text-gray-900 dark:text-white">{translations.logo_hosting}</span>
        </Link>
        <div className="md:hidden cursor-pointer text-3xl text-gray-900 dark:text-white" onClick={() => setToggle(prev => !prev)}>
          {toggle ? (<IoClose />) : (<MdMenu />)}
        </div>
      </div>

      <div className={`absolute md:static top-full left-0 w-full md:w-auto glass-effect md:bg-transparent md:dark:bg-transparent shadow-xl md:shadow-none transition-all duration-500 ease-in-out overflow-hidden z-40 ${toggle ? 'max-h-96 opacity-100 py-6' : 'max-h-0 md:max-h-full opacity-100 md:opacity-100'}`}>
        <ul className="flex flex-col md:flex-row items-center gap-8 md:gap-10 p-5 md:p-0 text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
          <Link className="hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:scale-105 active:scale-95" onClick={() => setToggle(false)} href='/'>{translations.home}</Link>
          <Link className="hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:scale-105 active:scale-95" onClick={() => setToggle(false)} href='/articles?pageNumber=1'>{translations.articles}</Link>
          <Link className="hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:scale-105 active:scale-95" onClick={() => setToggle(false)} href='/about'>{translations.about}</Link>
          {
            isAdmin && (<Link className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-all shadow-md active:scale-95" onClick={() => setToggle(false)} href='/admin'>{translations.dashboard}</Link>)
          }
          {
            !isLoggedIn && (
              <div className="flex flex-col items-center gap-4 mt-6 md:hidden w-full border-t border-gray-100 dark:border-slate-800 pt-6">
                <Link className="w-full text-center py-3 text-gray-700 dark:text-white font-black hover:text-blue-600 transition-colors uppercase tracking-widest text-sm" onClick={() => setToggle(false)} href='/login'>{translations.login}</Link>
                <Link className="w-full text-center py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 uppercase tracking-widest text-sm" onClick={() => setToggle(false)} href='/register'>{translations.register}</Link>
              </div>
            )
          }
        </ul>
      </div>

    </nav>
  )
}

export default Navbar