import { getSingleArticle } from '@/apiCalls/articleApiCall'
import { Article } from '@/generated/prisma/client'
import { protectAdmin } from '@/utils/protectAdmin'
import React from 'react'
import EditArticleForm from './EditArticleForm'


const EditArticlePage = async({ params }: { params: Promise<{ id: string }> }) => {
     await protectAdmin()
  const { id } = await params; 
     const article: Article = await getSingleArticle(id);

  return (
    <section className='fix-height flex items-center justify-center px-5 lg:px-20'>
        <div className='shadow p-4 bg-gray-200 rounded w-full'>
            <h2 className='text-2xl text-green-700 font-semibold mb-4'>
                Edit Article
            </h2>
            <EditArticleForm article={article}/>
        </div>

    </section>
  )
}

export default EditArticlePage