import { getSingleArticle } from "@/utils/data-access/articles";
import AddcommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { verifyTokenBerPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { getTranslations } from 'next-intl/server';


const SingleArticlePage = async (context: { params: Promise<{ id: string }> }) => {
  const { id } = await context.params
  const token = (await cookies()).get("jwtToken")?.value || ""
  const payload = verifyTokenBerPage(token)
  const t = await getTranslations('ArticleDetails');

  const article = await getSingleArticle(id);
  if (!article) {
    // You might want to import notFound from next/navigation
    return (
      <section className="fix-height container m-auto px-5 pt-8">
        <h1 className="text-3xl font-bold text-gray-700 mb-2">{t('not_found')}</h1>
      </section>
    )
  }

  return (
    <section className="fix-height bg-white dark:bg-slate-950 transition-colors pb-20">
      <div className="container m-auto w-full px-5 py-8 md:w-2/3">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg mb-10 border border-gray-100 dark:border-slate-700 transition-colors">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3 leading-tight">{article?.title}</h1>
          <div className="text-gray-500 dark:text-gray-400 font-medium mb-6">
            {new Date(article.createdAt).toDateString()}
          </div>
          {article.image && (
            <div className="relative w-full overflow-hidden rounded-xl shadow-md border border-gray-200 dark:border-slate-700">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>
          )}
          <p className="text-gray-700 dark:text-gray-300 text-xl leading-relaxed mt-8 whitespace-pre-line font-light">{article?.description}</p>
        </div>

        <div className="mb-10">
          {
            payload ? (<AddcommentForm articleId={article.id} />) : (<div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl text-blue-700 dark:text-blue-300 font-bold border-2 border-blue-50 dark:border-blue-900/20 shadow-sm">{t('login_to_comment')} ✨😃</div>)
          }
        </div>

        <div className="border-t border-gray-200 dark:border-slate-700 pt-8 mt-8">
          <h4 className="text-2xl text-gray-900 dark:text-white font-bold mb-6 flex items-center gap-2">
            {t('comments_title')}
            <span className="bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 text-base font-bold px-4 py-1 rounded-full border border-gray-100 dark:border-slate-700 shadow-sm">
              {article?.comments?.length || 0}
            </span>
          </h4>
          <div className="space-y-4">
            {article?.comments?.map(comment => (
              <CommentItem key={comment?.id} comment={comment} userId={payload?.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SingleArticlePage