import prisma from "@/utils/db";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { Article } from "@/generated/prisma/client";
import { SingleArticle } from "@/utils/types";


// Get Articles with Pagination
export async function getArticles(pageNumber: string | undefined): Promise<Article[]> {
    const page = parseInt(pageNumber || "1");
    const articles = await prisma.article.findMany({
        skip: ARTICLE_PER_PAGE * (page - 1),
        take: ARTICLE_PER_PAGE,
        orderBy: { createdAt: 'desc' }
    });
    return articles;
}

// Get Articles by Search Text
export async function getArticlesBySearch(textSearch: string): Promise<Article[]> {
    const articles = await prisma.article.findMany({
        where: {
            title: {
                contains: textSearch,
                mode: 'insensitive'
            }
        }
    });
    return articles;
}

// Get Count of Articles
export async function getArticlesCount(): Promise<number> {
    const count = await prisma.article.count();
    return count;
}

// Get Single Article
export async function getSingleArticle(id: string): Promise<SingleArticle | null> {
    const article = await prisma.article.findUnique({
        where: { id: parseInt(id) },
        include: {
            comments: {
                include: {
                    user: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    });
    return article as SingleArticle;
}
