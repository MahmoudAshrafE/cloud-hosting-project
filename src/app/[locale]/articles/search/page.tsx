import { getArticlesBySearch } from "@/utils/data-access/articles"
import ArticleItem from "@/components/articles/ArticleItem"
import { Article } from "@/generated/prisma/client"
import { getTranslations } from "next-intl/server"

interface SearchArticleProps {
  searchParams: Promise<{ searchText?: string }>;
}

const SearchArticlePage = async ({ searchParams }: SearchArticleProps) => {
  const { searchText = "" } = await searchParams;
  const articles: Article[] = await getArticlesBySearch(searchText)
  const t = await getTranslations('ArticlesPage');

  return (
    <section className="min-h-[calc(100vh-140px)] bg-white dark:bg-slate-950 py-24 transition-colors relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container m-auto px-6 relative z-10">
        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900/50 backdrop-blur-xl p-12 md:p-20 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-slate-800 max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center text-4xl mb-8">
              !
            </div>
            <h2 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-black text-center tracking-tighter uppercase leading-tight">
              {t('articles_based_on')} <br />
              <span className="text-red-600 dark:text-red-400">{searchText}</span> <br />
              {t('no_articles_found')}
            </h2>
            <p className="mt-8 text-gray-500 dark:text-slate-400 text-xl font-medium italic">
              Try different keywords or check your spelling.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-20">
              <span className="text-sm font-black text-blue-600 dark:text-blue-500 uppercase tracking-[0.3em] mb-4 block">Search Results</span>
              <h1 className="text-5xl md:text-7xl text-gray-900 dark:text-white font-black tracking-tighter uppercase leading-none">
                {t('articles_based_on')} <br />
                <span className="text-blue-600 dark:text-blue-500 italic decoration-blue-600/30 underline-offset-[12px] underline">
                  {searchText}
                </span>
              </h1>
            </div>

            <div className="flex items-center justify-center flex-wrap gap-10">
              {articles.map(item =>
                <ArticleItem article={item} key={item.id} />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default SearchArticlePage