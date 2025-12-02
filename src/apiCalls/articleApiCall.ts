import { Article } from "@/generated/prisma/client";
import { DOMAIN } from "@/utils/constants";
import { SingleArticle } from "@/utils/types";


// Get Article passed page Number
 export async function getArticles(pageNumber: string | undefined): Promise<Article []>{
      const response = await fetch(`http://localhost:3000/api/articles?pageNumber=${pageNumber}`,
        { cache: 'no-store'}
      )

  if (!response.ok) {
    throw new Error("Failed to fetch articles")
  }
   return response.json();
  }

  // Get Article passed textSearch
 export async function getArticlesBySearch(textSearch: string ): Promise<Article []>{
      const response = await fetch(`${DOMAIN}/api/articles/search?textSearch=${textSearch}`)

  if (!response.ok) {
    throw new Error("Failed to fetch articles")
  }
   return response.json();
  }

  //Get Count Of The Article
   export async function getArticlesCount(): Promise<number>{
      const response = await fetch(`${DOMAIN}/api/articles/count`,{cache: 'no-store'})

  if (!response.ok) {
    throw new Error("Failed to get articles count")
  }
   const {count} = await response.json() as {count: number};
   return count
  }

  //Get Single Article
   export async function getSingleArticle(articleId: string) :Promise<SingleArticle>{
      const response = await fetch(`${DOMAIN}/api/articles/${articleId}`,{cache: 'no-store'})
      if (!response.ok) {
        throw new Error("Failed to fetch article")
      }
    
      return response.json();
  }
