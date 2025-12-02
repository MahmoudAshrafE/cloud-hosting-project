import { getArticlesBySearch } from "@/apiCalls/articleApiCall"
import ArticleItem from "@/components/articles/ArticleItem"
import { Article } from "@/generated/prisma/client"

interface SearchArticleProps {
  searchParams: { searchText: string }
}

const SearchArticlePage = async ({ searchParams }: SearchArticleProps) => {
  const articles: Article[] = await getArticlesBySearch(searchParams.searchText)

  return (
    <section className="fix-height container m-auto px-5">
      {articles.length === 0 ? (
        <h2 className="text-gray-800 text-2xl font-bold px-5 text-center mt-7">
          Articles based on 
          <span className="text-red-500 mx-1 ">
            {searchParams.searchText}
          </span>
            not found
        </h2>
      ) : (
        <>
          <h1 className="text-2xl text-center mb-2 mt-7 text-gray-800">
            Articles based on
            <span className="ms-1 text-green-700 text-3xl font-bold">{searchParams.searchText}</span>
          </h1>

          <div className="flex items-center justify-center flex-wrap gap-7 mt-7">
            {articles.map(item =>
              <ArticleItem article={item} key={item.id} />
            )}
          </div>
        </>
      )}
    </section>
  )
}

export default SearchArticlePage