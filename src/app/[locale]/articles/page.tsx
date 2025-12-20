import { getArticles, getArticlesCount } from "@/utils/data-access/articles";
import ArticleItem from "@/components/articles/ArticleItem";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { ARTICLE_PER_PAGE } from "@/utils/constants";

interface ArticlesPageProps {
  searchParams: Promise<{ pageNumber?: string }>;
}


import { getTranslations } from "next-intl/server";

const ArticlesPage = async ({ searchParams }: ArticlesPageProps) => {
  const params = await searchParams;
  const pageNumber = parseInt(params.pageNumber || "1");
  const articles = await getArticles(pageNumber.toString())
  const count: number = await getArticlesCount()
  const pages = Math.ceil(count / ARTICLE_PER_PAGE)

  const t = await getTranslations('ArticlesPage');

  return (
    <section className="min-h-[calc(100vh-140px)] bg-white dark:bg-slate-950 py-20 transition-colors relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container m-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter uppercase mb-6">
            {/* Cloud <span className="text-blue-600">Insights</span> */}
            {t.rich('page_title', {
              span: (chunks) => <span className="text-blue-600">{chunks}</span>
            })}
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed italic">
            {t('page_desc')}
          </p>
        </div>

        <SearchArticleInput />

        <div className="flex items-center justify-center flex-wrap gap-10 mt-20">
          {articles.map(item =>
            <ArticleItem article={item} key={item.id} />
          )}
        </div>

        <div className="mt-24 flex justify-center">
          <Pagination pageNumber={parseInt(pageNumber.toString())} route="/articles" pages={pages} />
        </div>

        {/* Newsletter Section - New Feature */}
        <div className="mt-32 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-white dark:bg-slate-900/80 backdrop-blur-3xl p-12 md:p-20 rounded-[3rem] border border-gray-100 dark:border-slate-800 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter uppercase">
              {t('newsletter_title')}
            </h2>
            <p className="text-xl text-gray-500 dark:text-slate-400 max-w-xl mb-12 font-medium">
              {t('newsletter_desc')}
            </p>
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 rounded-2xl p-6 bg-gray-50 dark:bg-slate-800/50 text-gray-900 dark:text-white border border-transparent focus:border-blue-500 outline-none transition-all text-lg font-bold"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 rounded-2xl text-xl font-black transition-all shadow-xl shadow-blue-500/20 active:scale-95 uppercase tracking-widest whitespace-nowrap">
                {t('newsletter_btn')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArticlesPage