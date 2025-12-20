
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import prisma from "@/utils/db";

import { CreateArticleDto } from "@/utils/dtos";
import { createArticleSkhema } from "@/utils/validationSchemas";
import { verifyToken } from "@/utils/verifyToken";

import { NextRequest, NextResponse } from "next/server";




/**
 * @method GET
 * @route ~/api/articles
 * @desc Get Articles By Page Number
 * @access public 
 */
export async function GET(request: NextRequest) {
    try {
        const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1"


        const articles = await prisma.article.findMany({
            skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1),
            take: ARTICLE_PER_PAGE,
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(articles, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        );
    }
}

/**
 * @method POST
 * @route ~/api/articles
 * @desc Create New Article
 * @access private  (only admin can create article) 
 */
export async function POST(request: NextRequest) {
    try {
        const user = verifyToken(request)
        if (!user || !user.isAdmin) {
            return NextResponse.json({ message: "Only Admin can create article, acces denied" }, { status: 403 })
        }
        const body = (await request.json()) as CreateArticleDto;

        const validation = createArticleSkhema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.issues[0].message },
                { status: 400 }
            );
        }

        const newArticle = await prisma.article.create({
            data: {
                title: body.title,
                description: body.description,
                image: body.image
            }
        });

        return NextResponse.json(newArticle, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        );
    }
}