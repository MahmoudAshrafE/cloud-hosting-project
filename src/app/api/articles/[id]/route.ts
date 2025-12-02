
import prisma from "@/utils/db";

import { UpdateArticleDto } from "@/utils/dtos";
import { createArticleSkhema } from "@/utils/validationSchemas";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/articles/:id
 * @desc Get Single Article
 * @access public 
 */


export async function GET(request: NextRequest,  context: { params: Promise<{ id: string }> } ) {
        const {id} = await context.params

    try {
        const article = await prisma.article.findUnique(
            {
                 where: { id: parseInt(id) },
                 include: {
                    comments: {
                        include:{
                            user: {
                                select: {
                                    username: true
                                }
                            }
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }
                 }
         },)

        if (!article) {
            return NextResponse.json({ message: "article not found" }, { status: 404 })
        }

        return NextResponse.json(article, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "internal server error" },
            { status: 500 }
        )
    }
}


/**
 * @method PUT
 * @route ~/api/articles/:id
 * @desc Update Single Article
 * @access private (only admin can update article) 
 */


export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
        const {id} = await context.params

    try {
        const user = verifyToken(request)
        if (!user || !user.isAdmin) {
            return NextResponse.json({ message: "Only Admin can update article, acces denied" }, { status: 403 })
        }
        const article = await prisma.article.findUnique(
            {
                where: { id: parseInt(id) }
            }
        )

        if (!article) {
            return NextResponse.json({ message: "article not found" }, { status: 404 })
        }

        const body = (await request.json()) as UpdateArticleDto

        const validation = createArticleSkhema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.issues[0].message },
                { status: 400 }
            );
        }

        const updatedArticle = await prisma.article.update({
            where: { id: parseInt(id) },
            data: {
                title: body.title,
                description: body.description
            }
        })

        return NextResponse.json(updatedArticle, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "internal server error" },
            { status: 500 }
        )
    }
}


/**
 * @method DELETE
 * @route ~/api/articles/:id
 * @desc Delete  Article
 * @access private (only admin can delete article) 
 */


export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
        const {id} = await context.params

    try {
        const user = verifyToken(request)
        if (!user || !user.isAdmin) {
            return NextResponse.json({ message: "Only Admin can delete article, acces denied" }, { status: 403 })
        }
        const article = await prisma.article.findUnique(
            {
                where: { id: parseInt(id) },
                include: {comments: true}
            }
        )

        if (!article) {
            return NextResponse.json({ message: "article not found" }, { status: 404 })
        }

        await prisma.article.delete({
            where: { id: parseInt(id) }
        })
        const commentIds = article.comments?.map(comment => comment.id)

        await prisma.comment.deleteMany({
            where: {id: {in: commentIds}}
        })

        return NextResponse.json({ message: "article deleted" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "internal server error" },
            { status: 500 }
        )
    }
}