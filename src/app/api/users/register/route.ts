
import prisma from "@/utils/db";
import { RegisterUserDto } from "@/utils/dtos";
import { setCookie } from "@/utils/generateToken";
import { registerSchema } from "@/utils/validationSchemas";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method POST
 * @route ~/api/users/register
 * @desc Create New User
 * @access public 
 */


export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as RegisterUserDto
        const validation = registerSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(body.password, salt);

        const user = await prisma.user.findUnique({
            where: { email: body.email }
        })
        if (user) {
            return NextResponse.json({ message: "this user already registered" }, { status: 400 })
        }

        const newUser = await prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password: hashPassword
            },
            select: {
                username: true,
                email:true,
                id: true,
                isAdmin: true,
            }
        });
        const tokenPayload = {
            id: newUser.id,
            email:newUser.email,
            isAdmin: newUser.isAdmin,
            username: newUser.username,
        }

        const cookie = setCookie(tokenPayload)

        return NextResponse.json({...newUser, message: "Registered and Authenticated"}, { 
            status: 201,
            headers: {"Set-Cookie": cookie},             
        })

    } catch (error) {
        return NextResponse.json(
            { message: 'internal server error' }, { status: 500 }
        )
    }
}