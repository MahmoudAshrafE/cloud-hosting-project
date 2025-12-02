import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";


/**
 * @method GET
 * @route ~/api/articles/search?textSearch=value
 * @desc Get Articles By Title
 * @access public 
 */


export async function GET(request: NextRequest) {
    try {
            const textSearch = request.nextUrl.searchParams.get('textSearch')

    let articles;
    if (textSearch) {
        articles = await prisma.article.findMany({
            where: { title: {
                contains: textSearch,
                mode: "insensitive"
            } }
        })
    }
    else {
        articles = await prisma.article.findMany({
            take: 6
        })
    }
    return NextResponse.json(articles, {status: 200})
    } catch (error) {
                return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        );
    }
}