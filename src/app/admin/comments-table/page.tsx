
import { getAllComments } from '@/apiCalls/adminApiCall';
import { Comment } from '@/generated/prisma/client';
import { verifyTokenBerPage } from '@/utils/verifyToken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'
import DeleteCommentButton from './DeleteCommentButton';

const adminCommentTable = async() => {
   const token = (await cookies()).get("jwtToken")?.value;
 
   if (!token) {
     redirect("/"); 
   }
 
   const payload =  verifyTokenBerPage(token);
 
   if (!payload?.isAdmin) {
     redirect("/");
   }
 

 const comments: Comment[] = await getAllComments(token)
  return (
    <section className='fix-height p-5'>
      <h1 className='mb-7 text-2xl font-semibold text-gray-700'>Articles</h1>
      <table className='table w-full text-left'>
        <thead className='border t-2 border-b-2 border-gray-500 lg:text-xl'>
          <tr>
            <th className='p-1 lg:p-2'>Comment</th>
            <th className='hidden lg:inline-block'>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            comments.map(comment => (
              <tr key={comment.id} className='border-b border-t border-gray-300'>
                <td className='p-3 text-gray-700'>{comment.text}</td>
                <td className='hidden lg:inline-block p-2 font-normal text-gray-700'>{new Date(comment.createdAt).toDateString()}</td>
                <td className='p-3'>
                  <DeleteCommentButton commentId={comment.id}/>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </section>
  )
}

export default adminCommentTable