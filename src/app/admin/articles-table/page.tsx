
import { getArticles, getArticlesCount } from '@/apiCalls/articleApiCall';
import Pagination from '@/components/articles/Pagination';
import { FaEdit } from "react-icons/fa"
import { Article } from '@/generated/prisma/client';
import { ARTICLE_PER_PAGE, DOMAIN } from '@/utils/constants';
import { protectAdmin } from '@/utils/protectAdmin';
import Link from 'next/link';
import React from 'react'
import DeleteArticleButton from './DeleteArticleButton';


interface AdminArticleTableProps {
  searchParams: Promise<{ pageNumber?: string }>;
}
const adminArticleTable = async ({ searchParams }: AdminArticleTableProps) => {
  await protectAdmin();

  const params = await searchParams;
  const pageNumber = parseInt(params.pageNumber || "1");

 const articles: Article[] = await getArticles(pageNumber.toString())

 const count: number = await getArticlesCount()
 const pages = Math.ceil(count / ARTICLE_PER_PAGE)

  return (
    <section className='fix-height p-5'>
      <h1 className='mb-7 text-2xl font-semibold text-gray-700'>Articles</h1>
      <table className='table w-full text-left'>
        <thead className='border t-2 border-b-2 border-gray-500 lg:text-xl'>
          <tr>
            <th className='p-1 lg:p-2'>Title</th>
            <th className='hidden lg:inline-block'>Created At</th>
            <th>Actions</th>
            <th className='hidden lg:inline-block'></th>
          </tr>
        </thead>
        <tbody>
          {
            articles.map(article => (
              <tr key={article.id} className='border-b border-t border-gray-300'>
                <td className='p-3 text-gray-700'>{article.title}</td>
                <td className='hidden lg:inline-block p-2 font-normal text-gray-700'>{new Date(article.createdAt).toDateString()}</td>
                <td className='p-3'>
                  <Link href={`/admin/articles-table/edit/${article.id}`} className='bg-green-600 text-white rounded-lg py-2 px-3 inline-block text-center me-2 lg:me-3 hover:bg-green-800 transition'>
                  <FaEdit/>
                  </Link>
                  <DeleteArticleButton articleId={article.id}/>
                </td>
                <td className='hidden lg:inline-block p-3'>
                  <Link href={`/articles/${article.id}`} className='text-white bg-blue-600 rounded-lg p-2 hover:bg-blue-800'>Read More</Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Pagination route='/admin/articles-table' pages={pages} pageNumber={pageNumber}/>
    </section>
  )
}

export default adminArticleTable