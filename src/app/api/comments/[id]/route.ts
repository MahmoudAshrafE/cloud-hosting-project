

import prisma from "@/utils/db";
import { UpdateCommentDto } from "@/utils/dtos";
import { updateCommentSchema } from "@/utils/validationSchemas";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method PUT
 * @route ~/api/comments
 * @desc Update A Comment
 * @access private //(only owner this comment) 
 */

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const {id} = await context.params
    try {
        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(id) }
        })
        if (!comment) {
            return NextResponse.json({ message: "Comment Not Found!" }, { status: 404 })
        }
        const user = verifyToken(request);
        if (!user || user.id !== comment.userId) {
            return NextResponse.json({ message: "Your Are Not Allowed , access denied" }, { status: 403 })
        }
        const body = await request.json() as UpdateCommentDto;

        const validation = updateCommentSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.issues[0].message },
                { status: 400 }
            );
        }
        const updatedComment = await prisma.comment.update({
            where: { id: parseInt(id) },
            data: {
                text: body.text,
            }
        })
        return NextResponse.json(updatedComment, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { message: 'internal server error' }, { status: 500 }
        )
    }
}

/**
 * @method DELETE
 * @route ~/api/comments
 * @desc Delete A Comment
 * @access private //(only owner this comment OR Admin)  
 */

export async function DELETE(request:NextRequest , context: { params: Promise<{ id: string }> }){
    const {id} = await context.params
    try {
            const comment = await prisma.comment.findUnique({
        where: {id: parseInt(id)}
    })
    if (!comment) {
        return NextResponse.json({message: " Comment Not Found!"}, {status: 404})
    }
    const user = verifyToken(request)
    if (!user || (!user.isAdmin && user.id !== comment.userId)  ) {
        return NextResponse.json({message: "You are Not allowed!, access denied"}, {status: 403})
    }
    await prisma.comment.delete({
        where: {id: parseInt(id)}
    })
    return NextResponse.json({message: "Comment Deleted successfully"})
    } catch (error) {
                return NextResponse.json(
            { message: 'internal server error' }, { status: 500 }
        )
    }
}