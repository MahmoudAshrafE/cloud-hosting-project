'use client'
import { Link, usePathname } from '@/i18n/navigation'
import React from 'react'
import { CgMenuGridR } from 'react-icons/cg'
import { FaRegComments } from 'react-icons/fa'
import { MdOutlineArticle } from 'react-icons/md'
import { FiUsers } from 'react-icons/fi'
import { useTranslations } from 'next-intl';

interface AdminSidebarProps {
  onClose?: () => void;
}

const AdminSidebar = ({ onClose }: AdminSidebarProps) => {
  const t = useTranslations('Admin');
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: t('dashboard'), icon: <CgMenuGridR /> },
    { href: '/admin/users-table', label: t('users'), icon: <FiUsers /> },
    { href: '/admin/articles-table?pageNumber=1', label: t('articles'), icon: <MdOutlineArticle /> },
    { href: '/admin/comments-table', label: t('comments'), icon: <FaRegComments /> },
  ];

  return (
    <div className='flex flex-col h-full'>
      <div className='flex items-center justify-center lg:justify-start mb-10'>
        <div className='bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20'>
          <CgMenuGridR className='text-3xl text-white' />
        </div>
        <span className='ms-3 text-lg md:text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter'>
          {t('admin_panel')}
        </span>
      </div>

      <ul className='flex flex-col gap-2'>
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href.split('?')[0]));

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 group
                  ${isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
              >
                <span className={`text-2xl transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                  {link.icon}
                </span>
                <span className='font-black uppercase tracking-widest text-[11px] md:text-sm truncate'>
                  {link.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto hidden lg:block">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-3xl border border-blue-100 dark:border-blue-800/50">
          <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">{t('need_help')}</h4>
          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{t('support_desc')}</p>
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar