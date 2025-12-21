import { Article, Comment } from "@/generated/prisma/client"


export type JWTPAYLOAD = {
    id: number,
    email: string,
    isAdmin: boolean,
    username: string,
}


export type CommentWithUser = Comment & { user: { username: string } }
export type SingleArticle = Article & { comments: CommentWithUser[] }