import { getAllComments, CommentWithUser } from '@/apiCalls/adminApiCall';
import { verifyTokenBerPage } from '@/utils/verifyToken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'
import DeleteCommentButton from './DeleteCommentButton';
import { getTranslations } from 'next-intl/server';

const adminCommentTable = async () => {
  const token = (await cookies()).get("jwtToken")?.value;
  const t = await getTranslations('Table');

  if (!token) {
    redirect("/");
  }

  const payload = verifyTokenBerPage(token);

  if (!payload?.isAdmin) {
    redirect("/");
  }


  const comments: CommentWithUser[] = await getAllComments(token)
  return (
    <section className='flex flex-col gap-10'>
      <div className="flex items-center justify-between">
        <h1 className='text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase'>{t('comments_title')}</h1>
        <div className="flex items-center gap-3 px-6 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-full border border-emerald-100 dark:border-emerald-800/50">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Total: {comments.length}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className='w-full text-left'>
            <thead className='bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800'>
              <tr>
                <th className='p-8 text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest'>{t('username')}</th>
                <th className='p-8 text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest'>{t('comment_text')}</th>
                <th className='hidden lg:table-cell p-8 text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest'>{t('created_at')}</th>
                <th className='p-8 text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest text-center'>{t('actions')}</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100 dark:divide-slate-800'>
              {
                comments.map(comment => (
                  <tr key={comment.id} className='group hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-all duration-300'>
                    <td className='p-8'>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-sm border border-blue-200 dark:border-blue-800">
                          {comment.user.username.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-black text-gray-900 dark:text-white tracking-tight">
                          {comment.user.username}
                        </span>
                      </div>
                    </td>
                    <td className='p-8 max-w-md'>
                      <span className='text-lg font-bold text-gray-500 dark:text-slate-400 line-clamp-2 leading-relaxed italic'>"{comment.text}"</span>
                    </td>
                    <td className='hidden lg:table-cell p-8'>
                      <span className='text-gray-400 dark:text-gray-500 font-bold text-sm tracking-tighter'>{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td className='p-8 text-center'>
                      <DeleteCommentButton commentId={comment.id} />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default adminCommentTable