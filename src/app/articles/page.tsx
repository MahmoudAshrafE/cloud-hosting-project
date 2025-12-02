import { getArticles, getArticlesCount } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { ARTICLE_PER_PAGE } from "@/utils/constants";

interface ArticlesPageProps {
  searchParams: Promise<{ pageNumber?: string }>;
}

 
const ArticlesPage = async ({searchParams} : ArticlesPageProps) => {
  const params = await searchParams;
  const pageNumber = parseInt(params.pageNumber || "1"); 


 const articles = await getArticles(pageNumber.toString())

const count: number = await getArticlesCount()

 const pages = Math.ceil(count / ARTICLE_PER_PAGE)

  return (
    <section className="fix-height container m-auto px-5">
      <SearchArticleInput />
      <div className="flex items-center justify-center flex-wrap gap-7">

            {articles.map(item =>
            <ArticleItem article={item} key={item.id} />
          )}



        <Pagination pageNumber={parseInt(pageNumber.toString()) } route="/articles" pages={pages}/>
      </div>

    </section>
  )
}

export default ArticlesPage