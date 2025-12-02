import { Article, Comment, User } from "@/generated/prisma/client"

export type JWTPAYLOAD  = {
    id: number,
    email: string,
    isAdmin: boolean,
    username: string,
}


export type CommentWithUser = Comment &  {user: User}
export type SingleArticle = Article & {comments: CommentWithUser[]}