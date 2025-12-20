
import { getArticles, getArticlesCount } from "@/utils/data-access/articles";
import Pagination from '@/components/articles/Pagination';
import { FaEdit } from "react-icons/fa"
import { Article } from '@/generated/prisma/client';
import { ARTICLE_PER_PAGE } from '@/utils/constants';
import { protectAdmin } from '@/utils/protectAdmin';
import Link from 'next/link';
import React from 'react'
import DeleteArticleButton from './DeleteArticleButton';
import { getTranslations } from 'next-intl/server';


interface AdminArticleTableProps {
  searchParams: Promise<{ pageNumber?: string }>;
}
const adminArticleTable = async ({ searchParams }: AdminArticleTableProps) => {
  await protectAdmin();
  const t = await getTranslations('Table');
  const tAdmin = await getTranslations('Admin');

  const params = await searchParams;
  const pageNumber = parseInt(params.pageNumber || "1");

  const articles: Article[] = await getArticles(pageNumber.toString())

  const count: number = await getArticlesCount()
  const pages = Math.ceil(count / ARTICLE_PER_PAGE)

  return (
    <section className='flex flex-col gap-10'>
      <div className="flex items-center justify-between">
        <h1 className='text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase'>{t('articles_title')}</h1>
        <div className="hidden md:flex items-center gap-3 px-6 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-800/50">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-sm font-bold text-blue-700 dark:text-blue-300">{tAdmin('admin_management')}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className='w-full text-left'>
            <thead className='bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800'>
              <tr>
                <th className='p-8 text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest'>{t('title')}</th>
                <th className='hidden lg:table-cell p-8 text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest'>{t('created_at')}</th>
                <th className='p-8 text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest'>{t('actions')}</th>
                <th className='hidden lg:table-cell p-8'></th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100 dark:divide-slate-800'>
              {
                articles.map(article => (
                  <tr key={article.id} className='group hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-all duration-300'>
                    <td className='p-8'>
                      <span className='text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>{article.title}</span>
                    </td>
                    <td className='hidden lg:table-cell p-8'>
                      <span className='text-gray-500 dark:text-gray-400 font-medium'>{new Date(article.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td className='p-8'>
                      <div className="flex gap-4">
                        <Link href={`/admin/articles-table/edit/${article.id}`} className='bg-emerald-50 content-center dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl p-4 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-all shadow-sm active:scale-95'>
                          <FaEdit className="text-xl" />
                        </Link>
                        <DeleteArticleButton articleId={article.id} />
                      </div>
                    </td>
                    <td className='hidden lg:table-cell p-8 text-right'>
                      <Link href={`/articles/${article.id}`} className='inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white font-bold rounded-2xl hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all active:scale-95'>
                        {t('read_more')}
                        <span>→</span>
                      </Link>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center">
        <Pagination route='/admin/articles-table' pages={pages} pageNumber={pageNumber} />
      </div>
    </section>
  )
}

export default adminArticleTable