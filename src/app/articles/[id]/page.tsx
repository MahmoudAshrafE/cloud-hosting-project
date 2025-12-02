import { getSingleArticle } from "@/apiCalls/articleApiCall";
import AddcommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { SingleArticle } from "@/utils/types";
import { verifyTokenBerPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";


const SingleArticlePage = async (context: { params: Promise<{ id: string }> }) => {
  const {id} = await context.params
  const token = (await cookies()).get("jwtToken")?.value || ""
  const payload = verifyTokenBerPage(token)
      const article: SingleArticle = await getSingleArticle(id);

  return (
    <section className="fix-height container m-auto w-full px-5 pt-8 md:w-3/4">
        <div className="bg-white p-7 rounded-lg mb-7">
        <h1 className="text-3xl font-bold text-gray-700 mb-2">{article?.title}</h1>
        <div className="text-gray-400">
          {new Date(article.createdAt).toDateString()}
        </div>
        <p className="text-gray-800 text-xl mt-5">{article?.description}</p>
        </div>
        {
          payload ? (<AddcommentForm articleId={article.id} />) : (<p className="text-blue-600 md:text-xl">to write  a comment you should log in first✨😃</p>)
        }
        <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
          Comments
        </h4>
        {article?.comments?.map(comment => (
        <CommentItem key={comment?.id} comment={comment} userId={payload?.id}/>
        ))}
    </section>
  )
}

export default SingleArticlePage