import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserDto } from "@/utils/dtos";
import bcrypt from "bcryptjs";
import { updatingProfileSchema } from "@/utils/validationSchemas";


/**
 * @method DELETE
 * @route ~/api/users/profile/:id
 * @desc Delete Profile
 * @access private 
 */

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    try {

        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
            include: { comments: true }
        })
        if (!user) {
            return NextResponse.json({ message: "user not found" }, { status: 404 })
        }


        const userFromToken = verifyToken(request);

        if (userFromToken !== null && userFromToken.id === user.id) {
            await prisma.user.delete({
                where: { id: parseInt(id) }
            })
            const commentIds = user.comments?.map(comment => comment.id)

            await prisma.comment.deleteMany({
                where: { id: { in: commentIds } }
            })
            return NextResponse.json({ message: "Your account Deleted" }, { status: 200 })

        }

        return NextResponse.json({ message: "You cannot Delete this account" }, { status: 403 })

    } catch (error) {
        return NextResponse.json(
            { message: 'internal server error' }, { status: 500 }
        )
    }
}

/**
 * @method GET
 * @route ~/api/users/profile/:id
 * @desc Get Profile
 * @access private 
 */

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
            select: {
                id: true,
                email: true,
                username: true,
                createdAt: true,
                isAdmin: true,
            }
        })
        if (!user) {
            return NextResponse.json({ message: "user not found" }, { status: 404 })
        }


        const userFromToken = verifyToken(request);

        if (userFromToken === null || userFromToken.id !== user.id) {

            return NextResponse.json({ message: "You are not allowed, access denied" }, { status: 403 })

        }

        return NextResponse.json(user, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { message: 'internal server error' }, { status: 500 }
        )
    }
}



/**
 * @method PUT
 * @route ~/api/users/profile/:id
 * @desc Update Profile
 * @access private 
 */

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        })
        if (!user) {
            return NextResponse.json({ message: "user not found" }, { status: 404 })
        }


        const userFromToken = verifyToken(request);

        if (userFromToken === null || userFromToken.id !== user.id) {

            return NextResponse.json({ message: "You are not allowed, access denied" }, { status: 403 })

        }

        const body = await request.json() as UpdateUserDto

        const validation = updatingProfileSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 })
        }
        if (body.password) {

            if (!body.currentPassword) {
                return NextResponse.json({ message: "current password is required" }, { status: 400 })
            }

            const isPasswordMatch = await bcrypt.compare(body.currentPassword, user.password);

            if (!isPasswordMatch) {
                return NextResponse.json({ message: "invalid current password" }, { status: 400 })
            }

            const salt = await bcrypt.genSalt(10)
            body.password = await bcrypt.hash(body.password, salt)
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                username: body.username,
                email: body.email,
                password: body.password,
            },
            select: {
                id: true,
                email: true,
                username: true,
                createdAt: true,
                updatedAt: true,
                isAdmin: true,
            }
        })
        return NextResponse.json(updatedUser, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: 'internal server error' }, { status: 500 }
        )
    }
}