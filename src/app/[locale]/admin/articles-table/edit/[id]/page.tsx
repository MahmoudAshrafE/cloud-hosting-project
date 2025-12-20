import { getSingleArticle } from "@/utils/data-access/articles";
import { protectAdmin } from "@/utils/protectAdmin";
import React from "react";
import EditArticleForm from "./EditArticleForm";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

const EditArticlePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  await protectAdmin();
  const { id } = await params;
  const article = await getSingleArticle(id);
  const t = await getTranslations('Admin');

  if (!article) {
    notFound();
  }

  return (
    <section className='flex items-center justify-center'>
      <div className='bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl relative overflow-hidden w-full max-w-2xl'>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-400/5 blur-[100px] rounded-full"></div>
        <h2 className='text-3xl font-black text-gray-900 dark:text-white mb-10 text-center tracking-tight relative z-10'>
          ✨ {t('edit_article')}
        </h2>
        <div className="relative z-10">
          <EditArticleForm article={article} />
        </div>
      </div>
    </section>
  )
}

export default EditArticlePage